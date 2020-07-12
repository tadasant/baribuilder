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

const proteinShakesAd = {
	link: "https://amzn.to/3flPK0l",
	imgSrc:
		"https://baribuilder-affiliate-imgs.s3.amazonaws.com/premier-protein.png",
};

const proteinInfusedWaterAd = {
	link: "https://amzn.to/2WdVFNM",
	imgSrc:
		"https://baribuilder-affiliate-imgs.s3.amazonaws.com/protein-water.png",
};

const crystalLightAd = {
	link: "https://amzn.to/2OfW5ij",
	imgSrc:
		"https://baribuilder-affiliate-imgs.s3.amazonaws.com/crystal-light.png",
};

const multivitaminAd = {
	link: "https://amzn.to/2Of4Ske",
	imgSrc:
		"https://baribuilder-affiliate-imgs.s3.amazonaws.com/ba-multivitamin.png",
};

const affiliateAds = {
	"gastric-bypass-pouch-reset": [
		{
			...proteinInfusedWaterAd,
			id: "protein-infused-water-pouch-reset",
			copy: "Get some protein infused water to assist your reset",
		},
		{
			...proteinShakesAd,
			id: "protein-shakes-pouch-reset",
			copy: "Get some protein shakes to assist your reset",
		},
		{
			...crystalLightAd,
			id: "crystal-light-pouch-reset",
			copy: "Use Crystal Light as a sugar-free, low calorie liquid",
		},
	],
	"liver-shrinking-diet": [
		{
			...proteinInfusedWaterAd,
			id: "protein-infused-water-liver-shrinking",
			copy: "Get some protein infused water as part of the diet",
		},
		{
			...proteinShakesAd,
			id: "protein-shakes-liver-shrinking",
			copy: "Get some protein shakes as part of the diet",
		},
		{
			...crystalLightAd,
			id: "crystal-light-liver-shrinking",
			copy: "Use Crystal Light as a sugar-free, low calorie liquid",
		},
	],
	"gastric-bypass-and-hair-loss": [
		{
			id: "b12-hair-bypass",
			link: "https://amzn.to/323j7B0",
			copy: "Bariatric B12 Vitamins can help prevent hair loss",
			imgSrc:
				"https://baribuilder-affiliate-imgs.s3.amazonaws.com/bariatric-advantage-b12.png",
		},
		{
			...proteinShakesAd,
			id: "protein-shakes-hair-bypass",
			copy: "Make sure you're getting plenty of protein shakes",
		},
	],
	"cheating-on-liquid-diet-before-gastric-bypass": [
		{
			...proteinShakesAd,
			id: "protein-shakes-liquid-diet-bypass",
			copy: "Don't cheat: drink protein shakes",
		},
		{
			...crystalLightAd,
			id: "crystal-light-liquid-diet-bypass",
			copy: "Don't cheat: try Crystal Light as a low calorie option",
		},
	],
	"how-to-tighten-loose-skin-after-gastric-bypass-without-surgery": [
		{
			...proteinInfusedWaterAd,
			id: "protein-infused-water-loose-skin-without-surgery",
			copy: "Fill your daily protein quota with protein infused water",
		},
	],
	"liquid-diet-before-gastric-bypass-surgery": [
		{
			...proteinInfusedWaterAd,
			id: "protein-infused-water-liquid-bypass",
			copy: "Fill your daily protein quota with protein infused water",
		},
		{
			...crystalLightAd,
			id: "crystal-light-liquid-bypass",
			copy: "Use Crystal Light as a sugar-free, low calorie liquid",
		},
	],
	"bariatric-surgery-and-popcorn": [
		{
			...proteinShakesAd,
			id: "protein-shakes-popcorn",
			copy: "Instead of popcorn, drink protein shakes",
		},
	],
	"gastric-sleeve-regrets": [
		{
			...multivitaminAd,
			id: "sleeve-regrets-multivitamin",
			copy: "Make sure you're getting the right multivitamins",
		},
	],
	"gastric-sleeve-and-alcohol": [
		{
			...multivitaminAd,
			id: "sleeve-alcohol-multivitamin",
			copy: "Make sure you're getting the right multivitamins",
		},
	],
	"gastric-bypass-pre-op-diet": [
		{
			...proteinInfusedWaterAd,
			id: "protein-infused-water-bypass-preop",
			copy: "Get some protein infused water as part of your pre-op diet",
		},
		{
			...proteinShakesAd,
			id: "protein-shakes-bypass-preop",
			copy: "Get some protein shakes as part of your pre-op diet",
		},
		{
			...crystalLightAd,
			id: "crystal-light-bypass-preop",
			copy: "Get some Crystal Light as part of your pre-op diet",
		},
	],
	default: [
		{
			id: "barimelts-calcium",
			link: "https://amzn.to/3gMSCnt",
			copy: "Use Bariatric Calcium to keep your bones strong",
			imgSrc:
				"https://baribuilder-affiliate-imgs.s3.amazonaws.com/bari-melts-calcium.png",
		},
	],
};

module.exports = affiliateAds;
