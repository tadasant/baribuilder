/* tslint:disable */
// This file was automatically generated and should not be edited.

import { DesiredIngredientsInput, INGREDIENT_QUANTITY_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SetDesiredIngredients
// ====================================================

export interface SetDesiredIngredients_SetDesiredIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
  minimumAmount: number | null;
  maximumAmount: number | null;
  units: INGREDIENT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface SetDesiredIngredients_SetDesiredIngredients {
  __typename: "DesiredIngredients";
  ingredientRanges: SetDesiredIngredients_SetDesiredIngredients_ingredientRanges[];
}

export interface SetDesiredIngredients {
  SetDesiredIngredients: SetDesiredIngredients_SetDesiredIngredients;
}

export interface SetDesiredIngredientsVariables {
  desiredIngredients: DesiredIngredientsInput;
}
