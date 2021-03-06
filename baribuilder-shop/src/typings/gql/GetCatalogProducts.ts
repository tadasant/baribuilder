/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BRAND, CATEGORY, FORM, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCatalogProducts
// ====================================================

export interface GetCatalogProducts_allCatalogProducts {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  brand: BRAND;
  category: CATEGORY;
  form: FORM;
}

export interface GetCatalogProducts_searchQuery {
  __typename: "SearchQuery";
  value: string;
}

export interface GetCatalogProducts_allClientCatalogProducts_cost {
  __typename: "CatalogProductCost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetCatalogProducts_allClientCatalogProducts_defaultQuantity {
  __typename: "CatalogProductQuantity";
  remainingUnfilledIngredientCount: number | null;
}

export interface GetCatalogProducts_allClientCatalogProducts {
  __typename: "ClientCatalogProduct";
  catalogProductId: string;
  cost: GetCatalogProducts_allClientCatalogProducts_cost;
  costEffectivenessRating: number | null;
  defaultQuantity: GetCatalogProducts_allClientCatalogProducts_defaultQuantity;
}

export interface GetCatalogProducts_goalIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
}

export interface GetCatalogProducts_goalIngredients {
  __typename: "GoalIngredients";
  ingredientRanges: GetCatalogProducts_goalIngredients_ingredientRanges[];
}

export interface GetCatalogProducts {
  allCatalogProducts: GetCatalogProducts_allCatalogProducts[];
  searchQuery: GetCatalogProducts_searchQuery;
  allClientCatalogProducts: GetCatalogProducts_allClientCatalogProducts[];
  goalIngredients: GetCatalogProducts_goalIngredients;
}
