/* tslint:disable */
// This file was automatically generated and should not be edited.

import { SERVING_SIZE_UNITS, INGREDIENT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCatalogProducts
// ====================================================

export interface GetCatalogProducts_allCatalogProducts_listings_price {
  __typename: "Price";
  amount: number;
}

export interface GetCatalogProducts_allCatalogProducts_listings {
  __typename: "Listing";
  price: GetCatalogProducts_allCatalogProducts_listings_price;
  numServings: number;
}

export interface GetCatalogProducts_allCatalogProducts_images {
  __typename: "Image";
  url: string;
}

export interface GetCatalogProducts_allCatalogProducts_serving_ingredients_quantity {
  __typename: "ServingIngredientQuantity";
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface GetCatalogProducts_allCatalogProducts_serving_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetCatalogProducts_allCatalogProducts_serving_ingredients {
  __typename: "ServingIngredient";
  quantity: GetCatalogProducts_allCatalogProducts_serving_ingredients_quantity;
  ingredientType: GetCatalogProducts_allCatalogProducts_serving_ingredients_ingredientType;
}

export interface GetCatalogProducts_allCatalogProducts_serving {
  __typename: "Serving";
  size: number;
  units: SERVING_SIZE_UNITS;
  ingredients: GetCatalogProducts_allCatalogProducts_serving_ingredients[] | null;
}

export interface GetCatalogProducts_allCatalogProducts {
  __typename: "CatalogProduct";
  id: string;
  listings: GetCatalogProducts_allCatalogProducts_listings[] | null;
  images: GetCatalogProducts_allCatalogProducts_images[] | null;
  serving: GetCatalogProducts_allCatalogProducts_serving;
}

export interface GetCatalogProducts {
  allCatalogProducts: GetCatalogProducts_allCatalogProducts[];
}
