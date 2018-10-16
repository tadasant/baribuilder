/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BRAND, CATEGORY, SERVING_SIZE_UNITS, INGREDIENT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: PrefetchCatalogProducts
// ====================================================

export interface PrefetchCatalogProducts_allCatalogProducts_listings_price {
  __typename: "Price";
  amount: number;
}

export interface PrefetchCatalogProducts_allCatalogProducts_listings {
  __typename: "Listing";
  url: string;
  price: PrefetchCatalogProducts_allCatalogProducts_listings_price;
  numServings: number;
}

export interface PrefetchCatalogProducts_allCatalogProducts_images {
  __typename: "Image";
  url: string;
}

export interface PrefetchCatalogProducts_allCatalogProducts_serving_ingredients_quantity {
  __typename: "ServingIngredientQuantity";
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface PrefetchCatalogProducts_allCatalogProducts_serving_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface PrefetchCatalogProducts_allCatalogProducts_serving_ingredients {
  __typename: "ServingIngredient";
  quantity: PrefetchCatalogProducts_allCatalogProducts_serving_ingredients_quantity;
  ingredientType: PrefetchCatalogProducts_allCatalogProducts_serving_ingredients_ingredientType;
}

export interface PrefetchCatalogProducts_allCatalogProducts_serving {
  __typename: "Serving";
  size: number;
  units: SERVING_SIZE_UNITS;
  ingredients: PrefetchCatalogProducts_allCatalogProducts_serving_ingredients[] | null;
}

export interface PrefetchCatalogProducts_allCatalogProducts {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  brand: BRAND;
  category: CATEGORY;
  listings: PrefetchCatalogProducts_allCatalogProducts_listings[] | null;
  images: PrefetchCatalogProducts_allCatalogProducts_images[] | null;
  serving: PrefetchCatalogProducts_allCatalogProducts_serving;
}

export interface PrefetchCatalogProducts_allIngredientTypes {
  __typename: "IngredientType";
  name: string;
  defaultUnits: INGREDIENT_QUANTITY_UNITS;
  synonyms: string[] | null;
}

export interface PrefetchCatalogProducts {
  allCatalogProducts: PrefetchCatalogProducts_allCatalogProducts[];
  allIngredientTypes: PrefetchCatalogProducts_allIngredientTypes[];
}
