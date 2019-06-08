/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ClearCurrentRegimen
// ====================================================

export interface ClearCurrentRegimen_ClearCurrentRegimen_products {
  __typename: "RegimenProduct";
  catalogProductId: string;
}

export interface ClearCurrentRegimen_ClearCurrentRegimen {
  __typename: "Regimen";
  products: ClearCurrentRegimen_ClearCurrentRegimen_products[];
}

export interface ClearCurrentRegimen {
  ClearCurrentRegimen: ClearCurrentRegimen_ClearCurrentRegimen;
}
