/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS, FREQUENCY, PRODUCT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetStoreToShare
// ====================================================

export interface GetStoreToShare_goalIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
  minimumAmount: number | null;
  maximumAmount: number | null;
  units: INGREDIENT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface GetStoreToShare_goalIngredients {
  __typename: "GoalIngredients";
  ingredientRanges: GetStoreToShare_goalIngredients_ingredientRanges[];
}

export interface GetStoreToShare_currentRegimen_products_quantity {
  __typename: "RegimenProductQuantity";
  amount: number;
  frequency: FREQUENCY;
  units: PRODUCT_QUANTITY_UNITS;
}

export interface GetStoreToShare_currentRegimen_products_cost {
  __typename: "RegimenProductCost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetStoreToShare_currentRegimen_products {
  __typename: "RegimenProduct";
  catalogProductId: string;
  quantity: GetStoreToShare_currentRegimen_products_quantity;
  cost: GetStoreToShare_currentRegimen_products_cost;
}

export interface GetStoreToShare_currentRegimen {
  __typename: "Regimen";
  products: GetStoreToShare_currentRegimen_products[];
}

export interface GetStoreToShare {
  goalIngredients: GetStoreToShare_goalIngredients;
  currentRegimen: GetStoreToShare_currentRegimen;
}
