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

	useEffect(() => {
		setTimeout(() => setDotsText("."), 500);
		setTimeout(() => setDotsText(".."), 2000);
		setTimeout(() => setDotsText("..."), 4000);
		setTimeout(() => navigate("/"), 5000);
	}, []);

	return (
		<>
			<MetaData location={location} title="Thank You" />
			<Layout>
				<div className="container">
					<h1>Subscription confirmed</h1>
					<h3>
						Boom! You're officially confirmed and on the list. Expect some great
						emails headed your way very soon.
					</h3>
					<p>
						You are being redirected to our homepage in 5 seconds{`${dotsText}`}
					</p>
				</div>
			</Layout>
		</>
	);
};

SignUpThankYou.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

export default SignUpThankYou;
