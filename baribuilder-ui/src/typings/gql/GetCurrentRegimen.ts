/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCurrentRegimen
// ====================================================

export interface GetCurrentRegimen_currentRegimen_products {
  __typename: "RegimenProduct";
  id: string;
  numServings: number;
  frequency: FREQUENCY;
}

export interface GetCurrentRegimen_currentRegimen {
  __typename: "Regimen";
  products: GetCurrentRegimen_currentRegimen_products[];
}

export interface GetCurrentRegimen {
  currentRegimen: GetCurrentRegimen_currentRegimen | null;
}
