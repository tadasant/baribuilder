/**
 * options
 *   category:
 *     "Article" | "Ad" | "Amazon Referral Link" | "Referral Test Link" | "Outbound Link" | "Internal Link"
 *   action:
 *     "Read" (with value of # seconds to get to that point) | "View"
 *   nonInteraction:
 *     true / false
 *   label:
 *     `from ${fromSlug} to ${href} via ${anchorText}`
 *     `${postSlug}`
 *     `${ad-content}-${ad-placement}`
 *   hitCallback
 *
 * extraOptions
 *   https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 */
import React from "react";
import { toast } from "react-toastify";
import { trackCustomEvent } from "gatsby-plugin-google-analytics";

export const fireEvent = (options, ...extraOptions) => {
	if (process.env.NODE_ENV !== "production") {
		toast.info(
			<div>
				<p>Event Fired</p>
				<pre>
					<code>
						{JSON.stringify({ ...options, ...extraOptions }, null, 2)}
					</code>
				</pre>
			</div>,
			{ autoClose: 5000, draggable: true }
		);
	}
	trackCustomEvent({
		...options,
		...extraOptions,
	});
};
