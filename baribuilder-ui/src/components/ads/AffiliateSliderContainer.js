import React, { useState, useEffect } from "react";
import AffiliateSlider from "./AffiliateSlider";
import affiliateAds from "../../utils/affiliateAds";
import PropTypes from "prop-types";

const AffiliateSliderContainer = (props) => {
	const [chosenAd, setChosenAd] = useState(null);

	const { slug } = props;

	useEffect(() => {
		const candidateAds =
			slug in affiliateAds ? affiliateAds[slug] : affiliateAds.default;
		const randomIdx = Math.floor(Math.random() * candidateAds.length);
		setChosenAd(candidateAds[randomIdx]);
	}, [slug]);

	return chosenAd ? <AffiliateSlider ad={chosenAd} {...props} /> : null;
};

AffiliateSliderContainer.propTypes = {
	slug: PropTypes.string.isRequired,
};

export default AffiliateSliderContainer;
