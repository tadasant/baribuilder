import React from "react";
import PropTypes from "prop-types";
import { MetaData } from "../components/common/meta";
import { Layout } from "../components/common";
import Helmet from "react-helmet";

/**
 * Search page for displaying custom google search results
 */

const Search = ({ location }) => {
	if (typeof window !== "undefined") {
		const urlParams = new URLSearchParams(location.search);
		if (urlParams && urlParams.has("query")) {
			// TODO: invoke query
			if (urlParams.get("pdf") === "recipes") {
				config.redirectUrl =
					"https://baribuilder.s3.amazonaws.com/_external/12-protein-rich-recipes-v1.pdf";
			} else if (urlParams.get("pdf") === "exercises") {
				config.redirectUrl =
					"https://baribuilder.s3.amazonaws.com/_external/10-home-exercises-v1.pdf";
			}
			config.redirectText = "your PDF download";
			config.hideConfirmation = true;
			config.externalLink = true;
			config.timeDelay = 2000;
		}
	}

	return (
		<>
			<Helmet>
				<script
					async
					src="https://cse.google.com/cse.js?cx=010043471689825147236:0nlvwloubft"
				></script>
			</Helmet>
			<MetaData location={location} title="Search" />
			<Layout>
				<div className="google-search-container">
					<div
						className="gcse-searchbox"
						data-enableHistory="true"
						data-autoCompleteMaxCompletions="5"
						data-autoCompleteMatchType="any"
					/>
					<div class="gcse-searchresults" data-refinementStyle="link" />
				</div>
			</Layout>
		</>
	);
};

Search.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
};

export default Search;
