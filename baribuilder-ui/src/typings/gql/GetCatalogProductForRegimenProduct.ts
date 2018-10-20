/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BRAND } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCatalogProductForRegimenProduct
// ====================================================

export interface GetCatalogProductForRegimenProduct_CatalogProduct_packages_listings_affiliateLink {
  __typename: "AffiliateLink";
  url: string;
}

export interface GetCatalogProductForRegimenProduct_CatalogProduct_packages_listings {
  __typename: "PackageListing";
  affiliateLink: GetCatalogProductForRegimenProduct_CatalogProduct_packages_listings_affiliateLink | null;
}

export interface GetCatalogProductForRegimenProduct_CatalogProduct_packages {
  __typename: "ProductPackage";
  listings: GetCatalogProductForRegimenProduct_CatalogProduct_packages_listings[] | null;
}

export interface GetCatalogProductForRegimenProduct_CatalogProduct {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  brand: BRAND;
  packages: GetCatalogProductForRegimenProduct_CatalogProduct_packages[] | null;
}

export interface GetCatalogProductForRegimenProduct {
  CatalogProduct: GetCatalogProductForRegimenProduct_CatalogProduct | null;
}

export interface GetCatalogProductForRegimenProductVariables {
  id?: string | null;
}
