/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CATEGORY, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClientCatalogProductsForProductSelection
// ====================================================

export interface GetClientCatalogProductsForProductSelection_allClientCatalogProducts_cost {
  __typename: "CatalogProductCost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetClientCatalogProductsForProductSelection_allClientCatalogProducts_projectedRegimenCost {
  __typename: "RegimenCost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetClientCatalogProductsForProductSelection_allClientCatalogProducts {
  __typename: "ClientCatalogProduct";
  catalogProductId: string;
  cost: GetClientCatalogProductsForProductSelection_allClientCatalogProducts_cost;
  projectedRegimenCost: GetClientCatalogProductsForProductSelection_allClientCatalogProducts_projectedRegimenCost | null;
}

export interface GetClientCatalogProductsForProductSelection_searchQuery {
  __typename: "SearchQuery";
  value: string;
}

export interface GetClientCatalogProductsForProductSelection {
  allClientCatalogProducts: GetClientCatalogProductsForProductSelection_allClientCatalogProducts[];
  searchQuery: GetClientCatalogProductsForProductSelection_searchQuery;
}

export interface GetClientCatalogProductsForProductSelectionVariables {
  category?: CATEGORY | null;
}
