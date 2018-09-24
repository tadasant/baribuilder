/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCatalogProductPrices
// ====================================================

export interface GetCatalogProductPrices_CatalogProduct_cost {
  __typename: "Cost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetCatalogProductPrices_CatalogProduct_projectedRegimenCost_cost {
  __typename: "Cost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetCatalogProductPrices_CatalogProduct_projectedRegimenCost {
  __typename: "RegimenCost";
  numRemainingProducts: number;
  cost: GetCatalogProductPrices_CatalogProduct_projectedRegimenCost_cost;
}

export interface GetCatalogProductPrices_CatalogProduct {
  __typename: "CatalogProduct";
  cost: GetCatalogProductPrices_CatalogProduct_cost;
  projectedRegimenCost: GetCatalogProductPrices_CatalogProduct_projectedRegimenCost | null;
}

export interface GetCatalogProductPrices {
  CatalogProduct: GetCatalogProductPrices_CatalogProduct | null;
}

export interface GetCatalogProductPricesVariables {
  id?: string | null;
}
