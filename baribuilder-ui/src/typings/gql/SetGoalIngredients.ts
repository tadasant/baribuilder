/* tslint:disable */
// This file was automatically generated and should not be edited.

import { GoalIngredientsInput, INGREDIENT_QUANTITY_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SetGoalIngredients
// ====================================================

export interface SetGoalIngredients_SetGoalIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
  minimumAmount: number | null;
  maximumAmount: number | null;
  units: INGREDIENT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface SetGoalIngredients_SetGoalIngredients {
  __typename: "GoalIngredients";
  ingredientRanges: SetGoalIngredients_SetGoalIngredients_ingredientRanges[];
}

export interface SetGoalIngredients {
  SetGoalIngredients: SetGoalIngredients_SetGoalIngredients;
}

export interface SetGoalIngredientsVariables {
  goalIngredients: GoalIngredientsInput;
}
