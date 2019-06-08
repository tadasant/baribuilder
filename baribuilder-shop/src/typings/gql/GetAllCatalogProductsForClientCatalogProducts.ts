/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CATEGORY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAllCatalogProductsForClientCatalogProducts
// ====================================================

export interface GetAllCatalogProductsForClientCatalogProducts_allCatalogProducts {
  __typename: "CatalogProduct";
  id: string;
  category: CATEGORY;
}

export interface GetAllCatalogProductsForClientCatalogProducts {
  allCatalogProducts: GetAllCatalogProductsForClientCatalogProducts_allCatalogProducts[];
}
