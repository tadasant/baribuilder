import React from "react";
import PropTypes from "prop-types";
import { MetaData } from "../components/common/meta";
import { Layout } from "../components/common";
import Helmet from "react-helmet";

/**
 * Search page for displaying custom google search results
 */

const Search = ({ location }) => {
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
					<p className="disclaimer">
						Please note that the first few results on this page may be external
						advertisements. Scroll down for BariBuilder results.
					</p>
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
