/* tslint:disable */
// This file was automatically generated and should not be edited.

import { INGREDIENT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAllProductsIngredients
// ====================================================

export interface GetAllProductsIngredients_allCatalogProducts_serving_ingredients_quantity {
  __typename: "IngredientQuantity";
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface GetAllProductsIngredients_allCatalogProducts_serving_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetAllProductsIngredients_allCatalogProducts_serving_ingredients {
  __typename: "Ingredient";
  quantity: GetAllProductsIngredients_allCatalogProducts_serving_ingredients_quantity;
  ingredientType: GetAllProductsIngredients_allCatalogProducts_serving_ingredients_ingredientType;
}

export interface GetAllProductsIngredients_allCatalogProducts_serving {
  __typename: "Serving";
  ingredients: GetAllProductsIngredients_allCatalogProducts_serving_ingredients[] | null;
}

export interface GetAllProductsIngredients_allCatalogProducts {
  __typename: "CatalogProduct";
  id: string;
  serving: GetAllProductsIngredients_allCatalogProducts_serving;
}

export interface GetAllProductsIngredients {
  allCatalogProducts: GetAllProductsIngredients_allCatalogProducts[];
}
