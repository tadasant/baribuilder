import React from "react";

// interface InputProps {
//  adContent?: string;
// 	adPlacement?: string;
// }

// interface OutputProps {
// 	trackSubscribeClick: () => void;
// 	trackEmailOnFocus: () => void;
// 	trackEmailOnBlur: (fieldValue: string) => void;
// }

// AdContent is the string sent along with GA events representing an id for the content used in the ad
function withAdAnalytics(WrappedComponent, { adContent, adPlacement }) {
	return (inputProps) => {
		console.log(
			`Rendering withAdAnalytics component with ${
				inputProps.adContent || adContent
			}-${inputProps.adPlacement || adPlacement}`
		);

		const trackSubscribeClick = () => console.log("Subscribe clicked");
		const trackEmailOnFocus = () => console.log("Email focused");
		const trackEmailOnBlur = (fieldValue) =>
			console.log(`Email blurred with value ${fieldValue}`);

		return (
			<WrappedComponent
				trackSubscribeClick={trackSubscribeClick}
				trackEmailOnFocus={trackEmailOnFocus}
				trackEmailOnBlur={trackEmailOnBlur}
			/>
		);
	};
}

export default withAdAnalytics;
