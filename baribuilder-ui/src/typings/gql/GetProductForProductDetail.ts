/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductForProductDetail
// ====================================================

export interface GetProductForProductDetail_Product_listings_price {
  __typename: "Price";
  amount: number;
}

export interface GetProductForProductDetail_Product_listings {
  __typename: "Listing";
  price: GetProductForProductDetail_Product_listings_price;
  numServings: number;
}

export interface GetProductForProductDetail_Product_nutritionFacts_serving {
  __typename: "Serving";
  count: number;
}

export interface GetProductForProductDetail_Product_nutritionFacts_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetProductForProductDetail_Product_nutritionFacts_ingredients {
  __typename: "Ingredient";
  amount: number;
  units: INGREDIENT_UNITS;
  ingredientType: GetProductForProductDetail_Product_nutritionFacts_ingredients_ingredientType;
}

export interface GetProductForProductDetail_Product_nutritionFacts {
  __typename: "NutritionFacts";
  serving: GetProductForProductDetail_Product_nutritionFacts_serving;
  ingredients: GetProductForProductDetail_Product_nutritionFacts_ingredients[] | null;
}

export interface GetProductForProductDetail_Product {
  __typename: "Product";
  id: string;
  listings: GetProductForProductDetail_Product_listings[] | null;
  nutritionFacts: GetProductForProductDetail_Product_nutritionFacts;
}

export interface GetProductForProductDetail {
  Product: GetProductForProductDetail_Product | null;
}

export interface GetProductForProductDetailVariables {
  id?: string | null;
}
