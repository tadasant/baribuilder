/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductsForProductSelection
// ====================================================

export interface GetProductsForProductSelection_allProducts_listings_price {
  __typename: "Price";
  amount: number;
}

export interface GetProductsForProductSelection_allProducts_listings {
  __typename: "Listing";
  price: GetProductsForProductSelection_allProducts_listings_price;
  numServings: number;
}

export interface GetProductsForProductSelection_allProducts_nutritionFacts_serving {
  __typename: "Serving";
  count: number;
}

export interface GetProductsForProductSelection_allProducts_nutritionFacts_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetProductsForProductSelection_allProducts_nutritionFacts_ingredients {
  __typename: "Ingredient";
  amount: number;
  units: INGREDIENT_UNITS;
  ingredientType: GetProductsForProductSelection_allProducts_nutritionFacts_ingredients_ingredientType;
}

export interface GetProductsForProductSelection_allProducts_nutritionFacts {
  __typename: "NutritionFacts";
  serving: GetProductsForProductSelection_allProducts_nutritionFacts_serving;
  ingredients: GetProductsForProductSelection_allProducts_nutritionFacts_ingredients[] | null;
}

export interface GetProductsForProductSelection_allProducts {
  __typename: "Product";
  id: string;
  listings: GetProductsForProductSelection_allProducts_listings[] | null;
  nutritionFacts: GetProductsForProductSelection_allProducts_nutritionFacts;
}

export interface GetProductsForProductSelection {
  allProducts: GetProductsForProductSelection_allProducts[];
}
