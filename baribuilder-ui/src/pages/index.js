import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Layout, ResourceCard } from "../components/common";
import { MetaData } from "../components/common/meta";
import styled from "styled-components";

/**
 * Main blog page (home page)
 *
 * Displays a couple cards that serve as entrypoints to the blog and shopper app.
 *
 */

const blogDescription =
	"Read about topics related to life after bariatric surgery; everything from vitamins to lifestyle to complications.";

const ResourceListSection = styled.section`
	display: flex;
	justify-content: center;
`;

const Index = ({ data, location }) => {
	return (
		<>
			<MetaData location={location} title="BariBuilder Blog" />
			<Layout isHome>
				<div className="container">
					<p>
						We're committed to providing you with the information and resources
						you need to make sure your journey after weight loss surgery is as
						smooth as can be. We work with surgeons, dietitians, and other
						medical professionals to put together educational - but still easily
						readable and digestible! - articles, and work with a team of
						software engineers to build useful tools that will make your life
						easier. Check them out below!
					</p>
					<hr />
					<ResourceListSection>
						<ResourceCard
							img={data.blogImage.childImageSharp.fixed}
							title="Blog"
							description={blogDescription}
							url="blog"
						/>
					</ResourceListSection>
				</div>
			</Layout>
		</>
	);
};

Index.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
	data: PropTypes.shape({
		shopImage: PropTypes.shape({
			childImageSharp: PropTypes.shape({
				fixed: PropTypes.object,
			}),
		}),
		blogImage: PropTypes.shape({
			childImageSharp: PropTypes.shape({
				fixed: PropTypes.object,
			}),
		}),
	}),
};

export const query = graphql`
	query IndexQuery {
		blogImage: file(relativePath: { eq: "resources/blog.jpg" }) {
			childImageSharp {
				fixed(height: 200) {
					...GatsbyImageSharpFixed
				}
			}
		}
	}
`;

export default Index;
