/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY, PRODUCT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClientCatalogProductQuantities
// ====================================================

export interface GetClientCatalogProductQuantities_ClientCatalogProduct_quantity {
  __typename: "CatalogProductQuantity";
  amount: number;
  frequency: FREQUENCY;
  units: PRODUCT_QUANTITY_UNITS;
}

export interface GetClientCatalogProductQuantities_ClientCatalogProduct {
  __typename: "ClientCatalogProduct";
  catalogProductId: string;
  quantity: GetClientCatalogProductQuantities_ClientCatalogProduct_quantity;
}

export interface GetClientCatalogProductQuantities {
  ClientCatalogProduct: GetClientCatalogProductQuantities_ClientCatalogProduct | null;
}

export interface GetClientCatalogProductQuantitiesVariables {
  catalogProductId: string;
}
