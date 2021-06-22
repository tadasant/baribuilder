import React, { useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link, StaticQuery, graphql, navigate } from "gatsby";
import { IconButton, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Img from "gatsby-image";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { fireEvent } from "../../analytics/googleAnalytics";
import ShowCTAContext from "./ShowCTAContext";

import { Navigation } from ".";
import config from "../../utils/siteConfig";

// Styles
import "react-toastify/dist/ReactToastify.css";
import "../../styles/app.css";

const CTABarDiv = styled.div`
	&& {
		background-color: var(--color-vitag-green-translucent);
		position: sticky;
		top: 0px;
		width: 100%;
		display: grid;
		grid-template-columns: 48px 1fr 48px;
		z-index: 5;
	}

	> * {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}
`;

const CTAContainer = styled.div`
	&& {
		padding: 4px;
		display: flex;

		// 36 px button plus 16 px of padding
		min-height: 52px;
	}
`;

const ClearButton = styled(IconButton)`
	&& {
		color: rgba(0, 0, 0, 0.2);
		padding: 8px;
		display: flex;
		justify-content: center;
	}
`;

const CTAAnchor = styled.a`
	// Can't be too close to the clear button
	padding-right: 8px;
	padding-left: 8px;

	color: var(--color-base);
`;

const CTAImg = styled.img`
	max-height: 32px;
	padding-right: 8px;
`;

const CALCIUM_URL =
	"https://store.baribuilder.com/discount/READER_10?redirect=%2Fproducts%2Fbariatic-calcium-citrate-chewables";
const FACEBOOK_GROUP_URL =
	"https://www.facebook.com/groups/bariatric.wls.community.baribuilder";
// const CTA_LINK = FACEBOOK_GROUP_URL;
const CTA_LINK = CALCIUM_URL;

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = (props) => {
	const [showSearchBar, setShowSearchBar] = useState(false);
	const [showCTABar, setShowCTABar] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const { data, children, bodyClass, isHome } = props;
	const site = data.allGhostSettings.edges[0].node;
	const twitterUrl = site.twitter
		? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
		: null;
	const facebookUrl = site.facebook
		? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
		: null;
	const tags = data.allGhostTag.nodes;

	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
	};

	const handleSearchKey = (event) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	const handleSearch = () => {
		navigate(`/search?q=${encodeURI(searchValue)}`);
	};

	const handleCTAClick = (event) => {
		event.preventDefault();
		fireEvent({
			category: "Facebook Group Link",
			action: "Open",
		});
		window.open(CTA_LINK, "_blank");
	};

	return (
		<>
			<Helmet>
				<html lang={site.lang} />
				<style type="text/css">{`${site.codeinjection_styles}`}</style>
				<body className={bodyClass} />
			</Helmet>

			{/* Allows for use of toast in children */}
			<ToastContainer />

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
									<Navigation navClass="site-nav-item" tags={tags} />
								</div>
								<div className="site-nav-right">
									{/* Search bar */}
									<IconButton
										className="search-icon"
										onClick={() => setShowSearchBar((prev) => !prev)}
									>
										<SearchIcon />
									</IconButton>

									{/* Social Media icons */}
									{site.twitter && (
										<a
											href={twitterUrl}
											className="site-nav-item"
											target="_blank"
											rel="noopener noreferrer nofollow"
										>
											<img
												className="site-nav-icon"
												src="/images/icons/twitter.svg"
												alt="Twitter"
											/>
										</a>
									)}
									{FACEBOOK_GROUP_URL && (
										<a
											href={FACEBOOK_GROUP_URL}
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
										rel="noopener noreferrer nofollow"
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

						{showSearchBar ? (
							<div className="search-bar">
								<input
									className="input-box"
									type="text"
									autoFocus
									onChange={handleSearchChange}
									onKeyDown={handleSearchKey}
								/>
								<Button
									className="search-button"
									variant="outlined"
									onClick={handleSearch}
								>
									Search
								</Button>
							</div>
						) : null}
					</header>

					{showCTABar && data.facebookButton ? (
						<CTABarDiv>
							<div />
							<CTAContainer>
								<CTAAnchor
									href={CTA_LINK}
									target="_blank"
									rel="noopener noreferrer"
									onClick={handleCTAClick}
								>
									{/* <CTAImg
										src="/images/facebook-cta-button-flat.png"
										alt="Join Facebook Group"
									/> */}
									<CTAImg
										src="/images/baribuilder-calcium.png"
										alt="BariBuilder Calcium"
									/>
									Use coupon code <b>READER_10</b> to get <b>10% off</b> our
									delicious Bariatric Calcium chewables.
								</CTAAnchor>
							</CTAContainer>
							<div>
								<ClearButton
									onClick={() => setShowCTABar((prev) => !prev)}
									disableRipple
									disableFocusRipple
								>
									<ClearIcon />
								</ClearButton>
							</div>
						</CTABarDiv>
					) : null}

					<main className="site-main">
						{/* All the main content gets inserted here, index.js, post.js */}
						<ShowCTAContext.Provider value={showCTABar}>
							{children}
						</ShowCTAContext.Provider>
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
									<Link to="/">{site.title}</Link> © {new Date().getFullYear()}
								</div>
								<div className="site-foot-nav-right">
									<a
										className="site-foot-nav-item"
										href="https://ck.baribuilder.com/weekly-tips"
										target="_blank"
										rel="noopener noreferrer nofollow"
									>
										Subscribe
									</a>
									<a
										className="site-foot-nav-item"
										href="https://www.iubenda.com/privacy-policy/25172832"
										target="_blank"
										rel="noopener noreferrer nofollow"
									>
										Privacy Policy
									</a>
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
				facebookButton: file(
					relativePath: { eq: "resources/facebook-cta-button-flat.png" }
				) {
					childImageSharp {
						fluid(maxHeight: 36) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		`}
		render={(data) => <DefaultLayout data={data} {...props} />}
	/>
);

export default DefaultLayoutSettingsQuery;
