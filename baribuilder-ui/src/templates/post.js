import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";
import AuthorCard from "../components/common/AuthorCard";

import styled from "styled-components";
import medicallyReviewed from "../utils/medicallyReviewed";

const AuthorFooter = styled.footer``;

/**
 * Single post view (/blog/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
	const post = data.ghostPost;

	return (
		<>
			<MetaData data={data} location={location} type="article" />
			<Helmet>
				<style type="text/css">{`${post.codeinjection_styles}`}</style>
			</Helmet>
			<Layout>
				<div className="container">
					<article className="content">
						{post.feature_image ? (
							<figure className="post-feature-image">
								<img src={post.feature_image} alt={post.title} />
							</figure>
						) : null}
						<section className="post-full-content">
							<h1 className="content-title">{post.title}</h1>

							{/* The main post content */}
							<section
								className="content-body load-external-scripts"
								dangerouslySetInnerHTML={{ __html: post.html }}
							/>
							{post.authors.map(author => {
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
					slug: PropTypes.string.isRequired
				})
			)
		}).isRequired
	}).isRequired,
	location: PropTypes.object.isRequired
};

export default Post;

export const postQuery = graphql`
	query($slug: String!) {
		ghostPost(slug: { eq: $slug }) {
			...GhostPostFields
		}
	}
`;
