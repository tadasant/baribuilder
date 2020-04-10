import React from "react";
import Helmet from "react-helmet";

// Import this on all templates where I want Pinterest conversion tracking
// Records pagevisit as well
// https://ads.pinterest.com/advertiser/549759195920/conversions/tag/?subPage=PINTEREST_TAG_INSTRUCTIONS

const PinterestTag = () => (
	// Using Helmet as workaround for lack of Fragment support https://github.com/nfl/react-helmet/issues/342
	<Helmet>
		<script>
			{`
		!function(e){if(!window.pintrk){window.pintrk = function () { window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0]; r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js"); pintrk('load', '2612478441465', {em: '<user_email_address>'}); pintrk('page');
		`}
		</script>
		<noscript>{`
		<img height="1" width="1" style="display:none;" alt="" src="https://ct.pinterest.com/v3/?event=init&tid=2612478441465&pd[em]=<hashed_email_address>&noscript=1" />
	`}</noscript>
		<script>
			{`
		pintrk('track', 'pagevisit');
		`}
		</script>
	</Helmet>
);

export default PinterestTag;
