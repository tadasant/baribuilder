/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCurrentRegimenProductQuantity
// ====================================================

export interface DeleteCurrentRegimenProductQuantity_DeleteCurrentRegimenProductQuantity_products {
  __typename: "RegimenProduct";
  catalogProductId: string;
}

export interface DeleteCurrentRegimenProductQuantity_DeleteCurrentRegimenProductQuantity {
  __typename: "Regimen";
  products: DeleteCurrentRegimenProductQuantity_DeleteCurrentRegimenProductQuantity_products[];
}

export interface DeleteCurrentRegimenProductQuantity {
  DeleteCurrentRegimenProductQuantity: DeleteCurrentRegimenProductQuantity_DeleteCurrentRegimenProductQuantity;
}

export interface DeleteCurrentRegimenProductQuantityVariables {
  catalogProductId: string;
}
