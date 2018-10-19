/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductForProductCost
// ====================================================

export interface GetProductForProductCost_CatalogProduct_listings_price {
  __typename: "Price";
  amount: number;
}

export interface GetProductForProductCost_CatalogProduct_listings {
  __typename: "PackageListing";
  price: GetProductForProductCost_CatalogProduct_listings_price;
  numServings: number;
}

export interface GetProductForProductCost_CatalogProduct {
  __typename: "CatalogProduct";
  id: string;
  listings: GetProductForProductCost_CatalogProduct_listings[] | null;
}

export interface GetProductForProductCost {
  CatalogProduct: GetProductForProductCost_CatalogProduct | null;
}
