/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY, PRODUCT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCatalogProductQuantities
// ====================================================

export interface GetCatalogProductQuantities_CatalogProduct_quantity {
  __typename: "ProductQuantity";
  amount: number;
  frequency: FREQUENCY;
  units: PRODUCT_QUANTITY_UNITS;
}

export interface GetCatalogProductQuantities_CatalogProduct {
  __typename: "CatalogProduct";
  id: string;
  quantity: GetCatalogProductQuantities_CatalogProduct_quantity;
}

export interface GetCatalogProductQuantities {
  CatalogProduct: GetCatalogProductQuantities_CatalogProduct | null;
}

export interface GetCatalogProductQuantitiesVariables {
  id?: string | null;
}