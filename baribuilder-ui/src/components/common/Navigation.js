import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Menu, MenuItem } from "@material-ui/core";
import upperFirst from "lodash/upperFirst";

/**
 * Navigation component
 *
 * The Navigation component takes an array of your Ghost
 * navigation property that is fetched from the settings.
 * It differentiates between absolute (external) and relative link (internal).
 * You can pass it a custom class for your own styles, but it will always fallback
 * to a `site-nav-item` class.
 *
 */
const Navigation = ({ navClass, tags }) => {
	const [topicsMenuAnchor, setTopicsMenuAnchor] = useState(null);
	const handleTopicsClick = (event) => {
		setTopicsMenuAnchor((prev) => (prev === null ? event.currentTarget : null));
	};

	const sortedTags = tags
		.sort((a, b) => (a.postCount > b.postCount ? -1 : 1))
		.slice(0, 8);

	return (
		<>
			<Link className={navClass} to="/blog/">
				Blog
			</Link>
			<span
				className={navClass}
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleTopicsClick}
			>
				Topics
			</span>
			<Menu
				anchorEl={topicsMenuAnchor}
				keepMounted
				open={Boolean(topicsMenuAnchor)}
				onClose={handleTopicsClick}
				anchorOrigin={{
					vertical: "bottom",
				}}
				getContentAnchorEl={null}
				className="site-nav-sub-menu"
			>
				{sortedTags.map((tag, i) => (
					<MenuItem>
						<Link
							className="site-nav-sub-menu-item"
							to={`/blog/tag/${tag.slug}`}
							key={i}
						>
							{upperFirst(tag.name)} ({tag.postCount})
						</Link>
					</MenuItem>
				))}
			</Menu>
			<a
				className={navClass}
				href="https://shop.baribuilder.com/"
				rel="noopener noreferrer"
			>
				Shop
			</a>
			<a
				className={navClass}
				href="https://shop.baribuilder.com/about"
				rel="noopener noreferrer"
			>
				About
			</a>
		</>
	);
};

Navigation.defaultProps = {
	navClass: `site-nav-item`,
};

Navigation.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
	navClass: PropTypes.string,
	tags: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			slug: PropTypes.string,
			postCount: PropTypes.string,
		})
	),
};

export default Navigation;
