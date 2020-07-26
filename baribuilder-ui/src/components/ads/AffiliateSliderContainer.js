import React, { useState, useEffect } from "react";
import AffiliateSlider from "./AffiliateSlider";
// import AffiliateSliderModal from "./AffiliateSliderModal";
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

	// Uncomment if I want slider instead of modal
	const Slider = AffiliateSlider;
	// const Slider = AffiliateSliderModal;

	return chosenAd ? <Slider ad={chosenAd} {...props} /> : null;
};

AffiliateSliderContainer.propTypes = {
	slug: PropTypes.string.isRequired,
};

export default AffiliateSliderContainer;
