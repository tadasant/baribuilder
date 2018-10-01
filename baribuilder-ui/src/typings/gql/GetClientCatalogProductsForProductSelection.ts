/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CATEGORY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClientCatalogProductsForProductSelection
// ====================================================

export interface GetClientCatalogProductsForProductSelection_allClientCatalogProducts {
  __typename: "ClientCatalogProduct";
  catalogProductId: string;
}

export interface GetClientCatalogProductsForProductSelection {
  allClientCatalogProducts: GetClientCatalogProductsForProductSelection_allClientCatalogProducts[];
}

export interface GetClientCatalogProductsForProductSelectionVariables {
  category?: CATEGORY | null;
}
