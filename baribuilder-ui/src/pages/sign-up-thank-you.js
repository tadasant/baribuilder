import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";
import { navigate } from "gatsby";

/**
 * Thank you page for tracking newsletter signups.
 */

const SignUpThankYou = ({ location }) => {
	const [dotsText, setDotsText] = useState("");

	const config = {
		// Redirect to home by default
		redirectUrl: "/",
		redirectText: "our homepage",
		hideConfirmation: false,
		externalLink: false,
		timeDelay: 5000,
	};

	if (typeof window !== "undefined") {
		const urlParams = new URLSearchParams(location.search);
		if (urlParams && urlParams.has("pdf")) {
			if (urlParams.get("pdf") === "recipes") {
				config.redirectUrl =
					"https://baribuilder.s3.amazonaws.com/_external/12-protein-rich-recipes-v1.pdf";
			} else if (urlParams.get("pdf") === "exercises") {
				config.redirectUrl =
					"https://baribuilder.s3.amazonaws.com/_external/10-home-exercises-v1.pdf";
			} else if (urlParams.get("pdf") === "keto-recipes") {
				config.redirectUrl =
					"https://baribuilder.s3.amazonaws.com/_external/12-bariatric-keto-diet-recipes-v1-short.pdf";
			}
			config.redirectText = "your PDF download";
			config.hideConfirmation = true;
			config.externalLink = true;
			config.timeDelay = 2000;
		} else if (urlParams && urlParams.has("calculator")) {
			if (urlParams.get("calculator") === "sleeve") {
				config.redirectUrl = "https://shop.baribuilder.com/sleeve";
			} else if (urlParams.get("calculator") === "bypass") {
				config.redirectUrl = "https://shop.baribuilder.com/bypass";
			} else if (urlParams.get("calculator") === "other") {
				config.redirectUrl = "https://shop.baribuilder.com/goals";
			}
			config.redirectText = "the calculator";
			config.hideConfirmation = true;
			config.externalLink = true;
			config.timeDelay = 2000;
		}
	}

	useEffect(() => {
		setTimeout(() => setDotsText("."), config.timeDelay / 4);
		setTimeout(() => setDotsText(".."), (config.timeDelay / 4) * 2);
		setTimeout(() => setDotsText("..."), (config.timeDelay / 4) * 3);
		setTimeout(() => {
			if (config.externalLink) {
				window.location.href = config.redirectUrl;
			} else {
				navigate(config.redirectUrl);
			}
		}, config.timeDelay);
	}, []);

	return (
		<>
			<MetaData location={location} title="Thank You" />
			<Layout>
				<div className="container">
					{config.hideConfirmation ? null : (
						<React.Fragment>
							<h1>Subscription confirmed</h1>
							<h3>
								Boom! You're officially confirmed and on the list. Expect some
								great emails headed your way very soon.
							</h3>
						</React.Fragment>
					)}

					<p>
						You are being redirected to {config.redirectText}
						{dotsText}
					</p>
				</div>
			</Layout>
		</>
	);
};

SignUpThankYou.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
};

export default SignUpThankYou;
