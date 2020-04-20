import React, { useEffect } from "react";

// options:
// This can be used when doing quirky things with popups where traditional "is visible" heuristics are bad
//  disableView?: boolean;

// NOTE: get isVisible from withVisibilityTracker

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
function withAdAnalytics(WrappedComponent, options) {
	return function (inputProps) {
		const { adContent, adPlacement, disableView } = options;
		console.log(
			`Rendering withAdAnalytics component with ${
				inputProps.adContent || adContent
			}-${inputProps.adPlacement || adPlacement}`
		);

		useEffect(() => {
			if (disableView !== undefined && !disableView) {
				console.log(`isVisible: ${inputProps.isVisible}`);
			}
		}, [inputProps.isVisible]);

		const trackSubscribeClick = () => console.log("Subscribe clicked");
		const trackEmailOnFocus = () => console.log("Email focused");
		const trackEmailOnBlur = (fieldValue) =>
			console.log(`Email blurred with value ${fieldValue}`);

		const {
			adContent: _adContent,
			adPlacement: _adPlacement,
			isVisible,
			...otherProps
		} = inputProps;

		return (
			<WrappedComponent
				trackSubscribeClick={trackSubscribeClick}
				trackEmailOnFocus={trackEmailOnFocus}
				trackEmailOnBlur={trackEmailOnBlur}
				{...otherProps}
			/>
		);
	};
}

export default withAdAnalytics;
