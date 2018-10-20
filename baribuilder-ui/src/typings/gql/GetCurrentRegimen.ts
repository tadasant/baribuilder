/* tslint:disable */
// This file was automatically generated and should not be edited.

import { PRODUCT_QUANTITY_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCurrentRegimen
// ====================================================

export interface GetCurrentRegimen_currentRegimen_products_quantity {
  __typename: "RegimenProductQuantity";
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface GetCurrentRegimen_currentRegimen_products_cost {
  __typename: "RegimenProductCost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetCurrentRegimen_currentRegimen_products {
  __typename: "RegimenProduct";
  catalogProductId: string;
  quantity: GetCurrentRegimen_currentRegimen_products_quantity;
  cost: GetCurrentRegimen_currentRegimen_products_cost;
}

export interface GetCurrentRegimen_currentRegimen {
  __typename: "Regimen";
  products: GetCurrentRegimen_currentRegimen_products[];
}

export interface GetCurrentRegimen {
  currentRegimen: GetCurrentRegimen_currentRegimen;
}
