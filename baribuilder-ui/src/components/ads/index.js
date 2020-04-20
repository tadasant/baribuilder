import _CheapVitamins from "./CheapVitamins";
import _RecipesHeaderForm from "./RecipesHeaderForm";
import _RecipesModal from "./RecipesModal";
import _TipsHeaderForm from "./TipsHeaderForm";
import _TipsInlineForm from "./TipsInlineForm";
import _VitaminsBariatricForm from "./VitaminsBariatricForm";
import _VitaminsBypassForm from "./VitaminsBypassForm";
import _VitaminsSleeveForm from "./VitaminsSleeveForm";
import _WorkoutsHeaderForm from "./WorkoutsHeaderForm";
import _WorkoutsModal from "./WorkoutsModal";
import withAdAnalytics from "./hoc/withAdAnalytics";
import withVisibilityTracker from "./hoc/withVisibilityTracker";

const CheapVitamins = withVisibilityTracker(
	withAdAnalytics(_CheapVitamins, {
		adContent: "cheap_vitamins_custom_calculator",
	})
);
const RecipesHeaderForm = withVisibilityTracker(
	withAdAnalytics(_RecipesHeaderForm, {
		adContent: "hungry_protein_rich_recipes_pdf",
	})
);
// Coding these in directly because ConvertKit CSS for popups makes this quirky
// const RecipesModal = withVisibilityTracker(
// 	withAdAnalytics(_RecipesModal, {
// 		adContent: "hungry_protein_rich_recipes_pdf",
// 		adPlacement: "50%_popup",
// 	})
// );
const RecipesModal = _RecipesModal;

const TipsHeaderForm = withVisibilityTracker(
	withAdAnalytics(_TipsHeaderForm, {
		adContent: "tips_newsletter",
	})
);
const TipsInlineForm = withVisibilityTracker(
	withAdAnalytics(_TipsInlineForm, {
		adContent: "tips_newsletter",
	})
);
const VitaminsBariatricForm = withVisibilityTracker(
	withAdAnalytics(_VitaminsBariatricForm, {
		adContent: "bariatric_vitamins_overpaying_calculator",
	})
);
const VitaminsBypassForm = withVisibilityTracker(
	withAdAnalytics(_VitaminsBypassForm, {
		adContent: "bypass_vitamins_overpaying_calculator",
	})
);
const VitaminsSleeveForm = withVisibilityTracker(
	withAdAnalytics(_VitaminsSleeveForm, {
		adContent: "sleeve_vitamins_overpaying_calculator",
	})
);
const WorkoutsHeaderForm = withVisibilityTracker(
	withAdAnalytics(_WorkoutsHeaderForm, {
		adContent: "stuck_home_workouts_pdf",
	})
);
// Coding these in directly because ConvertKit CSS for popups makes this quirky
// const WorkoutsModal = withVisibilityTracker(
// 	withAdAnalytics(_WorkoutsModal, {
// 		adContent: "stuck_home_workouts_pdf",
// 		adPlacement: "50%_popup",
// 	})
// );
const WorkoutsModal = _WorkoutsModal;

export {
	CheapVitamins,
	RecipesHeaderForm,
	RecipesModal,
	TipsHeaderForm,
	TipsInlineForm,
	VitaminsBariatricForm,
	VitaminsBypassForm,
	VitaminsSleeveForm,
	WorkoutsHeaderForm,
	WorkoutsModal,
};
