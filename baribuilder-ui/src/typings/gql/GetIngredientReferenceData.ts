/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetIngredientReferenceData
// ====================================================

export interface GetIngredientReferenceData_allIngredientTypes {
  __typename: "IngredientType";
  name: string;
  defaultUnits: INGREDIENT_QUANTITY_UNITS;
  synonyms: string[] | null;
}

export interface GetIngredientReferenceData_FREQUENCIES_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface GetIngredientReferenceData_FREQUENCIES {
  __typename: "__Type";
  enumValues: GetIngredientReferenceData_FREQUENCIES_enumValues[] | null;
}

export interface GetIngredientReferenceData_INGREDIENT_QUANTITY_UNITSES_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface GetIngredientReferenceData_INGREDIENT_QUANTITY_UNITSES {
  __typename: "__Type";
  enumValues: GetIngredientReferenceData_INGREDIENT_QUANTITY_UNITSES_enumValues[] | null;
}

export interface GetIngredientReferenceData {
  allIngredientTypes: GetIngredientReferenceData_allIngredientTypes[];
  FREQUENCIES: GetIngredientReferenceData_FREQUENCIES | null;
  INGREDIENT_QUANTITY_UNITSES: GetIngredientReferenceData_INGREDIENT_QUANTITY_UNITSES | null;
}
