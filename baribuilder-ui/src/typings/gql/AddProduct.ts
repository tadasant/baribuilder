/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY, PRODUCT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddProduct
// ====================================================

export interface AddProduct_AddProductToCurrentRegimen_quantity {
  __typename: "RegimenProductQuantity";
  amount: number;
  frequency: FREQUENCY;
  units: PRODUCT_QUANTITY_UNITS;
}

export interface AddProduct_AddProductToCurrentRegimen {
  __typename: "RegimenProduct";
  catalogProductId: string;
  quantity: AddProduct_AddProductToCurrentRegimen_quantity;
}

export interface AddProduct {
  AddProductToCurrentRegimen: AddProduct_AddProductToCurrentRegimen;
}

export interface AddProductVariables {
  catalogProductId: string;
  amount: number;
  frequency: FREQUENCY;
  units: PRODUCT_QUANTITY_UNITS;
}
