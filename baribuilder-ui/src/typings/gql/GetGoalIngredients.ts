/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetGoalIngredients
// ====================================================

export interface GetGoalIngredients_goalIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
  minimumAmount: number | null;
  maximumAmount: number | null;
  units: INGREDIENT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface GetGoalIngredients_goalIngredients {
  __typename: "GoalIngredients";
  ingredientRanges: GetGoalIngredients_goalIngredients_ingredientRanges[];
}

export interface GetGoalIngredients {
  goalIngredients: GetGoalIngredients_goalIngredients;
}
