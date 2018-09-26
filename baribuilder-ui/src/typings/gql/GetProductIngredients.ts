/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductIngredients
// ====================================================

export interface GetProductIngredients_CatalogProduct_serving_ingredients_quantity {
  __typename: "ServingIngredientQuantity";
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface GetProductIngredients_CatalogProduct_serving_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetProductIngredients_CatalogProduct_serving_ingredients {
  __typename: "ServingIngredient";
  quantity: GetProductIngredients_CatalogProduct_serving_ingredients_quantity;
  ingredientType: GetProductIngredients_CatalogProduct_serving_ingredients_ingredientType;
}

export interface GetProductIngredients_CatalogProduct_serving {
  __typename: "Serving";
  ingredients: GetProductIngredients_CatalogProduct_serving_ingredients[] | null;
}

export interface GetProductIngredients_CatalogProduct {
  __typename: "CatalogProduct";
  id: string;
  serving: GetProductIngredients_CatalogProduct_serving;
}

export interface GetProductIngredients {
  CatalogProduct: GetProductIngredients_CatalogProduct | null;
}
