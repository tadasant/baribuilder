/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClientCatalogProductPrices
// ====================================================

export interface GetClientCatalogProductPrices_ClientCatalogProduct_cost {
  __typename: "CatalogProductCost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetClientCatalogProductPrices_ClientCatalogProduct {
  __typename: "ClientCatalogProduct";
  catalogProductId: string;
  cost: GetClientCatalogProductPrices_ClientCatalogProduct_cost;
  costEffectivenessRating: number | null;
}

export interface GetClientCatalogProductPrices_goalIngredients {
  __typename: "GoalIngredients";
  unfilledIngredientCount: number | null;
}

export interface GetClientCatalogProductPrices {
  ClientCatalogProduct: GetClientCatalogProductPrices_ClientCatalogProduct | null;
  goalIngredients: GetClientCatalogProductPrices_goalIngredients;
}

export interface GetClientCatalogProductPricesVariables {
  catalogProductId: string;
}
