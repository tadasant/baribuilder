/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductsForProductSelection
// ====================================================

export interface GetProductsForProductSelection_allCatalogProducts_listings_price {
  __typename: "Price";
  amount: number;
}

export interface GetProductsForProductSelection_allCatalogProducts_listings {
  __typename: "Listing";
  price: GetProductsForProductSelection_allCatalogProducts_listings_price;
  numServings: number;
}

export interface GetProductsForProductSelection_allCatalogProducts_serving_ingredients_quantity {
  __typename: "IngredientQuantity";
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface GetProductsForProductSelection_allCatalogProducts_serving_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetProductsForProductSelection_allCatalogProducts_serving_ingredients {
  __typename: "Ingredient";
  quantity: GetProductsForProductSelection_allCatalogProducts_serving_ingredients_quantity;
  ingredientType: GetProductsForProductSelection_allCatalogProducts_serving_ingredients_ingredientType;
}

export interface GetProductsForProductSelection_allCatalogProducts_serving {
  __typename: "Serving";
  ingredients: GetProductsForProductSelection_allCatalogProducts_serving_ingredients[] | null;
}

export interface GetProductsForProductSelection_allCatalogProducts {
  __typename: "CatalogProduct";
  id: string;
  listings: GetProductsForProductSelection_allCatalogProducts_listings[] | null;
  serving: GetProductsForProductSelection_allCatalogProducts_serving;
}

export interface GetProductsForProductSelection {
  allCatalogProducts: GetProductsForProductSelection_allCatalogProducts[];
}
