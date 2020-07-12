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
			copy: "",
		},
		{
			...proteinShakesAd,
			id: "protein-shakes-pouch-reset",
			copy: "",
		},
		{
			...crystalLightAd,
			id: "crystal-light-pouch-reset",
			copy: "",
		},
	],
	"liver-shrinking-diet": [
		{
			...proteinInfusedWaterAd,
			id: "protein-infused-water-liver-shrinking",
			copy: "",
		},
		{
			...proteinShakesAd,
			id: "protein-shakes-liver-shrinking",
			copy: "",
		},
		{
			...crystalLightAd,
			id: "crystal-light-liver-shrinking",
			copy: "",
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
			copy: "",
		},
	],
	"cheating-on-liquid-diet-before-gastric-bypass": [
		{
			...proteinShakesAd,
			id: "protein-shakes-liquid-diet-bypass",
			copy: "",
		},
		{
			...crystalLightAd,
			id: "crystal-light-liquid-diet-bypass",
			copy: "",
		},
	],
	"how-to-tighten-loose-skin-after-gastric-bypass-without-surgery": [
		{
			...proteinInfusedWaterAd,
			id: "protein-infused-water-loose-skin-without-surgery",
			copy: "",
		},
	],
	"liquid-diet-before-gastric-bypass-surgery": [
		{
			...proteinInfusedWaterAd,
			id: "protein-infused-water-liquid-bypass",
			copy: "",
		},
		{
			...crystalLightAd,
			id: "crystal-light-liquid-bypass",
			copy: "",
		},
	],
	"bariatric-surgery-and-popcorn": [
		{
			...proteinShakesAd,
			id: "protein-shakes-popcorn",
			copy: "",
		},
	],
	"gastric-sleeve-regrets": [
		{
			...multivitaminAd,
			id: "sleeve-regrets-multivitamin",
			copy: "",
		},
	],
	"gastric-sleeve-and-alcohol": [
		{
			...multivitaminAd,
			id: "sleeve-alcohol-multivitamin",
			copy: "",
		},
	],
	"gastric-bypass-pre-op-diet": [
		{
			...proteinInfusedWaterAd,
			id: "protein-infused-water-bypass-preop",
			copy: "",
		},
		{
			...proteinShakesAd,
			id: "protein-shakes-bypass-preop",
			copy: "",
		},
		{
			...crystalLightAd,
			id: "crystal-light-bypass-preop",
			copy: "",
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
