# Setup

`.env` file in `blog-tools` root directory should be of the format:

```
export AIRTABLE_API_KEY=<key here>
export GHOST_CONTENT_API_KEY=<key here>
export GHOST_ADMIN_API_KEY=<key here>
```

# Usage

# Roadmap

## Internal Linking Scripts

`internalLinkStats.ts` - outputs a table of the current internal linking stats of all published posts

`internalLinkAssist.ts` - given some input text, outputs the possible internal links that could be used

## Internal Linking App

Story 1 (author writing a post):

1. Enter the body of a post into a `textarea` input
2. Receive a list of copy -> link pairs, ordered by expected traffic, to potentially include

Story 2 (manager reviewing stats/old posts):

1. See table of link | # inbound links / # potential inbound links | # outbound links / # potential outbound links
2. Ability to click in to see the above "author writing a post" view

Story 2 is not high priority to implement. Can stick to using CLI script as needed.

Story 1 implementation:

1. Use cra-ts to create a basic app, use Material UI
2. Create a Netlify function for leveraging the Internal Linking Script
