import React, { useState, Fragment } from "react";
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
	const [topicsMobileMenuAnchor, setTopicsMobileMenuAnchor] = useState(null);
	const [hamburgerMenuAnchor, setHamburgerMenuAnchor] = useState(null);
	const handleTopicsClick = (event) => {
		setTopicsMenuAnchor((prev) => (prev === null ? event.currentTarget : null));
	};
	const handleMobileTopicsClick = (event) => {
		setTopicsMobileMenuAnchor((prev) =>
			prev === null ? event.currentTarget : null
		);
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
						vertical: "bottom",
						horizontal: "left",
					}}
					getContentAnchorEl={null}
					className="site-nav-sub-menu"
				>
					{navItems.map((navItem, i) => (
						<MenuItem key={`${navItem.url}-${i}`}>
							{navItem.isRelative ? (
								<Link className={navClass} to={navItem.url}>
									{navItem.label}
								</Link>
							) : navItem.isAbsolute ? (
								<a
									className={navClass}
									href={navItem.url}
									rel="noopener noreferrer"
								>
									{navItem.label}
								</a>
							) : navItem.hasSubMenu ? (
								<Fragment key={navItem.url}>
									<span
										className={navClass}
										aria-controls="simple-menu"
										aria-haspopup="true"
										onClick={handleTopicsClick}
									>
										{navItem.label}
									</span>
									<Menu
										anchorEl={topicsMobileMenuAnchor}
										keepMounted
										open={Boolean(topicsMobileMenuAnchor)}
										onClose={handleMobileTopicsClick}
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "right",
										}}
										getContentAnchorEl={null}
										className="site-nav-sub-menu"
									>
										{sortedTags.map((tag, i) => (
											<MenuItem key={`menuitem-${i}`}>
												<Link
													className="site-nav-sub-menu-item"
													to={`/blog/tag/${tag.slug}`}
												>
													{upperFirst(tag.name)} ({tag.postCount})
												</Link>
											</MenuItem>
										))}
									</Menu>
								</Fragment>
							) : null}
						</MenuItem>
					))}
				</Menu>
			</div>

			{/* Desktop below */}
			<div className="flat-menu">
				{navItems.map((navItem, i) => {
					if (navItem.isRelative) {
						return (
							<Link className={navClass} to={navItem.url} key={navItem.url}>
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
								key={navItem.url}
							>
								{navItem.label}
							</a>
						);
					}

					if (navItem.hasSubMenu) {
						return (
							<Fragment key={`${navItem.url}-${i}`}>
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
										horizontal: "left",
									}}
									getContentAnchorEl={null}
									className="site-nav-sub-menu"
								>
									{sortedTags.map((tag, i) => (
										<MenuItem key={`menuitem-${i}`}>
											<Link
												className="site-nav-sub-menu-item"
												to={`/blog/tag/${tag.slug}`}
											>
												{upperFirst(tag.name)} ({tag.postCount})
											</Link>
										</MenuItem>
									))}
								</Menu>
							</Fragment>
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
	navClass: PropTypes.string,
	tags: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			slug: PropTypes.string,
			postCount: PropTypes.number,
		})
	),
};

export default Navigation;
