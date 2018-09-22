/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY, PRODUCT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCurrentRegimen
// ====================================================

export interface GetCurrentRegimen_currentRegimen_products_quantity {
  __typename: "ProductQuantity";
  number: number;
  frequency: FREQUENCY;
  units: PRODUCT_QUANTITY_UNITS;
}

export interface GetCurrentRegimen_currentRegimen_products {
  __typename: "RegimenProduct";
  id: string;
  quantity: GetCurrentRegimen_currentRegimen_products_quantity;
}

export interface GetCurrentRegimen_currentRegimen {
  __typename: "Regimen";
  products: GetCurrentRegimen_currentRegimen_products[];
}

export interface GetCurrentRegimen {
  currentRegimen: GetCurrentRegimen_currentRegimen | null;
}
