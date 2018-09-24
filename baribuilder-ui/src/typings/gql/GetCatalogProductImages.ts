/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCatalogProductImages
// ====================================================

export interface GetCatalogProductImages_CatalogProduct_images {
  __typename: "Image";
  url: string;
}

export interface GetCatalogProductImages_CatalogProduct {
  __typename: "CatalogProduct";
  images: GetCatalogProductImages_CatalogProduct_images[] | null;
}

export interface GetCatalogProductImages {
  CatalogProduct: GetCatalogProductImages_CatalogProduct | null;
}

export interface GetCatalogProductImagesVariables {
  id?: string | null;
}
