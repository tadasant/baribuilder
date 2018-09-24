/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY, PRODUCT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCurrentRegimenProducts
// ====================================================

export interface GetCurrentRegimenProducts_currentRegimen_products_quantity {
  __typename: "ProductQuantity";
  number: number;
  frequency: FREQUENCY;
  units: PRODUCT_QUANTITY_UNITS;
}

export interface GetCurrentRegimenProducts_currentRegimen_products_cost {
  __typename: "Cost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetCurrentRegimenProducts_currentRegimen_products {
  __typename: "RegimenProduct";
  catalogProductId: string;
  quantity: GetCurrentRegimenProducts_currentRegimen_products_quantity;
  cost: GetCurrentRegimenProducts_currentRegimen_products_cost;
}

export interface GetCurrentRegimenProducts_currentRegimen {
  __typename: "Regimen";
  products: GetCurrentRegimenProducts_currentRegimen_products[];
}

export interface GetCurrentRegimenProducts {
  currentRegimen: GetCurrentRegimenProducts_currentRegimen | null;
}
