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

export interface GetDesiredDosages_desiredDosages_ingredientRanges_minimumDosage {
  __typename: "Dosage";
  number: number;
  units: INGREDIENT_UNITS;
  frequency: FREQUENCY;
}

export interface GetDesiredDosages_desiredDosages_ingredientRanges_maximumDosage {
  __typename: "Dosage";
  number: number;
  units: INGREDIENT_UNITS;
  frequency: FREQUENCY;
}

export interface GetDesiredDosages_desiredDosages_ingredientRanges {
  __typename: "IngredientRange";
  ingredientType: GetDesiredDosages_desiredDosages_ingredientRanges_ingredientType;
  minimumDosage: GetDesiredDosages_desiredDosages_ingredientRanges_minimumDosage | null;
  maximumDosage: GetDesiredDosages_desiredDosages_ingredientRanges_maximumDosage | null;
}

export interface GetDesiredDosages_desiredDosages {
  __typename: "DesiredDosages";
  ingredientRanges: GetDesiredDosages_desiredDosages_ingredientRanges[];
}

export interface GetDesiredDosages {
  desiredDosages: GetDesiredDosages_desiredDosages | null;
}
