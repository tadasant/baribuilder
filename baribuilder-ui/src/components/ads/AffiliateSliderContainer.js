import React from "react";
import AffiliateSlider from "./AffiliateSlider";
import affiliateAds from "../../utils/affiliateAds";
import PropTypes from "prop-types";

const AffiliateSliderContainer = (props) => {
	const { slug } = props;

	// TODO Choose a randomized ad from the matching list
	const chosenAd =
		slug in affiliateAds ? affiliateAds[slug][0] : affiliateAds.default[0];
	return <AffiliateSlider ad={chosenAd} {...props} />;
};

AffiliateSliderContainer.propTypes = {
	slug: PropTypes.string.isRequired,
};

export default AffiliateSliderContainer;
