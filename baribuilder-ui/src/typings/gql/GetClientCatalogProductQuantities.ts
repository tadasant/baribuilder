/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FREQUENCY, PRODUCT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClientCatalogProductQuantities
// ====================================================

export interface GetClientCatalogProductQuantities_ClientCatalogProduct_defaultQuantity {
  __typename: "CatalogProductQuantity";
  amount: number;
  frequency: FREQUENCY;
  units: PRODUCT_QUANTITY_UNITS;
}

export interface GetClientCatalogProductQuantities_ClientCatalogProduct_projectedRegimenCost {
  __typename: "RegimenCost";
  numRemainingProducts: number;
}

export interface GetClientCatalogProductQuantities_ClientCatalogProduct {
  __typename: "ClientCatalogProduct";
  catalogProductId: string;
  defaultQuantity: GetClientCatalogProductQuantities_ClientCatalogProduct_defaultQuantity;
  projectedRegimenCost: GetClientCatalogProductQuantities_ClientCatalogProduct_projectedRegimenCost | null;
}

export interface GetClientCatalogProductQuantities_goalIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
}

export interface GetClientCatalogProductQuantities_goalIngredients {
  __typename: "GoalIngredients";
  ingredientRanges: GetClientCatalogProductQuantities_goalIngredients_ingredientRanges[];
}

export interface GetClientCatalogProductQuantities {
  ClientCatalogProduct: GetClientCatalogProductQuantities_ClientCatalogProduct | null;
  goalIngredients: GetClientCatalogProductQuantities_goalIngredients;
}

export interface GetClientCatalogProductQuantitiesVariables {
  catalogProductId: string;
}
