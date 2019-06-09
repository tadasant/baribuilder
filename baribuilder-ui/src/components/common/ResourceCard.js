import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";

const ResourceCard = ({ title, img, description, url }) => {
    return (
        <Link to={url} className="resource-card">
            <header className="resource-card-header">
                <Img
                    className="resource-card-image"
                    fixed={img}
                    alt={title}
                />
                <h2 className="resource-card-title">{title}</h2>
            </header>
            <section className="resource-card-description">
                {description}
            </section>
        </Link>
    );
};

ResourceCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,

    // fixed gatsby-image
    img: PropTypes.object
};

export default ResourceCard;
