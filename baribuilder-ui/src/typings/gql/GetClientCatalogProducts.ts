/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY, PRODUCT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClientCatalogProducts
// ====================================================

export interface GetClientCatalogProducts_allClientCatalogProducts_cost {
  __typename: "CatalogProductCost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetClientCatalogProducts_allClientCatalogProducts_projectedRegimenCost {
  __typename: "RegimenCost";
  numRemainingProducts: number;
  money: number;
  frequency: FREQUENCY;
}

export interface GetClientCatalogProducts_allClientCatalogProducts_defaultQuantity {
  __typename: "CatalogProductQuantity";
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface GetClientCatalogProducts_allClientCatalogProducts {
  __typename: "ClientCatalogProduct";
  catalogProductId: string;
  cost: GetClientCatalogProducts_allClientCatalogProducts_cost;
  projectedRegimenCost: GetClientCatalogProducts_allClientCatalogProducts_projectedRegimenCost | null;
  defaultQuantity: GetClientCatalogProducts_allClientCatalogProducts_defaultQuantity;
  matchScore: number;
}

export interface GetClientCatalogProducts {
  allClientCatalogProducts: GetClientCatalogProducts_allClientCatalogProducts[];
}
