/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBuilderHeaderData
// ====================================================

export interface GetBuilderHeaderData_goalIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
}

export interface GetBuilderHeaderData_goalIngredients {
  __typename: "GoalIngredients";
  ingredientRanges: GetBuilderHeaderData_goalIngredients_ingredientRanges[];
}

export interface GetBuilderHeaderData {
  goalIngredients: GetBuilderHeaderData_goalIngredients;
}
