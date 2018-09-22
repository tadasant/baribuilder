/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetDesiredIngredientRanges
// ====================================================

export interface GetDesiredIngredientRanges_desiredIngredientRanges_ingredientRanges_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetDesiredIngredientRanges_desiredIngredientRanges_ingredientRanges_minimumDosage {
  __typename: "Dosage";
  number: number;
  units: INGREDIENT_UNITS;
}

export interface GetDesiredIngredientRanges_desiredIngredientRanges_ingredientRanges_maximumDosage {
  __typename: "Dosage";
  number: number;
  units: INGREDIENT_UNITS;
}

export interface GetDesiredIngredientRanges_desiredIngredientRanges_ingredientRanges {
  __typename: "IngredientRange";
  ingredientType: GetDesiredIngredientRanges_desiredIngredientRanges_ingredientRanges_ingredientType;
  minimumDosage: GetDesiredIngredientRanges_desiredIngredientRanges_ingredientRanges_minimumDosage | null;
  maximumDosage: GetDesiredIngredientRanges_desiredIngredientRanges_ingredientRanges_maximumDosage | null;
  frequency: FREQUENCY;
}

export interface GetDesiredIngredientRanges_desiredIngredientRanges {
  __typename: "DesiredIngredientRanges";
  ingredientRanges: GetDesiredIngredientRanges_desiredIngredientRanges_ingredientRanges[];
}

export interface GetDesiredIngredientRanges {
  desiredIngredientRanges: GetDesiredIngredientRanges_desiredIngredientRanges | null;
}
