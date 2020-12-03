import Loadable from "@loadable/component";

const InlineCTAForm = Loadable(() =>
	import("../components/ads/ConvertKitInlineCTAForm")
);

const FORM_IDS = {
	KETO_12: 1847628,
	HIGH_PROTEIN_12: 1538723,
	AT_HOME_EXERCISES_10: 1284689,
};

const AD_CONTENTS = {
	KETO_12: "12_keto_recipes_pdf_el39",
	HIGH_PROTEIN_12: "12_high_protein_recipes_pdf_el39",
	AT_HOME_EXERCISES_10: "10_at_home_exercises_pdf_el39",
};

const AD_PLACEMENTS = {
	TOP: "inline-ck-top",
	MIDDLE: "inline-ck-middle",
	BOTTOM: "inline-ck-bottom",
};

const AD_IMGS = {
	PEANUT_BUTTER_CUP:
		"https://embed.filekitcdn.com/e/6BBQyDxEeLtfyY667eRUm5/dTMgJHz6GGF5zbntYj6RfM",
	WORKOUTS:
		"https://embed.filekitcdn.com/e/6BBQyDxEeLtfyY667eRUm5/qHauua6XFDv9FHKqpwuL93",
	KETO_BOOK_COFFEE:
		"https://embed.filekitcdn.com/e/6BBQyDxEeLtfyY667eRUm5/nVgnsMDPMHjoRbtJcKU47a",
};

const postToCTAs = {
	"liver-shrinking-diet": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "Hungry? Try one of these 12 delicious bariatric meals.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "12 high protein recipes to get you through the week.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.TODO,
				headerCopy: "Free PDF of 12 high protein bariatric meal recipes.",
			},
		},
	},
	"gastric-bypass-and-hair-loss": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.KETO_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.KETO_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy:
					"Concerned about weight regain? Here are 12 bariatric keto recipes for bypass patients.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy:
					"Gastric bypass patients: 12 high protein recipes to get you through the week.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.KETO_12,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.KETO_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "12 recipes to get you on the bariatric keto diet.",
			},
		},
	},
	"gastric-sleeve-pouch-reset": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.KETO_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.KETO_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy:
					"Regaining weight after your sleeve? Bariatric keto can help get you back on track - try these 12 recipes.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.KETO_12,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.KETO_12,
				imgSrc: AD_IMGS.KETO_BOOK_COFFEE,
				headerCopy:
					"12 recipes to kick off your bariatric keto diet after your gastric sleeve.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.KETO_12,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.KETO_12,
				imgSrc: AD_IMGS.KETO_BOOK_COFFEE,
				headerCopy: "Don't miss these 12 recipes for bariatric keto.",
			},
		},
	},
	"how-to-shrink-liver-in-3-days": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "Hungry? Try one of these 12 delicious bariatric meals.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "12 high protein recipes to get you through the week.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.TODO,
				headerCopy: "Free PDF of 12 high protein bariatric meal recipes.",
			},
		},
	},
	"cheating-on-liquid-diet-before-gastric-bypass": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy:
					"Looking ahead to life after your bypass? Try one of these 12 delicious bariatric meals.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "12 high protein recipes to get you through the week.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.TODO,
				headerCopy: "Free PDF of 12 high protein bariatric meal recipes.",
			},
		},
	},
	"bariatric-surgery-and-popcorn": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.KETO_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.KETO_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy:
					"Bariatric keto can help stop weight regain - try these 12 recipes.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "12 high protein recipes to get you through the week.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.TODO,
				headerCopy: "Free PDF of 12 high protein bariatric meal recipes.",
			},
		},
	},
	"pain-after-gastric-bypass": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy:
					"Hungry? Try one of these 12 delicious bariatric meals for bypass patients.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.AT_HOME_EXERCISES_10,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.AT_HOME_EXERCISES_10,
				imgSrc: AD_IMGS.WORKOUTS,
				headerCopy: "10 at-home workout exercises.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.AT_HOME_EXERCISES_10,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.AT_HOME_EXERCISES_10,
				imgSrc: AD_IMGS.WORKOUTS,
				headerCopy: "Stuck at home? Try these 10 at-home workouts.",
			},
		},
	},
	"gastric-bypass-pouch-reset": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.KETO_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.KETO_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy:
					"Bariatric keto can help stop weight regain after a gastric bypass - try these 12 recipes.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.KETO_12,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.KETO_12,
				imgSrc: AD_IMGS.KETO_BOOK_COFFEE,
				headerCopy: "12 recipes to kick off your bariatric keto diet.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.KETO_12,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.KETO_12,
				imgSrc: AD_IMGS.KETO_BOOK_COFFEE,
				headerCopy: "Don't miss these 12 recipes for bariatric keto.",
			},
		},
	},
	// Zoom calls
	// "gastric-sleeve-horror-stories": {
	// 	TOP: {
	// 		component: InlineCTAForm,
	// 		props: {
	// 			adContent: AD_CONTENTS.TODO,
	// 			adPlacement: AD_PLACEMENTS.TOP,
	// 			formId: FORM_IDS.TODO,
	// 			imgSrc: AD_IMGS.TODO,
	// 			headerCopy: "TODO",
	// 		},
	// 	},
	// 	MIDDLE: {
	// 		component: InlineCTAForm,
	// 		props: {
	// 			adContent: AD_CONTENTS.TODO,
	// 			adPlacement: AD_PLACEMENTS.MIDDLE,
	// 			formId: FORM_IDS.TODO,
	// 			imgSrc: AD_IMGS.TODO,
	// 			headerCopy: "TODO",
	// 		},
	// 	},
	// 	BOTTOM: {
	// 		component: InlineCTAForm,
	// 		props: {
	// 			adContent: AD_CONTENTS.TODO,
	// 			adPlacement: AD_PLACEMENTS.BOTTOM,
	// 			formId: FORM_IDS.TODO,
	// 			imgSrc: AD_IMGS.TODO,
	// 			headerCopy: "TODO",
	// 		},
	// 	},
	// },
	"gastric-bypass-pre-op-diet": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy:
					"Hungry? Try one of these 12 delicious bariatric meals after your gastric bypass.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "12 high protein recipes to get you through the week.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.TODO,
				headerCopy: "Free PDF of 12 high protein bariatric meal recipes.",
			},
		},
	},
	"gastric-sleeve-diet-cheating": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy:
					"Tempted to cheat your sleeve diet? Try one of these 12 delicious bariatric meals.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "12 high protein recipes to get you through the week.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.TODO,
				headerCopy: "Free PDF of 12 high protein bariatric meal recipes.",
			},
		},
	},
	"liquid-diet-before-gastric-bypass-surgery": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "Hungry? Try one of these 12 delicious bariatric meals.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "12 high protein recipes to get you through the week.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.TODO,
				headerCopy: "Free PDF of 12 high protein bariatric meal recipes.",
			},
		},
	},
	"eating-one-week-after-gastric-sleeve": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "Hungry? Try one of these 12 delicious bariatric meals.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "12 high protein recipes to get you through the week.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.TODO,
				headerCopy: "Free PDF of 12 high protein bariatric meal recipes.",
			},
		},
	},
	"gastric-sleeve-and-alcohol": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "Hungry? Try one of these 12 delicious bariatric meals.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.AT_HOME_EXERCISES_10,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.AT_HOME_EXERCISES_10,
				imgSrc: AD_IMGS.WORKOUTS,
				headerCopy: "10 at-home workout exercises.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.AT_HOME_EXERCISES_10,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.AT_HOME_EXERCISES_10,
				imgSrc: AD_IMGS.WORKOUTS,
				headerCopy: "Stuck at home? Try these 10 at-home workouts.",
			},
		},
	},
	"how-to-tighten-loose-skin-after-gastric-bypass-without-surgery": {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "Hungry? Try one of these 12 delicious bariatric meals.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.AT_HOME_EXERCISES_10,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.AT_HOME_EXERCISES_10,
				imgSrc: AD_IMGS.WORKOUTS,
				headerCopy: "10 at-home workout exercises.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.AT_HOME_EXERCISES_10,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.AT_HOME_EXERCISES_10,
				imgSrc: AD_IMGS.WORKOUTS,
				headerCopy: "Stuck at home? Try these 10 at-home workouts.",
			},
		},
	},
	default: {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.KETO_12,
				adPlacement: AD_PLACEMENTS.TOP,
				formId: FORM_IDS.KETO_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy:
					"Bariatric keto can help stop weight regain - try these 12 recipes.",
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.MIDDLE,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.PEANUT_BUTTER_CUP,
				headerCopy: "12 high protein recipes to get you through the week.",
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: AD_CONTENTS.HIGH_PROTEIN_12,
				adPlacement: AD_PLACEMENTS.BOTTOM,
				formId: FORM_IDS.HIGH_PROTEIN_12,
				imgSrc: AD_IMGS.TODO,
				headerCopy: "Free PDF of 12 high protein bariatric meal recipes.",
			},
		},
	},
};

export default postToCTAs;
