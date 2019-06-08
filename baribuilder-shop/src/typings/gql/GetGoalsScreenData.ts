/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetGoalsScreenData
// ====================================================

export interface GetGoalsScreenData_allIngredientTypes {
  __typename: "IngredientType";
  name: string;
  defaultUnits: INGREDIENT_QUANTITY_UNITS;
  synonyms: string[] | null;
}

export interface GetGoalsScreenData {
  allIngredientTypes: GetGoalsScreenData_allIngredientTypes[];
}
