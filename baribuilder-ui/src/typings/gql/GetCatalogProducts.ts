/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BRAND, CATEGORY, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCatalogProducts
// ====================================================

export interface GetCatalogProducts_allCatalogProducts {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  brand: BRAND;
  category: CATEGORY;
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

export interface GetCatalogProducts_allClientCatalogProducts_projectedRegimenCost {
  __typename: "RegimenCost";
  numRemainingProducts: number;
  money: number;
  frequency: FREQUENCY;
}

export interface GetCatalogProducts_allClientCatalogProducts {
  __typename: "ClientCatalogProduct";
  catalogProductId: string;
  cost: GetCatalogProducts_allClientCatalogProducts_cost;
  projectedRegimenCost: GetCatalogProducts_allClientCatalogProducts_projectedRegimenCost | null;
}

export interface GetCatalogProducts {
  allCatalogProducts: GetCatalogProducts_allCatalogProducts[];
  searchQuery: GetCatalogProducts_searchQuery;
  allClientCatalogProducts: GetCatalogProducts_allClientCatalogProducts[];
}
