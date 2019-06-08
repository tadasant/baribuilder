/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BRAND } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCatalogProduct
// ====================================================

export interface GetCatalogProduct_CatalogProduct {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  brand: BRAND;
}

export interface GetCatalogProduct {
  CatalogProduct: GetCatalogProduct_CatalogProduct | null;
}

export interface GetCatalogProductVariables {
  id?: string | null;
}
