/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSharedUrl
// ====================================================

export interface GetSharedUrl_allUrls {
  __typename: "Url";
  pathname: string;
}

export interface GetSharedUrl {
  allUrls: GetSharedUrl_allUrls[];
}

export interface GetSharedUrlVariables {
  id: string;
}
