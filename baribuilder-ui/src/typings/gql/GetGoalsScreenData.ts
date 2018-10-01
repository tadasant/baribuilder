/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetGoalsScreenData
// ====================================================

export interface GetGoalsScreenData_goalIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
  minimumAmount: number | null;
  maximumAmount: number | null;
  units: INGREDIENT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface GetGoalsScreenData_goalIngredients {
  __typename: "GoalIngredients";
  ingredientRanges: GetGoalsScreenData_goalIngredients_ingredientRanges[];
}

export interface GetGoalsScreenData_allIngredientTypes {
  __typename: "IngredientType";
  name: string;
  defaultUnits: INGREDIENT_QUANTITY_UNITS;
  synonyms: string[] | null;
}

export interface GetGoalsScreenData {
  goalIngredients: GetGoalsScreenData_goalIngredients;
  allIngredientTypes: GetGoalsScreenData_allIngredientTypes[];
}
