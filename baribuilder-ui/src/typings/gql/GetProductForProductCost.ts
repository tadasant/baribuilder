/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductForProductCost
// ====================================================

export interface GetProductForProductCost_Product_listings_price {
  __typename: "Price";
  amount: number;
}

export interface GetProductForProductCost_Product_listings {
  __typename: "Listing";
  price: GetProductForProductCost_Product_listings_price;
  numServings: number;
}

export interface GetProductForProductCost_Product_defaultUnitQuantity {
  __typename: "Quantity";
  amount: number;
  frequency: FREQUENCY;
}

export interface GetProductForProductCost_Product {
  __typename: "Product";
  listings: GetProductForProductCost_Product_listings[] | null;
  defaultUnitQuantity: GetProductForProductCost_Product_defaultUnitQuantity;
}

export interface GetProductForProductCost {
  Product: GetProductForProductCost_Product | null;
}
