// 1. Write a ts-node script to pull content from Ghost v2 API, post & keyword data from Airtable, output a `Post[]`s

import { Keyword, Link, Post } from "../common/types";
import GhostApiClient from "../common/GhostApiClient";
import AirtableApiClient from "../common/AirtableApiClient";
import _ from "lodash";

/// Import all posts from the Ghost API

async function main() {
	const ghostClient = new GhostApiClient({
		url: "baribuilder-blog.ghost.io",
		key: process.env.GHOST_CONTENT_API_KEY,
		version: "v2"
	});

	const ghostPosts = await ghostClient.getAllPublishedPostsSync();

	const postsBySlug: { [slug: string]: Partial<Post> } = {};
	ghostPosts.forEach(ghostPost => {
		const post: Partial<Post> = {
			content: ghostPost.html,
			slug: ghostPost.slug
		};
		postsBySlug[post.slug] = post;
	});

	/// Import all published posts from the Airtable API (BariBuilder Blog Articles base)
	const airtableClient = new AirtableApiClient();
	const airtablePosts = await airtableClient.getAllPublishedPosts();
	const uniqueKeywordIds = new Set();
	airtablePosts.forEach(airtablePost => {
		if (airtablePost.relatedKeywordIds) {
			airtablePost.relatedKeywordIds.forEach(id => uniqueKeywordIds.add(id));
		}
	});

	// Grab the join'd keywords
	const airtableKeywords = await airtableClient.getKeywords(
		Array.from(uniqueKeywordIds) as string[]
	);
	const airtableKeywordsById = _.keyBy(airtableKeywords, "id");

	// Organize Airtable post data by slug
	const airtablePostsBySlug = _.keyBy(airtablePosts, post => {
		const tokens = post.publishedUrl.split("/");
		const slug =
			tokens[tokens.length - 1] === ""
				? tokens[tokens.length - 2]
				: tokens[tokens.length - 1];
		console.log(slug);
		return slug;
	});

	// TODO: any in ghost that aren't in Airtable or vice-versa?

	// Combine the Airtable data to the ghost data
	Object.keys(airtablePostsBySlug).forEach(slug => {
		if (!(slug in postsBySlug)) {
			console.error(`${slug} found in Airtable, not in Ghost`);
		} else if (airtablePostsBySlug[slug].relatedKeywordIds) {
			postsBySlug[slug].targetKeywords = airtablePostsBySlug[
				slug
			].relatedKeywordIds.map(keywordId => ({
				value: airtableKeywordsById[keywordId].keyword,
				expectedTraffic: airtableKeywordsById[keywordId].volume
			}));
		}
	});

	console.log(JSON.stringify(postsBySlug, null, 2));

	// TODO the rest
	/// Iterate over each Post
	// identify, using a regex, any existing <a href> to an internal link
	// when identified, add it to that post's outboundLink && the matching post's inboundLinks

	// Dump the Post[] output as a pretty printed table
}

main();
