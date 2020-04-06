import React, { Fragment } from "react";
import Helmet from "react-helmet";

// Import this on all templates where I want Share buttons, provided by ShareThis
// https://sharethis.com/onboarding/

const ShareThisMeta = () => {
	return (
		<Helmet>
			<script
				type="text/javascript"
				src="https://platform-api.sharethis.com/js/sharethis.js#property=5e8a9551f59dce001921d1bd&product=inline-share-buttons"
				async="async"
			/>
		</Helmet>
	);
};

export default ShareThisMeta;
