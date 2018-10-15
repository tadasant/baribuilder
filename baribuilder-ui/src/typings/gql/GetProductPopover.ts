/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BRAND, SERVING_SIZE_UNITS, INGREDIENT_QUANTITY_UNITS } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductPopover
// ====================================================

export interface GetProductPopover_CatalogProduct_serving_ingredients_ingredientType {
  __typename: "IngredientType";
  name: string;
}

export interface GetProductPopover_CatalogProduct_serving_ingredients_quantity {
  __typename: "ServingIngredientQuantity";
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface GetProductPopover_CatalogProduct_serving_ingredients {
  __typename: "ServingIngredient";
  ingredientType: GetProductPopover_CatalogProduct_serving_ingredients_ingredientType;
  quantity: GetProductPopover_CatalogProduct_serving_ingredients_quantity;
}

export interface GetProductPopover_CatalogProduct_serving {
  __typename: "Serving";
  size: number;
  units: SERVING_SIZE_UNITS;
  ingredients: GetProductPopover_CatalogProduct_serving_ingredients[] | null;
}

export interface GetProductPopover_CatalogProduct {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  brand: BRAND;
  serving: GetProductPopover_CatalogProduct_serving;
}

export interface GetProductPopover {
  CatalogProduct: GetProductPopover_CatalogProduct | null;
}

export interface GetProductPopoverVariables {
  catalogProductId?: string | null;
}
