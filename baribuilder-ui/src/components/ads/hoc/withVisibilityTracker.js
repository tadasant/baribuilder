import React from "react";
import TrackVisibility from "react-on-screen";

function withVisibilityTracker(WrappedComponent) {
	return (props) => (
		<TrackVisibility partialVisibility>
			{({ isVisible }) => <WrappedComponent isVisible={isVisible} {...props} />}
		</TrackVisibility>
	);
}

export default withVisibilityTracker;
