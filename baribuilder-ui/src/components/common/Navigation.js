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
const Navigation = ({ data, navClass, tags }) => {
	const [topicsMenuAnchor, setTopicsMenuAnchor] = useState(null);
	const handleTopicsClick = (event) => {
		setTopicsMenuAnchor((prev) => (prev === null ? event.currentTarget : null));
	};

	const sortedTags = tags
		.filter((tag) => tag.postCount > 1)
		.sort((a, b) => (a.postCount > b.postCount ? -1 : 1));

	return (
		<>
			{data.map((navItem, i) => {
				const url = navItem.url.startsWith("https://baribuilder.com")
					? navItem.url.split("https://baribuilder.com")[1]
					: navItem.url;
				if (navItem.url.match(/^\s?http(s?)/gi)) {
					return (
						<a
							className={navClass}
							href={url}
							key={i}
							rel="noopener noreferrer"
						>
							{navItem.label}
						</a>
					);
				} else {
					return (
						<Link className={navClass} to={url} key={i}>
							{navItem.label}
						</Link>
					);
				}
			})}
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
