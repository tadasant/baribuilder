/* tslint:disable */
// This file was automatically generated and should not be edited.

import { SERVING_SIZE_UNITS, INGREDIENT_QUANTITY_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductForProductDetail
// ====================================================

export interface GetProductForProductDetail_CatalogProduct_listings_price {
  __typename: "Price";
  amount: number;
}

export interface GetProductForProductDetail_CatalogProduct_listings {
  __typename: "Listing";
  price: GetProductForProductDetail_CatalogProduct_listings_price;
  numServings: number;
}

export interface GetProductForProductDetail_CatalogProduct_serving_ingredients_quantity {
  __typename: "IngredientQuantity";
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface GetProductForProductDetail_CatalogProduct_serving_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetProductForProductDetail_CatalogProduct_serving_ingredients {
  __typename: "Ingredient";
  quantity: GetProductForProductDetail_CatalogProduct_serving_ingredients_quantity;
  ingredientType: GetProductForProductDetail_CatalogProduct_serving_ingredients_ingredientType;
}

export interface GetProductForProductDetail_CatalogProduct_serving {
  __typename: "Serving";
  size: number;
  units: SERVING_SIZE_UNITS;
  ingredients: GetProductForProductDetail_CatalogProduct_serving_ingredients[] | null;
}

export interface GetProductForProductDetail_CatalogProduct_cost {
  __typename: "Cost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetProductForProductDetail_CatalogProduct_quantity {
  __typename: "ProductQuantity";
  amount: number;
  frequency: FREQUENCY;
}

export interface GetProductForProductDetail_CatalogProduct_projectedRegimenCost_cost {
  __typename: "Cost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetProductForProductDetail_CatalogProduct_projectedRegimenCost {
  __typename: "RegimenCost";
  numRemainingProducts: number;
  cost: GetProductForProductDetail_CatalogProduct_projectedRegimenCost_cost;
}

export interface GetProductForProductDetail_CatalogProduct {
  __typename: "CatalogProduct";
  id: string;
  listings: GetProductForProductDetail_CatalogProduct_listings[] | null;
  serving: GetProductForProductDetail_CatalogProduct_serving;
  cost: GetProductForProductDetail_CatalogProduct_cost;
  quantity: GetProductForProductDetail_CatalogProduct_quantity;
  projectedRegimenCost: GetProductForProductDetail_CatalogProduct_projectedRegimenCost | null;
}

export interface GetProductForProductDetail {
  CatalogProduct: GetProductForProductDetail_CatalogProduct | null;
}

export interface GetProductForProductDetailVariables {
  id?: string | null;
}
