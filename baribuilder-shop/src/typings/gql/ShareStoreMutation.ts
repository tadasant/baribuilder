/* tslint:disable */
// This file was automatically generated and should not be edited.

import { RegimenInput, GoalIngredientsInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ShareStoreMutation
// ====================================================

export interface ShareStoreMutation_SetGoalIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
}

export interface ShareStoreMutation_SetGoalIngredients {
  __typename: "GoalIngredients";
  ingredientRanges: ShareStoreMutation_SetGoalIngredients_ingredientRanges[];
}

export interface ShareStoreMutation_SetCurrentRegimen_products {
  __typename: "RegimenProduct";
  catalogProductId: string;
}

export interface ShareStoreMutation_SetCurrentRegimen {
  __typename: "Regimen";
  products: ShareStoreMutation_SetCurrentRegimen_products[];
}

export interface ShareStoreMutation {
  SetGoalIngredients: ShareStoreMutation_SetGoalIngredients;
  SetCurrentRegimen: ShareStoreMutation_SetCurrentRegimen;
}

export interface ShareStoreMutationVariables {
  currentRegimen: RegimenInput;
  goalIngredients: GoalIngredientsInput;
}
