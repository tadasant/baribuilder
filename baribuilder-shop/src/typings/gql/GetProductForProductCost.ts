/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductForProductCost
// ====================================================

export interface GetProductForProductCost_CatalogProduct_packages_listings_price {
  __typename: "Price";
  amount: number;
}

export interface GetProductForProductCost_CatalogProduct_packages_listings {
  __typename: "PackageListing";
  price: GetProductForProductCost_CatalogProduct_packages_listings_price;
}

export interface GetProductForProductCost_CatalogProduct_packages {
  __typename: "ProductPackage";
  id: string;
  listings: GetProductForProductCost_CatalogProduct_packages_listings[] | null;
  numServings: number;
}

export interface GetProductForProductCost_CatalogProduct {
  __typename: "CatalogProduct";
  id: string;
  packages: GetProductForProductCost_CatalogProduct_packages[] | null;
}

export interface GetProductForProductCost {
  CatalogProduct: GetProductForProductCost_CatalogProduct | null;
}
