// 1. Write a ts-node script to pull content from Ghost v2 API, post & keyword data from Airtable, output a `Post[]`s

import { Keyword, Link, Post } from "../common/types";
import GhostApiClient from "../common/GhostApiClient";
import AirtableApiClient from "../common/AirtableApiClient";
import _ from "lodash";
import { createObjectCsvWriter } from "csv-writer";

async function main() {
	/// Import all posts from the Ghost API
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
		postsBySlug[post.slug].possibleLinks = [];
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
		return slug;
	});

	// Combine the Airtable data to the ghost data
	Object.keys(airtablePostsBySlug).forEach(slug => {
		if (!(slug in postsBySlug)) {
			console.error(`${slug} found in Airtable, not in Ghost`);
		} else {
			if (airtablePostsBySlug[slug].relatedKeywordIds) {
				postsBySlug[slug].targetKeywords = airtablePostsBySlug[
					slug
				].relatedKeywordIds.map(keywordId => ({
					value: airtableKeywordsById[keywordId].keyword,
					expectedTraffic: airtableKeywordsById[keywordId].volume
				}));
			}
			postsBySlug[slug].viableAnchors = airtablePostsBySlug[slug].viableAnchors;
		}
	});

	// Fill out possible links
	console.debug("Analyzing possible links...");
	Object.values(postsBySlug).forEach(post => {
		const { content } = post;
		Object.values(postsBySlug).forEach(innerPost => {
			if (innerPost.slug !== post.slug && innerPost.targetKeywords) {
				// Add possible links b/c they link to a target keyword
				if (innerPost.targetKeywords) {
					innerPost.targetKeywords.forEach(targetKeyword => {
						if (content.includes(targetKeyword.value)) {
							post.possibleLinks.push({
								slug: innerPost.slug,
								anchor: targetKeyword.value,
								expectedTraffic: targetKeyword.expectedTraffic
							});
						}
					});
				}
				// Add possible links b/c they link to a viable anchor
				if (innerPost.viableAnchors) {
					innerPost.viableAnchors.forEach(viableAnchor => {
						if (content.includes(viableAnchor)) {
							post.possibleLinks.push({
								slug: innerPost.slug,
								anchor: viableAnchor,
								expectedTraffic: 0
							});
						}
					});
				}
			}
		});
	});

	// Dump everything in postsBySlug.values to a CSV

	const possibleLinksWriter = createObjectCsvWriter({
		path: "output-possible-links.csv",
		header: [
			{ id: "slug", title: "Slug" },
			{ id: "edit-url", title: "Edit URL" },
			{ id: "link-anchor", title: "Link Anchor" },
			{ id: "link-slug", title: "Link Slug" },
			{ id: "link-traffic", title: "Link Traffic" }
		]
	});

	const data = [];

	Object.values(postsBySlug).forEach(post => {
		post.possibleLinks.forEach(possibleLink => {
			data.push({
				slug: post.slug,
				"edit-url": post.editUrl,
				"link-anchor": possibleLink.anchor,
				"link-slug": possibleLink.slug,
				"link-traffic": possibleLink.expectedTraffic
			});
		});
	});

	await possibleLinksWriter.writeRecords(data);
}

main();
