import {IGoalsScreenState} from '../GoalsScreen';

export const CUSTOM_TEMPLATE_NAME = 'Custom...';

const state: IGoalsScreenState = {
  "selectedTemplateName": CUSTOM_TEMPLATE_NAME,
  "goalIngredients": {
    "__typename": "GoalIngredients",
    "ingredientRanges": []
  },
  "showRedirectModal": false
};

export default state;
