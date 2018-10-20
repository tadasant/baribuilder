/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BRAND } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCatalogProduct
// ====================================================

export interface GetCatalogProduct_CatalogProduct_packages_listings {
  __typename: "PackageListing";
  url: string;
}

export interface GetCatalogProduct_CatalogProduct_packages {
  __typename: "ProductPackage";
  listings: GetCatalogProduct_CatalogProduct_packages_listings[] | null;
}

export interface GetCatalogProduct_CatalogProduct {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  brand: BRAND;
  packages: GetCatalogProduct_CatalogProduct_packages[] | null;
}

export interface GetCatalogProduct {
  CatalogProduct: GetCatalogProduct_CatalogProduct | null;
}

export interface GetCatalogProductVariables {
  id?: string | null;
}
