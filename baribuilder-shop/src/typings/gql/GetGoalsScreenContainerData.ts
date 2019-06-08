/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetGoalsScreenContainerData
// ====================================================

export interface GetGoalsScreenContainerData_goalIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
  minimumAmount: number | null;
  maximumAmount: number | null;
  units: INGREDIENT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface GetGoalsScreenContainerData_goalIngredients {
  __typename: "GoalIngredients";
  ingredientRanges: GetGoalsScreenContainerData_goalIngredients_ingredientRanges[];
}

export interface GetGoalsScreenContainerData {
  goalIngredients: GetGoalsScreenContainerData_goalIngredients;
}
