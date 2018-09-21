/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetDesiredDosages
// ====================================================

export interface GetDesiredDosages_desiredDosages_ingredientRanges_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetDesiredDosages_desiredDosages_ingredientRanges_minimum {
  __typename: "Dosage";
  number: number;
  units: INGREDIENT_UNITS;
  frequency: FREQUENCY;
}

export interface GetDesiredDosages_desiredDosages_ingredientRanges_maximum {
  __typename: "Dosage";
  number: number;
  units: INGREDIENT_UNITS;
  frequency: FREQUENCY;
}

export interface GetDesiredDosages_desiredDosages_ingredientRanges {
  __typename: "IngredientRange";
  ingredientType: GetDesiredDosages_desiredDosages_ingredientRanges_ingredientType;
  minimum: GetDesiredDosages_desiredDosages_ingredientRanges_minimum | null;
  maximum: GetDesiredDosages_desiredDosages_ingredientRanges_maximum | null;
}

export interface GetDesiredDosages_desiredDosages {
  __typename: "DesiredDosages";
  ingredientRanges: GetDesiredDosages_desiredDosages_ingredientRanges[];
}

export interface GetDesiredDosages {
  desiredDosages: GetDesiredDosages_desiredDosages | null;
}
