/* tslint:disable */
// This file was automatically generated and should not be edited.

import { RegimenProductQuantityInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SetCurrentRegimenProductQuantity
// ====================================================

export interface SetCurrentRegimenProductQuantity_SetCurrentRegimenProductQuantity_products {
  __typename: "RegimenProduct";
  catalogProductId: string;
}

export interface SetCurrentRegimenProductQuantity_SetCurrentRegimenProductQuantity {
  __typename: "Regimen";
  products: SetCurrentRegimenProductQuantity_SetCurrentRegimenProductQuantity_products[];
}

export interface SetCurrentRegimenProductQuantity {
  SetCurrentRegimenProductQuantity: SetCurrentRegimenProductQuantity_SetCurrentRegimenProductQuantity;
}

export interface SetCurrentRegimenProductQuantityVariables {
  catalogProductId: string;
  regimenProductQuantity: RegimenProductQuantityInput;
}
