/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BRAND } from "./globalTypes";

// ====================================================
// GraphQL query operation: CatalogProducts
// ====================================================

export interface CatalogProducts_allCatalogProducts {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  brand: BRAND;
}

export interface CatalogProducts {
  allCatalogProducts: CatalogProducts_allCatalogProducts[];
}
