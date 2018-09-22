import {FREQUENCY, INGREDIENT_QUANTITY_UNITS} from '../typings/gql/globalTypes';

export interface IRegimen {
  __typename: string;
  products: IRegimenProduct[]
}

export interface IRegimenProduct {
  __typename: string;
  id: string;
  quantity: IProductQuantity;
}

export enum PRODUCT_QUANTITY_UNITS {
  SERVINGS = "SERVINGS",
}

export interface IProductQuantity {
  __typename: string;
  number: number;
  units: PRODUCT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface IDesiredIngredients {
  __typename: string;
  ingredientRanges: IIngredientRange[];
}

export interface IIngredientRange {
  __typename: string;
  ingredientType: IIngredientType;
  minimumIngredientQuantity: IIngredientQuantity | null;
  maximumIngredientQuantity: IIngredientQuantity | null;
  frequency: FREQUENCY;
}

export interface ICost {
  __typename: string;
  money: number;
  frequency: FREQUENCY;
}

export interface IRegimenCost {
  __typename: string;
  numRemainingProducts: number;
  cost: ICost;
}

/**
 * RegimenIngredient, as opposed to Ingredient, combines concept of Regimen and Ingredient, with these modifications:
 *
 * 1) Removes concept of products so we're only looking at discrete ingredients
 * 2) Removes concept of quantity of each product so we're only looking at aggregations of ingredients
 * 3) The above removals are captured in the "amount" / "units"
 * 4) Adds concept of "frequency", since regimens are taken on a cadence
 */
export interface IRegimenIngredient extends IIngredient {
  frequency: FREQUENCY;
}

//// Server side duplicates

// TODO this should be moved to central source of truth reference data concept
export interface IIngredientType {
  __typename: string;
  name: string;
}

export interface IIngredientQuantity {
  __typename: string;
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface IIngredient {
  __typename: string;
  ingredientQuantity: IIngredientQuantity;
  ingredientType: IIngredientType;
}
