// 1. Write a ts-node script to pull content from Ghost v2 API, post & keyword data from Airtable, output a `Post[]`s

import { Keyword, Link, Post } from "../common/types";
import GhostApiClient from "../common/GhostApiClient";
import AirtableApiClient, { AirtablePost } from "../common/AirtableApiClient";

/// Import all posts from the Ghost API

async function main() {
	const ghostClient = new GhostApiClient({
		url: "baribuilder-blog.ghost.io",
		key: process.env.GHOST_CONTENT_API_KEY,
		version: "v2"
	});

	// const ghostPosts = await ghostClient.getAllPublishedPostsSync();

	// const posts = [];
	// ghostPosts.forEach(ghostPost => {
	// 	const post: Partial<Post> = {};
	// 	post.content = ghostPost.html;
	// 	post.slug = ghostPost.slug;
	// 	posts.push(post);
	// });

	/// Import all published posts from the Airtable API (BariBuilder Blog Articles base)
	const airtableClient = new AirtableApiClient();
	const airtablePosts = await airtableClient.callOnEachPostRecord();

	// extract the presumed slug from the Published URL
	// attach list of target keywords, with each one missing expectedTraffic
}

main();

/// For each unique Keyword, get its entry in the relevant Airtable table
// store its expectedTraffic value

/// Iterate over each Post
// identify, using a regex, any existing <a href> to an internal link
// when identified, add it to that post's outboundLink && the matching post's inboundLinks

// Dump the Post[] output as a pretty printed table
