import React, { useState, useEffect } from "react";

// This is made specifically for ConvertKit modal forms that use an overlay with data-active to trigger popups
// Works by waiting for the external script JS code to trigger the data-active, by chaining MutationObservers

function withModalVisibilityTracker(WrappedComponent) {
	return (props) => {
		const [isVisible, setIsVisible] = useState(false);
		useEffect(() => {
			// Using MutationObserver to capture when data-active=true gets sets on the modal
			const form = document.querySelector(`[data-format="modal"]`);
			new MutationObserver(() => {
				const overlay = document.querySelector(`[data-object="overlay"]`);
				new MutationObserver((mutations) => {
					mutations.forEach((mutation) => {
						if (
							mutation.type == "attributes" &&
							mutation.attributeName === "data-active"
						) {
							const dataActive =
								overlay.attributes.getNamedItem("data-active").value === "true";
							setIsVisible(dataActive);
						}
					});
				}).observe(overlay, {
					attributes: true,
				});
			}).observe(form, {
				attributes: true,
			});
		}, []);

		return <WrappedComponent isVisible={isVisible} {...props} />;
	};
}

export default withModalVisibilityTracker;
