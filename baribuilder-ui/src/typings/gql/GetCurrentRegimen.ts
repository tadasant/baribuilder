/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY, QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCurrentRegimen
// ====================================================

export interface GetCurrentRegimen_currentRegimen_products_quantity {
  __typename: "Quantity";
  number: number;
  frequency: FREQUENCY;
  units: QUANTITY_UNITS;
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
