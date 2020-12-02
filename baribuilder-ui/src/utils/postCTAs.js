import Loadable from "@loadable/component";
import ConvertKitInlineCTAForm from ;

const InlineCTAForm = Loadable(() =>
 import("../components/ads/ConvertKitInlineCTAForm")
);

const FORM_IDS = {
	KETO_12: 111111,
	HIGH_PROTEIN_12: 222222,
	AT_HOME_EXERCISES_10: 3333333
}

const AD_CONTENTS = {
	KETO_12: "12_keto_recipes_pdf_el39",
	HIGH_PROTEIN_12: "12_high_protein_recipes_pdf_el39",
	AT_HOME_EXERCISES_10: "10_at_home_exercises_pdf_el39"
}

const AD_PLACEMENTS = {
	TOP: "inline-ck-top",
	MIDDLE: "inline-ck-middle",
	BOTTOM: "inline-ck-bottom"
}

const AD_IMGS = {
	PEANUT_BUTTER_CUP: ""
}

const postToCTAs = {
	slug1: {
		TOP: {
			component: InlineCTAForm,
			props: {
				adContent: "",
				adPlacement: "",
				formId: FORM_IDS.KETO_12,
				imgSrc: "",
				headerCopy: ""
			},
		},
		MIDDLE: {
			component: InlineCTAForm,
			props: {
				adContent: "",
				adPlacement: "",
				formId: FORM_IDS.KETO_12,
				imgSrc: "",
				headerCopy: ""
			},
		},
		BOTTOM: {
			component: InlineCTAForm,
			props: {
				adContent: "",
				adPlacement: "",
				formId: FORM_IDS.KETO_12,
				imgSrc: "",
				headerCopy: ""
			},
		},
	},
	default: {
		TOP: {
			component: null,
			props: {
				adContent: "",
				adPlacement: "",
				formId: FORM_IDS.KETO_12,
				imgSrc: "",
				headerCopy: ""
			},
		},
		MIDDLE: {
			component: null,
			props: {
				adContent: "",
				adPlacement: "",
				formId: FORM_IDS.KETO_12,
				imgSrc: "",
				headerCopy: ""
			},
		},
		BOTTOM: {
			component: null,
			props: {
				adContent: "",
				adPlacement: "",
				formId: FORM_IDS.KETO_12,
				imgSrc: "",
				headerCopy: ""
			},
		},
	},
};

export default postToCTAs;
