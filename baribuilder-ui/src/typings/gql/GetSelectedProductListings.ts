/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSelectedProductListings
// ====================================================

export interface GetSelectedProductListings_currentRegimen_products {
  __typename: "RegimenProduct";
  catalogProductId: string;
}

export interface GetSelectedProductListings_currentRegimen {
  __typename: "Regimen";
  products: GetSelectedProductListings_currentRegimen_products[];
}

export interface GetSelectedProductListings {
  currentRegimen: GetSelectedProductListings_currentRegimen;
}
