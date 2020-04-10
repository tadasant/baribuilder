import React from "react";
import Helmet from "react-helmet";

// Import this on all templates where I want Twitter ads tracking
// Records PageView as well
// https://ads.twitter.com/accounts/18ce54xbwt5/conversion_tracking/view_website_tag?id=o203b

const TwitterTag = () => (
	// Using Helmet as workaround for lack of Fragment support https://github.com/nfl/react-helmet/issues/342
	<Helmet>
		<script>{`
	!function(e,t,n,s,u,a) {e.twq || ((s = e.twq = function() { s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments); }), (s.version = "1.1"), (s.queue = []), (u = t.createElement(n)), (u.async = !0), (u.src = "//static.ads-twitter.com/uwt.js"), (a = t.getElementsByTagName(n)[0]), a.parentNode.insertBefore(u, a))} (window,document,'script'); twq('init','o203b'); twq('track','PageView');
	`}</script>
	</Helmet>
);

export default TwitterTag;
