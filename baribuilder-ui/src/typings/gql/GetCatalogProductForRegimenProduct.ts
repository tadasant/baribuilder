/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BRAND } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCatalogProductForRegimenProduct
// ====================================================

export interface GetCatalogProductForRegimenProduct_CatalogProduct_listings {
  __typename: "PackageListing";
  url: string;
}

export interface GetCatalogProductForRegimenProduct_CatalogProduct {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  brand: BRAND;
  listings: GetCatalogProductForRegimenProduct_CatalogProduct_listings[] | null;
}

export interface GetCatalogProductForRegimenProduct {
  CatalogProduct: GetCatalogProductForRegimenProduct_CatalogProduct | null;
}

export interface GetCatalogProductForRegimenProductVariables {
  id?: string | null;
}
