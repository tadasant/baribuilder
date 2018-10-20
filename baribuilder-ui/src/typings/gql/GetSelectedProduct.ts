/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BRAND, FREQUENCY, PRODUCT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetSelectedProduct
// ====================================================

export interface GetSelectedProduct_CatalogProduct_packages_listings {
  __typename: "PackageListing";
  url: string;
}

export interface GetSelectedProduct_CatalogProduct_packages {
  __typename: "ProductPackage";
  listings: GetSelectedProduct_CatalogProduct_packages_listings[] | null;
}

export interface GetSelectedProduct_CatalogProduct {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  brand: BRAND;
  packages: GetSelectedProduct_CatalogProduct_packages[] | null;
}

export interface GetSelectedProduct_currentRegimen_products_quantity {
  __typename: "RegimenProductQuantity";
  amount: number;
  frequency: FREQUENCY;
  units: PRODUCT_QUANTITY_UNITS;
}

export interface GetSelectedProduct_currentRegimen_products {
  __typename: "RegimenProduct";
  catalogProductId: string;
  quantity: GetSelectedProduct_currentRegimen_products_quantity;
}

export interface GetSelectedProduct_currentRegimen {
  __typename: "Regimen";
  products: GetSelectedProduct_currentRegimen_products[];
}

export interface GetSelectedProduct {
  CatalogProduct: GetSelectedProduct_CatalogProduct | null;
  currentRegimen: GetSelectedProduct_currentRegimen;
}

export interface GetSelectedProductVariables {
  catalogProductId?: string | null;
}
