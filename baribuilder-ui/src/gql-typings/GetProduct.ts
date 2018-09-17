/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_Product {
  __typename: "Product";
  id: string;
}

export interface GetProduct {
  Product: GetProduct_Product | null;
}

export interface GetProductVariables {
  id?: string | null;
}
