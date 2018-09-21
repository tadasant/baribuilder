/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_Product_listings_price {
  __typename: "Price";
  amount: number;
}

export interface GetProduct_Product_listings {
  __typename: "Listing";
  price: GetProduct_Product_listings_price;
  numServings: number;
}

export interface GetProduct_Product_nutritionFacts_serving {
  __typename: "Serving";
  count: number;
}

export interface GetProduct_Product_nutritionFacts_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetProduct_Product_nutritionFacts_ingredients {
  __typename: "Ingredient";
  amount: number;
  units: INGREDIENT_UNITS;
  ingredientType: GetProduct_Product_nutritionFacts_ingredients_ingredientType;
}

export interface GetProduct_Product_nutritionFacts {
  __typename: "NutritionFacts";
  serving: GetProduct_Product_nutritionFacts_serving;
  ingredients: GetProduct_Product_nutritionFacts_ingredients[] | null;
}

export interface GetProduct_Product_cost_value {
  __typename: "Price";
  amount: number;
}

export interface GetProduct_Product_cost {
  __typename: "Cost";
  value: GetProduct_Product_cost_value;
  frequency: FREQUENCY;
}

export interface GetProduct_Product {
  __typename: "Product";
  id: string;
  listings: GetProduct_Product_listings[] | null;
  nutritionFacts: GetProduct_Product_nutritionFacts;
  cost: GetProduct_Product_cost;
}

export interface GetProduct {
  Product: GetProduct_Product | null;
}

export interface GetProductVariables {
  id?: string | null;
}
