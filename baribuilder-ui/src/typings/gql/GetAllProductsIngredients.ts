/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAllProductsIngredients
// ====================================================

export interface GetAllProductsIngredients_allProducts_nutritionFacts_ingredients_ingredientQuantity {
  __typename: "IngredientQuantity";
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface GetAllProductsIngredients_allProducts_nutritionFacts_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetAllProductsIngredients_allProducts_nutritionFacts_ingredients {
  __typename: "Ingredient";
  ingredientQuantity: GetAllProductsIngredients_allProducts_nutritionFacts_ingredients_ingredientQuantity;
  ingredientType: GetAllProductsIngredients_allProducts_nutritionFacts_ingredients_ingredientType;
}

export interface GetAllProductsIngredients_allProducts_nutritionFacts {
  __typename: "NutritionFacts";
  ingredients: GetAllProductsIngredients_allProducts_nutritionFacts_ingredients[] | null;
}

export interface GetAllProductsIngredients_allProducts {
  __typename: "Product";
  id: string;
  nutritionFacts: GetAllProductsIngredients_allProducts_nutritionFacts;
}

export interface GetAllProductsIngredients {
  allProducts: GetAllProductsIngredients_allProducts[];
}
