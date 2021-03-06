/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY, PRODUCT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: PrefetchClientCatalogProducts
// ====================================================

export interface PrefetchClientCatalogProducts_allClientCatalogProducts_cost {
  __typename: "CatalogProductCost";
  money: number;
  frequency: FREQUENCY;
}

export interface PrefetchClientCatalogProducts_allClientCatalogProducts_defaultQuantity {
  __typename: "CatalogProductQuantity";
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
  frequency: FREQUENCY;
  remainingUnfilledIngredientCount: number | null;
}

export interface PrefetchClientCatalogProducts_allClientCatalogProducts {
  __typename: "ClientCatalogProduct";
  catalogProductId: string;
  cost: PrefetchClientCatalogProducts_allClientCatalogProducts_cost;
  costEffectivenessRating: number | null;
  defaultQuantity: PrefetchClientCatalogProducts_allClientCatalogProducts_defaultQuantity;
  matchScore: number;
}

export interface PrefetchClientCatalogProducts_searchQuery {
  __typename: "SearchQuery";
  value: string;
}

export interface PrefetchClientCatalogProducts_goalIngredients {
  __typename: "GoalIngredients";
  unfilledIngredientCount: number | null;
}

export interface PrefetchClientCatalogProducts {
  allClientCatalogProducts: PrefetchClientCatalogProducts_allClientCatalogProducts[];
  searchQuery: PrefetchClientCatalogProducts_searchQuery;
  goalIngredients: PrefetchClientCatalogProducts_goalIngredients;
}
