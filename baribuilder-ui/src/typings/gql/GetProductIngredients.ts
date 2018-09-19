/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductIngredients
// ====================================================

export interface GetProductIngredients_Product_nutritionFacts_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetProductIngredients_Product_nutritionFacts_ingredients {
  __typename: "Ingredient";
  amount: number;
  units: INGREDIENT_UNITS;
  ingredientType: GetProductIngredients_Product_nutritionFacts_ingredients_ingredientType;
}

export interface GetProductIngredients_Product_nutritionFacts {
  __typename: "NutritionFacts";
  ingredients: GetProductIngredients_Product_nutritionFacts_ingredients[] | null;
}

export interface GetProductIngredients_Product {
  __typename: "Product";
  nutritionFacts: GetProductIngredients_Product_nutritionFacts;
}

export interface GetProductIngredients {
  Product: GetProductIngredients_Product | null;
}
