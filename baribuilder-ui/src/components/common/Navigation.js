import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
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
	const [hamburgerMenuAnchor, setHamburgerMenuAnchor] = useState(null);
	const handleTopicsClick = (event) => {
		setTopicsMenuAnchor((prev) => (prev === null ? event.currentTarget : null));
	};
	const handleHamburgerClick = (event) => {
		setHamburgerMenuAnchor((prev) =>
			prev === null ? event.currentTarget : null
		);
	};

	const sortedTags = tags
		.sort((a, b) => (a.postCount > b.postCount ? -1 : 1))
		.slice(0, 8);

	const navItems = [
		{
			url: "/blog/",
			label: "Blog",
			isRelative: true,
			hasSubMenu: false,
		},
		{
			label: "Topics",
			hasSubMenu: true,
		},
		{
			url: "https://shop.baribuilder.com/",
			label: "Shop",
			isAbsolute: true,
		},
		{
			url: "https://shop.baribuilder.com/about",
			label: "About",
			isAbsolute: true,
		},
	];

	return (
		<>
			{/* Mobile first */}
			<div className="hamburger-menu">
				<IconButton
					aria-label="menu"
					className="hamburger-menu"
					onClick={handleHamburgerClick}
				>
					<MenuIcon />
				</IconButton>
				<Menu
					anchorEl={hamburgerMenuAnchor}
					keepMounted
					open={Boolean(hamburgerMenuAnchor)}
					onClose={handleHamburgerClick}
					anchorOrigin={{
						horizontal: "right",
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
			</div>

			{/* Desktop below */}
			<div className="flat-menu">
				{navItems.map((navItem) => {
					if (navItem.isRelative) {
						return (
							<Link className={navClass} to={navItem.url}>
								{navItem.label}
							</Link>
						);
					}

					if (navItem.isAbsolute) {
						return (
							<a
								className={navClass}
								href={navItem.url}
								rel="noopener noreferrer"
							>
								{navItem.label}
							</a>
						);
					}

					if (navItem.hasSubMenu) {
						return (
							<>
								<span
									className={navClass}
									aria-controls="simple-menu"
									aria-haspopup="true"
									onClick={handleTopicsClick}
								>
									{navItem.label}
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
							</>
						);
					}
				})}
			</div>
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
