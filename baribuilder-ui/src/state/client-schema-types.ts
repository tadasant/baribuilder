import {FREQUENCY, INGREDIENT_UNITS} from '../typings/gql/globalTypes';

export interface IRegimen {
  __typename: string;
  products: IRegimenProduct[]
}

export interface IRegimenProduct {
  __typename: string;
  id: string;
  quantity: IQuantity;
}

export enum QUANTITY_UNITS {
  SERVINGS = "SERVINGS",
}

export interface IQuantity {
  __typename: string;
  number: number;
  units: QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface IDesiredDosages {
  __typename: string;
  ingredientRanges: IIngredientRange[];
}

export interface IIngredientRange {
  __typename: string;
  ingredientType: IIngredientType;
  minimumDosage: IDosage | null;
  maximumDosage: IDosage | null;
  frequency: FREQUENCY;
}

export interface IDosage {
  __typename: string;
  number: number;
  units: INGREDIENT_UNITS;
}

export interface ICost {
  __typename: string;
  value: number;
  quantity: IQuantity;
}

export interface IRegimenCost {
  __typename: string;
  numRemainingProducts: number;
  cost: ICost;
}

//// Server side duplicates

// TODO this should be moved to central source of truth reference data concept
export interface IIngredientType {
  __typename: string;
  name: string;
}

export interface IIngredient {
  __typename: string;
  amount: number;
  units: INGREDIENT_UNITS;
  ingredientType: IIngredientType;
}

export interface IRegimenIngredient extends IIngredient {
  frequency: FREQUENCY;
}