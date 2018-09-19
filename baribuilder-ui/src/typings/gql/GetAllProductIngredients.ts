/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_UNITS, SERVING_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAllProductIngredients
// ====================================================

export interface GetAllProductIngredients_allProducts_nutritionFacts_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetAllProductIngredients_allProducts_nutritionFacts_ingredients {
  __typename: "Ingredient";
  amount: number;
  ingredientType: GetAllProductIngredients_allProducts_nutritionFacts_ingredients_ingredientType;
  units: INGREDIENT_UNITS;
}

export interface GetAllProductIngredients_allProducts_nutritionFacts_serving {
  __typename: "Serving";
  count: number;
  units: SERVING_UNITS;
}

export interface GetAllProductIngredients_allProducts_nutritionFacts {
  __typename: "NutritionFacts";
  ingredients: GetAllProductIngredients_allProducts_nutritionFacts_ingredients[] | null;
  serving: GetAllProductIngredients_allProducts_nutritionFacts_serving;
}

export interface GetAllProductIngredients_allProducts {
  __typename: "Product";
  nutritionFacts: GetAllProductIngredients_allProducts_nutritionFacts;
}

export interface GetAllProductIngredients {
  allProducts: GetAllProductIngredients_allProducts[];
}
