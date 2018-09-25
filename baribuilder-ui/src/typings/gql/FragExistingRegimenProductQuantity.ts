/* tslint:disable */
// This file was automatically generated and should not be edited.

import { PRODUCT_QUANTITY_UNITS, FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL fragment: FragExistingRegimenProductQuantity
// ====================================================

export interface FragExistingRegimenProductQuantity_quantity {
  __typename: "ProductQuantity";
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface FragExistingRegimenProductQuantity {
  __typename: "RegimenProduct";
  catalogProductId: string;
  quantity: FragExistingRegimenProductQuantity_quantity;
}
