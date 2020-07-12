/**
 * affiliateAds is a mapping of [slug: string]: ad[]
 *
 * ad is of shape: {
 *  id: <unique identifier we can use for analytics>
 * 	link: <Amazon affiliate link>
 *  copy: <text to display in the ad>
 *  cta: <text to display on the CTA button>
 *  imgSrc: <image to display in the ad>
 *  percentage: <how far down the page to display the ad; default 50>
 * }
 */

const affiliateAds = {
	"gastric-bypass-and-hair-loss": [
		{
			id: "bariatric-advantage-b12",
			link: "https://amzn.to/323j7B0",
			copy: "Bariatric B12 Vitamins can help prevent hair loss",
			cta: "Buy",
			imgSrc:
				"https://baribuilder-affiliate-imgs.s3.amazonaws.com/bariatric-advantage-b12.png",
			percentage: 50,
		},
	],
	default: [
		{
			id: "barimelts-calcium",
			link: "https://amzn.to/3gMSCnt",
			copy: "Use Bariatric Calcium to keep your bones strong",
			cta: "Buy",
			imgSrc:
				"https://baribuilder-affiliate-imgs.s3.amazonaws.com/bari-melts-calcium.png",
			percentage: 50,
		},
	],
};

module.exports = affiliateAds;
