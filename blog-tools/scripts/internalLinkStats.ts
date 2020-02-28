// 1. Write a ts-node script to pull content from Ghost v2 API, post & keyword data from Airtable, output a `Post[]`s

import { Keyword, Link, Post } from "../common/types";
import GhostApiClient from "../common/GhostApiClient";
import AirtableApiClient from "../common/AirtableApiClient";
import _ from "lodash";
import unfluff from "unfluff";

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
		postsBySlug[post.slug].inboundLinks = [];
		postsBySlug[post.slug].outboundLinks = [];
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

	// TODO the rest
	/// Iterate over each Post
	Object.values(postsBySlug).forEach(post => {
		// grab all the links in the content
		const contentAsHtml = `<html>${post.content}</html>`;
		const links = unfluff(contentAsHtml).links;
		links.forEach((link: { text: string; href: string }) => {
			const isRelative =
				!link.href.startsWith("http") && !link.href.startsWith("//");
			const isBariBuilder =
				isRelative || link.href.includes("baribuilder.com/blog");
			if (isBariBuilder) {
				const tokens = link.href.split("/");
				const slug =
					tokens.length > 1
						? tokens[tokens.length - 1] === ""
							? tokens[tokens.length - 2]
							: tokens[tokens.length - 1]
						: undefined;
				if (slug === undefined || !(slug in postsBySlug) || slug === "") {
					console.warn(
						`Could not identify matching slug for ${link.href} (${slug}).`
					);
				} else {
					postsBySlug[slug].inboundLinks.push({
						anchor: link.text,
						slug
					});
					postsBySlug[post.slug].outboundLinks.push({
						anchor: link.text,
						slug
					});
				}
			}
		});
	});

	// Dump the Post[] output as a pretty printed table

	Object.values(postsBySlug).forEach(post => {
		console.log(
			`Post ${post.slug}:\t\t ${post.inboundLinks.length} inbound, ${post.outboundLinks.length} outbound`
		);
	});
}

main();
