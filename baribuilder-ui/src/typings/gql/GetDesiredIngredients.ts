/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetDesiredIngredients
// ====================================================

export interface GetDesiredIngredients_desiredIngredients_ingredientRanges_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetDesiredIngredients_desiredIngredients_ingredientRanges_minimumDosage {
  __typename: "Dosage";
  number: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface GetDesiredIngredients_desiredIngredients_ingredientRanges_maximumDosage {
  __typename: "Dosage";
  number: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface GetDesiredIngredients_desiredIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientType: GetDesiredIngredients_desiredIngredients_ingredientRanges_ingredientType;
  minimumDosage: GetDesiredIngredients_desiredIngredients_ingredientRanges_minimumDosage | null;
  maximumDosage: GetDesiredIngredients_desiredIngredients_ingredientRanges_maximumDosage | null;
  frequency: FREQUENCY;
}

export interface GetDesiredIngredients_desiredIngredients {
  __typename: "DesiredIngredients";
  ingredientRanges: GetDesiredIngredients_desiredIngredients_ingredientRanges[];
}

export interface GetDesiredIngredients {
  desiredIngredients: GetDesiredIngredients_desiredIngredients | null;
}
