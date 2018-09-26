/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetDesiredIngredients
// ====================================================

export interface GetDesiredIngredients_desiredIngredients_ingredientRanges_minimum {
  __typename: "RangeIngredientQuantity";
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface GetDesiredIngredients_desiredIngredients_ingredientRanges_maximum {
  __typename: "RangeIngredientQuantity";
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface GetDesiredIngredients_desiredIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
  minimum: GetDesiredIngredients_desiredIngredients_ingredientRanges_minimum | null;
  maximum: GetDesiredIngredients_desiredIngredients_ingredientRanges_maximum | null;
  frequency: FREQUENCY;
}

export interface GetDesiredIngredients_desiredIngredients {
  __typename: "DesiredIngredients";
  ingredientRanges: GetDesiredIngredients_desiredIngredients_ingredientRanges[];
}

export interface GetDesiredIngredients {
  desiredIngredients: GetDesiredIngredients_desiredIngredients;
}
