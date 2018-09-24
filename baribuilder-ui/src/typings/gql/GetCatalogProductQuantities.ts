/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCatalogProductQuantities
// ====================================================

export interface GetCatalogProductQuantities_CatalogProduct_quantity {
  __typename: "ProductQuantity";
  amount: number;
  frequency: FREQUENCY;
}

export interface GetCatalogProductQuantities_CatalogProduct {
  __typename: "CatalogProduct";
  quantity: GetCatalogProductQuantities_CatalogProduct_quantity;
}

export interface GetCatalogProductQuantities {
  CatalogProduct: GetCatalogProductQuantities_CatalogProduct | null;
}

export interface GetCatalogProductQuantitiesVariables {
  id?: string | null;
}
