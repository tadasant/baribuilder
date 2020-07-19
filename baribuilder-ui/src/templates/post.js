import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Loadable from "@loadable/component";
import { Layout } from "../components/common";
import AuthorCard from "../components/common/AuthorCard";
import { MetaData } from "../components/common/meta";
import CustomPost from "../components/rendering/CustomPost";
import medicallyReviewed from "../utils/medicallyReviewed";
import { useScrollPercentage } from "react-scroll-percentage";

// Loadable so that it does random choosing of ad on the client side
const LoadableAffiliateSlider = Loadable(() =>
	import("../components/ads/AffiliateSliderContainer")
);

const LoadableRecipesHeaderForm = Loadable(() =>
	import("../components/ads/RecipesHeaderForm")
);

const LoadableTipsInlineForm = Loadable(() =>
	import("../components/ads/TipsInlineForm")
);

const AuthorFooter = styled.footer``;

const InlineFormDiv = styled.div`
	margin: 16px;
	margin-bottom: 48px;
	margin-top: 48px;

	form {
		// Overriding CovertKit's box shadow to make it stick out more.
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.5) !important;
	}
`;

/**
 * Single post view (/blog/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
	const [scrollPercentageRef, scrollPercentage] = useScrollPercentage();
	const post = data.ghostPost;

	return (
		<>
			<MetaData data={data} location={location} type="article" />
			<Helmet>
				<style type="text/css">{`${post.codeinjection_styles}`}</style>
			</Helmet>
			<Layout>
				{/* Affiliate ad that shows up partway down the page */}
				<LoadableAffiliateSlider
					slug={post.slug}
					scrollPercentage={scrollPercentage}
				/>

				<div className="container">
					<article className="content" ref={scrollPercentageRef}>
						<section className="post-full-content">
							{/* Amazon Associates disclaimer */}
							<div className="post__amazon-disclaimer-container">
								<p className="post__amazon-disclaimer">
									As an Amazon Associate, BariBuilder earns from qualifying
									purchases.
								</p>
							</div>

							<h1 className="content-title">{post.title}</h1>

							{/* CTA to sign up for newsletter */}
							<InlineFormDiv>
								{/* Show the ad appropriate for the article (sleeve/bypass/generic)
								{post.tags.some((tag) => tag.slug === "gastric-bypass") ? (
									<VitaminsBypassForm adPlacement="top_of_article" />
								) : post.tags.some((tag) => tag.slug === "gastric-sleeve") ? (
									<VitaminsSleeveForm adPlacement="top_of_article" />
								) : (
									<VitaminsBariatricForm adPlacement="top_of_article" />
								)} */}
								<LoadableRecipesHeaderForm />
							</InlineFormDiv>

							{post.feature_image ? (
								<figure className="post-feature-image">
									<img src={post.feature_image} alt={post.title} />
								</figure>
							) : null}

							{/* Modal CTA to sign up for newsletter */}
							{/* Removing to make things less busy for the AffiliateSlider */}
							{/* <RecipesModal /> */}

							{/* The main post content */}
							<CustomPost post={post} />

							{/* CTA to join the Facebook group */}
							<p>
								<i>
									Want to discuss this article or ask a question? Join our{" "}
									<a
										href="https://www.facebook.com/groups/bariatric.wls.community.baribuilder/"
										target="_blank"
										rel="noopener noreferer"
									>
										Facebook community of peers just like you.
									</a>
								</i>
							</p>

							<div className="sharethis-inline-share-buttons" />

							{/* End of article tips CTA */}
							<InlineFormDiv>
								<LoadableTipsInlineForm adPlacement="end_of_article" />
							</InlineFormDiv>
							{post.authors.map((author) => {
								// hack for medical reviewers -- could eventually integrate into custom CMS
								let role = "Author";
								if (
									post.slug in medicallyReviewed &&
									medicallyReviewed[post.slug].includes(author.slug)
								) {
									role = "Medical Reviewer";
								}
								return (
									<AuthorFooter key={author.slug}>
										<AuthorCard author={author} role={role} />
									</AuthorFooter>
								);
							})}
						</section>
					</article>
				</div>
			</Layout>
		</>
	);
};

Post.propTypes = {
	data: PropTypes.shape({
		ghostPost: PropTypes.shape({
			title: PropTypes.string.isRequired,
			html: PropTypes.string.isRequired,
			feature_image: PropTypes.string,
			authors: PropTypes.arrayOf(
				PropTypes.shape({
					slug: PropTypes.string.isRequired,
				})
			),
			tags: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					slug: PropTypes.string.isRequired,
				})
			),
		}).isRequired,
	}).isRequired,
	location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
	query($slug: String!) {
		ghostPost(slug: { eq: $slug }) {
			...GhostPostFields
		}
		vitaminImage: file(relativePath: { eq: "resources/vitamins-ad.jpg" }) {
			childImageSharp {
				fixed(width: 400) {
					...GatsbyImageSharpFixed
				}
			}
		}
	}
`;
