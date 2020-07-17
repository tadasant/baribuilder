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
	link:
		"https://www.amazon.com/Premier-Protein-Shake-Chocolate-11-5/dp/B07MJL8NXR/ref=as_li_ss_tl?dchild=1&keywords=premier+protein+shakes&qid=1594523391&sr=8-4&linkCode=ll1&tag=bariduiler-ad-20&linkId=a9fc18273fc6a5870c221eb23b8511e5&language=en_US",
	imgSrc:
		"https://baribuilder-affiliate-imgs.s3.amazonaws.com/premier-protein.png",
};

const proteinInfusedWaterAd = {
	link: "https://amzn.to/2WdVFNM",
	imgSrc:
		"https://www.amazon.com/Protein2o-Flavor-Fusion-Piece-Variety/dp/B07BBWJY5X/ref=as_li_ss_tl?dchild=1&keywords=bariatric+protein+bottles&qid=1594523226&sr=8-23&linkCode=ll1&tag=bariduiler-ad-20&linkId=3034cf9b4cf8da9a396d54f0320ad94e&language=en_US",
};

const crystalLightAd = {
	link:
		"https://www.amazon.com/Crystal-Light-Pitcher-Packets-Canisters/dp/B00B041EP0/ref=as_li_ss_tl?dchild=1&keywords=crystal+light&qid=1594523521&sr=8-7&linkCode=ll1&tag=bariduiler-ad-20&linkId=d464907be04cdfe05809b813baa2d1e8&language=en_US",
	imgSrc:
		"https://baribuilder-affiliate-imgs.s3.amazonaws.com/crystal-light.png",
};

const multivitaminAd = {
	link:
		"https://www.amazon.com/Bariatric-Advantage-Ultra-Multi-Formula/dp/B07DP7RKTK/ref=as_li_ss_tl?dchild=1&keywords=multivitamin+bariatric+advantage&qid=1594524168&sr=8-8&linkCode=ll1&tag=bariduiler-ad-20&linkId=e89f2e34af1e81e35977c2cf4c67d8b1&language=en_US",
	imgSrc:
		"https://baribuilder-affiliate-imgs.s3.amazonaws.com/ba-multivitamin.png",
};

const calciumAd = {
	link:
		"https://www.amazon.com/BariMelts-Calcium-Dissolvable-Bariatric-Vitamins/dp/B00OKNCI0S/ref=as_li_ss_tl?dchild=1&keywords=bariatric+calcium&qid=1594494395&sr=8-7&linkCode=ll1&tag=bariduiler-ad-20&linkId=32c7d2b10787faca188a1e20240e6df3&language=en_US",
	imgSrc:
		"https://baribuilder-affiliate-imgs.s3.amazonaws.com/bari-melts-calcium.png",
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
			...calciumAd,
			id: "barimelts-calcium",
			copy: "Use Bariatric Calcium to keep your bones strong",
		},
	],
};

module.exports = affiliateAds;
