import {FREQUENCY, INGREDIENT_QUANTITY_UNITS} from '../typings/gql/globalTypes';

export interface IRegimen {
  __typename: 'Regimen';
  products: IRegimenProduct[]
}

export interface IRegimenProduct {
  __typename: 'RegimenProduct';
  catalogProductId: string;
  quantity: IProductQuantity;
  cost: ICost;
}

export enum PRODUCT_QUANTITY_UNITS {
  SERVINGS = "SERVINGS",
}

export interface IProductQuantity {
  __typename: 'ProductQuantity';
  id?: string;
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface IDesiredIngredients {
  __typename: 'DesiredIngredients';
  ingredientRanges: IIngredientRange[];
}

export interface IIngredientRange {
  __typename: 'IngredientRange';
  ingredientType: IIngredientType;
  minimumQuantity: IIngredientQuantity | null;
  maximumQuantity: IIngredientQuantity | null;
  frequency: FREQUENCY;
}

export interface ICost {
  __typename: 'Cost';
  id?: string;
  money: number;
  frequency: FREQUENCY;
}

export interface IRegimenCost {
  __typename: 'RegimenCost';
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
  __typename: 'IngredientType';
  name: string;
}

export interface IIngredientQuantity {
  __typename: 'IngredientQuantity';
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface IIngredient {
  __typename: 'Ingredient';
  quantity: IIngredientQuantity;
  ingredientType: IIngredientType;
}
