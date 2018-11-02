/* tslint:disable */
// This file was automatically generated and should not be edited.

import { RETAILER } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetSelectedProductListings
// ====================================================

export interface GetSelectedProductListings_allCatalogProducts_packages_listings {
  __typename: "PackageListing";
  retailerName: RETAILER;
  url: string;
}

export interface GetSelectedProductListings_allCatalogProducts_packages {
  __typename: "ProductPackage";
  listings: GetSelectedProductListings_allCatalogProducts_packages_listings[] | null;
}

export interface GetSelectedProductListings_allCatalogProducts {
  __typename: "CatalogProduct";
  id: string;
  packages: GetSelectedProductListings_allCatalogProducts_packages[] | null;
}

export interface GetSelectedProductListings_currentRegimen_products {
  __typename: "RegimenProduct";
  catalogProductId: string;
}

export interface GetSelectedProductListings_currentRegimen {
  __typename: "Regimen";
  products: GetSelectedProductListings_currentRegimen_products[];
}

export interface GetSelectedProductListings {
  allCatalogProducts: GetSelectedProductListings_allCatalogProducts[];
  currentRegimen: GetSelectedProductListings_currentRegimen;
}
