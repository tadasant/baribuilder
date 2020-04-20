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
import withAdAnalytics from "./withAdAnalytics";

const CheapVitamins = withAdAnalytics(_CheapVitamins, {
	adContent: "cheap_vitamins_custom_calculator",
});
const RecipesHeaderForm = withAdAnalytics(_RecipesHeaderForm, {
	adContent: "hungry_protein_rich_recipes_pdf",
});
const RecipesModal = withAdAnalytics(_RecipesModal, {
	adContent: "hungry_protein_rich_recipes_pdf",
	adPlacement: "50%_popup",
});
const TipsHeaderForm = withAdAnalytics(_TipsHeaderForm, {
	adContent: "tips_newsletter",
});
const TipsInlineForm = withAdAnalytics(_TipsInlineForm, {
	adContent: "tips_newsletter",
});
const VitaminsBariatricForm = withAdAnalytics(_VitaminsBariatricForm, {
	adContent: "bariatric_vitamins_overpaying_calculator",
});
const VitaminsBypassForm = withAdAnalytics(_VitaminsBypassForm, {
	adContent: "bypass_vitamins_overpaying_calculator",
});
const VitaminsSleeveForm = withAdAnalytics(_VitaminsSleeveForm, {
	adContent: "sleeve_vitamins_overpaying_calculator",
});
const WorkoutsHeaderForm = withAdAnalytics(_WorkoutsHeaderForm, {
	adContent: "stuck_home_workouts_pdf",
});
const WorkoutsModal = withAdAnalytics(_WorkoutsModal, {
	adContent: "stuck_home_workouts_pdf",
	adPlacement: "50%_popup",
});

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
