// 1. Write a ts-node script to pull content from Ghost v2 API, post & keyword data from Airtable, output a `Post[]`s

import { Keyword, Link, Post } from "../common/types";

/// Import all posts from the Ghost API
// wrangle the data into Post.slug, Post.editUrl, Post.content

/// Import all published posts from the Airtable API
// extract the presumed slug from the Published URL
// attach list of target keywords, with each one missing expectedTraffic

/// For each unique Keyword, get its entry in the relevant Airtable table
// store its expectedTraffic value

/// Iterate over each Post
// identify, using a regex, any existing <a href> to an internal link
// when identified, add it to that post's outboundLink && the matching post's inboundLinks

// Dump the Post[] output as a pretty printed table
