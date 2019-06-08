/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUrlHash
// ====================================================

export interface CreateUrlHash_createUrl {
  __typename: "Url";
  id: string;
}

export interface CreateUrlHash {
  createUrl: CreateUrlHash_createUrl | null;
}

export interface CreateUrlHashVariables {
  pathname: string;
}
