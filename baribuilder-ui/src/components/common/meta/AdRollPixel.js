import React from "react";
import Helmet from "react-helmet";

// Import this on all templates where I want AdRoll conversion tracking
// https://help.adroll.com/hc/en-us/articles/211845978-Activate-Your-Pixel

const AdRollPixel = () => {
	var adroll_adv_id = "XELL45XZINHKFLSWAZXCEW";
	var adroll_pix_id = "6I3C5DVKQREFZC6Q44RXUC";
	return (
		// Using Helmet as workaround for lack of Fragment support https://github.com/nfl/react-helmet/issues/342
		<Helmet>
			<script
				async="true"
				type="text/javascript"
				src="https://s.adroll.com/j/roundtrip.js"
			/>
		</Helmet>
	);
};

export default AdRollPixel;
