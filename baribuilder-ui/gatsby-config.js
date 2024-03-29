const path = require(`path`);

const config = require(`./src/utils/siteConfig`);
const generateRSSFeed = require(`./src/utils/rss/generate-feed`);

let ghostConfig;

try {
	ghostConfig = require(`./.ghost`);
} catch (e) {
	ghostConfig = {
		production: {
			apiUrl: process.env.GHOST_API_URL,
			contentApiKey: process.env.GHOST_CONTENT_API_KEY,
		},
	};
} finally {
	const { apiUrl, contentApiKey } =
		process.env.NODE_ENV === `development`
			? ghostConfig.development
			: ghostConfig.production;

	if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
		throw new Error(
			`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`
		); // eslint-disable-line
	}
}

/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */
module.exports = {
	siteMetadata: {
		siteUrl: config.siteUrl,
	},
	plugins: [
		/**
		 *  Content Plugins
		 */
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: path.join(__dirname, `src`, `pages`),
				name: `pages`,
			},
		},
		// Setup for optimised images.
		// See https://www.gatsbyjs.org/packages/gatsby-image/
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: path.join(__dirname, `src`, `images`),
				name: `images`,
			},
		},
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		{
			resolve: `gatsby-source-ghost`,
			options:
				process.env.NODE_ENV === `development`
					? ghostConfig.development
					: ghostConfig.production,
		},
		/**
		 *  Utility Plugins
		 */
		{
			resolve: `gatsby-plugin-ghost-manifest`,
			options: {
				short_name: config.shortTitle,
				start_url: `/`,
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: `minimal-ui`,
				icon: `static/${config.siteIcon}`,
				query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
			},
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
				feeds: [generateRSSFeed(config)],
			},
		},
		{
			resolve: `gatsby-plugin-advanced-sitemap`,
			options: {
				query: `
                {
                    allGhostPost {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostPage {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostTag {
                        edges {
                            node {
                                id
                                slug
                                feature_image
                            }
                        }
                    }
                    allGhostAuthor {
                        edges {
                            node {
                                id
                                slug
                                profile_image
                            }
                        }
                    }
                }`,
				mapping: {
					allGhostPost: {
						sitemap: `posts`,
					},
					allGhostTag: {
						sitemap: `tags`,
					},
					allGhostAuthor: {
						sitemap: `authors`,
					},
					allGhostPage: {
						sitemap: `pages`,
					},
				},
				exclude: [
					`/dev-404-page`,
					`/404`,
					`/404.html`,
					`/offline-plugin-app-shell-fallback`,
				],
				createLinkInHead: true,
			},
		},
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-force-trailing-slashes`,
		`gatsby-plugin-offline`,
		{
			resolve: `gatsby-plugin-facebook-pixel`,
			options: {
				pixelId: "2046900505418306",
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: "UA-104887163-2",
				// Defines where to place the tracking script - `true` in the head and `false` in the body
				head: true,
				respectDNT: true,
				allowLinker: true,
			},
		},
		{
			resolve: `gatsby-plugin-hotjar-tracking`,
			options: {
				includeInDevelopment: false,
				id: 1065021,
				sv: 6,
			},
		},
		"gatsby-plugin-styled-components",
		{
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: "GTM-M3JQ6P6",

				// Include GTM in development.
				// Defaults to false meaning GTM will only be loaded in production.
				includeInDevelopment: false,

				// Specify optional GTM environment details.
				// gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
				// gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
				// dataLayerName: "YOUR_DATA_LAYER_NAME",
			},
		},
	],
};
