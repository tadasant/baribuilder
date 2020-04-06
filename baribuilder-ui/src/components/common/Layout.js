import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import { Navigation } from ".";
import config from "../../utils/siteConfig";

// Styles
import "../../styles/app.css";

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = (props) => {
	const { data, children, bodyClass, isHome } = props;
	const site = data.allGhostSettings.edges[0].node;
	const twitterUrl = site.twitter
		? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
		: null;
	const facebookUrl = site.facebook
		? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
		: null;
	const tags = data.allGhostTag.nodes;

	return (
		<>
			<Helmet>
				<html lang={site.lang} />
				<style type="text/css">{`${site.codeinjection_styles}`}</style>
				<body className={bodyClass} />
			</Helmet>

			<div className="viewport">
				<div className="viewport-top">
					{/* The main header section on top of the screen */}
					<header className="site-head">
						<div className="container">
							{isHome ? (
								<div className="site-banner">
									<Link to="/">
										{data.bannerLogo ? (
											<Img
												fixed={data.bannerLogo.childImageSharp.fixed}
												alt={site.title}
											/>
										) : (
											"BariBuilder"
										)}
									</Link>
									<p className="site-banner-desc">{site.description}</p>
								</div>
							) : null}
							<nav className="site-nav">
								<div className="site-nav-left">
									{!isHome ? (
										<Link to="/" className="site-nav-logo">
											{data.navLogo ? (
												<Img
													fixed={data.navLogo.childImageSharp.fixed}
													alt={site.title}
												/>
											) : (
												"BariBuilder"
											)}
										</Link>
									) : null}
									{/* The navigation items as setup in Ghost */}
									<Navigation
										data={site.navigation}
										navClass="site-nav-item"
										tags={tags}
									/>
								</div>
								<div className="site-nav-right">
									{site.twitter && (
										<a
											href={twitterUrl}
											className="site-nav-item"
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												className="site-nav-icon"
												src="/images/icons/twitter.svg"
												alt="Twitter"
											/>
										</a>
									)}
									{site.facebook && (
										<a
											href={facebookUrl}
											className="site-nav-item"
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												className="site-nav-icon"
												src="/images/icons/facebook.svg"
												alt="Facebook"
											/>
										</a>
									)}
									<a
										className="site-nav-item"
										href={`https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											className="site-nav-icon"
											src="/images/icons/rss.svg"
											alt="RSS Feed"
										/>
									</a>
								</div>
							</nav>
						</div>
					</header>

					<main className="site-main">
						{/* All the main content gets inserted here, index.js, post.js */}
						{children}
					</main>
				</div>

				<div className="viewport-bottom">
					{/* The footer at the very bottom of the screen */}
					<footer className="site-foot">
						<div className="site-foot-nav container">
							<div className="site-foot-disclaimer">
								<p>
									The information on this website is not medical advice. Please
									consult your medical provider before making any changes
									related to your health.
								</p>
							</div>
							<div className="site-foot-bottom">
								<div className="site-foot-nav-left">
									<Link to="/">{site.title}</Link> © 2019
								</div>
								<div className="site-foot-nav-right">
									<a
										className="site-foot-nav-item"
										href="http://eepurl.com/dHMECz"
										target="_blank"
										rel="noopener noreferrer"
									>
										Subscribe
									</a>
									<a
										className="site-foot-nav-item"
										href="https://shop.baribuilder.com/terms-and-conditions"
										target="_blank"
										rel="noopener noreferrer"
									>
										Terms & Conditions
									</a>
									<a
										className="site-foot-nav-item"
										href="https://www.iubenda.com/privacy-policy/25172832"
										target="_blank"
										rel="noopener noreferrer"
									>
										Privacy Policy
									</a>
									<Navigation
										data={site.navigation}
										navClass="site-foot-nav-item"
										tags={tags}
									/>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</>
	);
};

DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
	bodyClass: PropTypes.string,
	isHome: PropTypes.bool,
	data: PropTypes.shape({
		allGhostSettings: PropTypes.object.isRequired,
	}).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
	<StaticQuery
		query={graphql`
			query LayoutQuery {
				allGhostSettings {
					edges {
						node {
							...GhostSettingsFields
						}
					}
				}
				navLogo: file(relativePath: { eq: "baribuilder-logo-white.png" }) {
					childImageSharp {
						fixed(height: 30) {
							...GatsbyImageSharpFixed
						}
					}
				}
				bannerLogo: file(relativePath: { eq: "baribuilder-logo-white.png" }) {
					childImageSharp {
						fixed(height: 60) {
							...GatsbyImageSharpFixed
						}
					}
				}
				allGhostTag {
					nodes {
						name
						slug
						postCount
					}
				}
			}
		`}
		render={(data) => <DefaultLayout data={data} {...props} />}
	/>
);

export default DefaultLayoutSettingsQuery;
