/// Import all posts from the Ghost API
// wrangle the data into Post.slug, Post.editUrl, Post.content

/// Import all published posts from the Airtable API
// extract the presumed slug from the Published URL
// attach list of target keywords, with each one missing expectedTraffic
// make a keywordToPost data structure

/// For each unique Keyword, get its entry in the relevant Airtable table
// store its expectedTraffic value

/// For each Post, for each unique keyword
// see if the unique keyword exists in the Post.content
// if yes, add a result ("link copy X to slug Y") IF not already linked to slug Y
