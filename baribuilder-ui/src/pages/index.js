import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Layout, ResourceCard } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Main blog page (home page)
 *
 * Displays a couple cards that serve as entrypoints to the blog and shopper app.
 *
 */
const Index = ({ data, location }) => {
    return (
        <>
            <MetaData location={location} />
            <Layout isHome>
                <div className="container">
                    <p>TODO: Add some intro text here</p>
                    <section className="resource-list">
                        <ResourceCard
                            img={data.blogImage.childImageSharp.fixed}
                            title="Blog"
                            description="blogging desc"
                            url="google.com"
                        />
                        <ResourceCard
                            img={data.shopImage.childImageSharp.fixed}
                            title="Shop"
                            description="shopping desc"
                            url="google.com"
                        />
                    </section>
                </div>
            </Layout>
        </>
    );
};

Index.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.shape({
        shopImage: PropTypes.shape({
            childImageSharp: PropTypes.shape({
                fixed: PropTypes.object
            })
        }),
        blogImage: PropTypes.shape({
            childImageSharp: PropTypes.shape({
                fixed: PropTypes.object
            })
        })
    })
};

export const query = graphql`
    query IndexQuery {
        shopImage: file(relativePath: { eq: "resources/shop.jpg" }) {
            childImageSharp {
                fixed(height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
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
