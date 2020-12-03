import React, { useEffect, useState, useCallback } from "react";
import { fireEvent } from "../../../analytics/googleAnalytics";

const trackSubscribeHover = () =>
	fireEvent({
		category: "Ad",
		action: "Subscribe (Hover)",
		nonInteraction: false,
		label,
	});
const trackSubscribeClick = () =>
	fireEvent({
		category: "Ad",
		action: "Subscribe (Click)",
		nonInteraction: false,
		label,
	});
const trackEmailOnFocus = () =>
	fireEvent({
		category: "Ad",
		action: "Email (Focus)",
		nonInteraction: false,
		label,
	});
const trackEmailOnBlur = (fieldValue) => {
	if (fieldValue && fieldValue.length > 1) {
		fireEvent({
			category: "Ad",
			action: "Email (Blur)",
			nonInteraction: false,
			label,
		});
	}
};

// options:
//  disableView?: boolean;

// NOTE: get isVisible from withVisibilityTracker or withModalVisibilityTracker

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
		const { adContent, adPlacement, disableView } = options || {};
		const label = `${inputProps.adContent || adContent}-${
			inputProps.adPlacement || adPlacement
		}`;

		const [timeStartedReading, setTimeStartedReading] = useState(0);
		const [wasVisible, setWasVisible] = useState(false);
		useEffect(() => {
			if (disableView === undefined || !disableView) {
				if (isVisible) {
					fireEvent({
						category: "Ad",
						action: "View",
						nonInteraction: true,
						label,
					});
					setTimeStartedReading(new Date().getTime());
					setWasVisible(true);
				} else {
					if (wasVisible) {
						fireEvent({
							category: "Ad",
							action: "Read",
							nonInteraction: true,
							value: new Date().getTime() - timeStartedReading,
							label,
						});
					}
					setWasVisible(false);
				}
			}
		}, [inputProps.isVisible]);

		const {
			adContent: _adContent,
			adPlacement: _adPlacement,
			isVisible,
			...otherProps
		} = inputProps;

		return (
			<WrappedComponent
				trackSubscribeClick={useCallback(trackSubscribeClick)}
				trackEmailOnFocus={useCallback(trackEmailOnFocus)}
				trackEmailOnBlur={useCallback(trackEmailOnBlur)}
				trackSubscribeHover={useCallback(trackSubscribeHover)}
				{...otherProps}
			/>
		);
	};
}

export default withAdAnalytics;
