/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS, FREQUENCY, PRODUCT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetDataForRegimenFacts
// ====================================================

export interface GetDataForRegimenFacts_allCatalogProducts_serving_ingredients_quantity {
  __typename: "ServingIngredientQuantity";
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface GetDataForRegimenFacts_allCatalogProducts_serving_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetDataForRegimenFacts_allCatalogProducts_serving_ingredients {
  __typename: "ServingIngredient";
  quantity: GetDataForRegimenFacts_allCatalogProducts_serving_ingredients_quantity;
  ingredientType: GetDataForRegimenFacts_allCatalogProducts_serving_ingredients_ingredientType;
}

export interface GetDataForRegimenFacts_allCatalogProducts_serving {
  __typename: "Serving";
  ingredients: GetDataForRegimenFacts_allCatalogProducts_serving_ingredients[] | null;
}

export interface GetDataForRegimenFacts_allCatalogProducts {
  __typename: "CatalogProduct";
  id: string;
  serving: GetDataForRegimenFacts_allCatalogProducts_serving;
}

export interface GetDataForRegimenFacts_currentRegimen_products_quantity {
  __typename: "RegimenProductQuantity";
  amount: number;
  frequency: FREQUENCY;
  units: PRODUCT_QUANTITY_UNITS;
}

export interface GetDataForRegimenFacts_currentRegimen_products_cost {
  __typename: "RegimenProductCost";
  money: number;
  frequency: FREQUENCY;
}

export interface GetDataForRegimenFacts_currentRegimen_products {
  __typename: "RegimenProduct";
  catalogProductId: string;
  quantity: GetDataForRegimenFacts_currentRegimen_products_quantity;
  cost: GetDataForRegimenFacts_currentRegimen_products_cost;
}

export interface GetDataForRegimenFacts_currentRegimen {
  __typename: "Regimen";
  products: GetDataForRegimenFacts_currentRegimen_products[];
}

export interface GetDataForRegimenFacts_desiredIngredients_ingredientRanges {
  __typename: "IngredientRange";
  ingredientTypeName: string;
  minimumAmount: number | null;
  maximumAmount: number | null;
  units: INGREDIENT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface GetDataForRegimenFacts_desiredIngredients {
  __typename: "DesiredIngredients";
  ingredientRanges: GetDataForRegimenFacts_desiredIngredients_ingredientRanges[];
}

export interface GetDataForRegimenFacts {
  allCatalogProducts: GetDataForRegimenFacts_allCatalogProducts[];
  currentRegimen: GetDataForRegimenFacts_currentRegimen;
  desiredIngredients: GetDataForRegimenFacts_desiredIngredients;
}
