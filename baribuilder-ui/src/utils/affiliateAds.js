/**
 * affiliateAds is a mapping of [slug: string]: ad[]
 *
 * ad is of shape: {
 *  id: <unique identifier we can use for analytics>
 * 	link: <Amazon affiliate link>
 *  copy: <text to display in the ad>
 *  cta: <text to display on the CTA button; default Buy>
 *  imgSrc: <image to display in the ad; default no img>
 *  percentage: <how far down the page to display the ad; default 50>
 * }
 */

const adsById = {
	"bariatric-advantage-b12-hair": {
		id: "bariatric-advantage-b12",
		link: "https://amzn.to/323j7B0",
		copy: "Bariatric B12 Vitamins can help prevent hair loss",
		imgSrc:
			"https://baribuilder-affiliate-imgs.s3.amazonaws.com/bariatric-advantage-b12.png",
	},
	"barimelts-calcium-default": {
		id: "barimelts-calcium",
		link: "https://amzn.to/3gMSCnt",
		copy: "Use Bariatric Calcium to keep your bones strong",
		imgSrc:
			"https://baribuilder-affiliate-imgs.s3.amazonaws.com/bari-melts-calcium.png",
	},
};

const affiliateAds = {
	"gastric-bypass-and-hair-loss": [adsById["bariatric-advantage-b12-hair"]],
	default: [adsById["barimelts-calcium-default"]],
};

module.exports = affiliateAds;
