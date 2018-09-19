/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductForLocal
// ====================================================

export interface GetProductForLocal_Product_listings_price {
  __typename: "Price";
  amount: number;
}

export interface GetProductForLocal_Product_listings {
  __typename: "Listing";
  price: GetProductForLocal_Product_listings_price;
}

export interface GetProductForLocal_Product_nutritionFacts_serving {
  __typename: "Serving";
  count: number;
}

export interface GetProductForLocal_Product_nutritionFacts_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetProductForLocal_Product_nutritionFacts_ingredients {
  __typename: "Ingredient";
  amount: number;
  units: INGREDIENT_UNITS;
  ingredientType: GetProductForLocal_Product_nutritionFacts_ingredients_ingredientType;
}

export interface GetProductForLocal_Product_nutritionFacts {
  __typename: "NutritionFacts";
  serving: GetProductForLocal_Product_nutritionFacts_serving;
  ingredients: GetProductForLocal_Product_nutritionFacts_ingredients[] | null;
}

export interface GetProductForLocal_Product {
  __typename: "Product";
  listings: GetProductForLocal_Product_listings[] | null;
  nutritionFacts: GetProductForLocal_Product_nutritionFacts;
}

export interface GetProductForLocal {
  Product: GetProductForLocal_Product | null;
}
