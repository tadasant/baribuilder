/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetGoalsScreenData
// ====================================================

export interface GetGoalsScreenData_desiredIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
  minimumAmount: number | null;
  maximumAmount: number | null;
  units: INGREDIENT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface GetGoalsScreenData_desiredIngredients {
  __typename: "DesiredIngredients";
  ingredientRanges: GetGoalsScreenData_desiredIngredients_ingredientRanges[];
}

export interface GetGoalsScreenData_allIngredientTypes {
  __typename: "IngredientType";
  name: string;
  defaultUnits: INGREDIENT_QUANTITY_UNITS;
  synonyms: string[] | null;
}

export interface GetGoalsScreenData {
  desiredIngredients: GetGoalsScreenData_desiredIngredients;
  allIngredientTypes: GetGoalsScreenData_allIngredientTypes[];
}
