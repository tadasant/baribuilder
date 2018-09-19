import {INGREDIENT_UNITS} from '../typings/gql/globalTypes';

interface IRegimenProduct {
  id: string;
  quantity: number;
  units: string;
}

export interface IRegimen {
  __typename: string;
  products: IRegimenProduct[]
}

export interface IIngredientType {
  name: string;
}

export interface IIngredientQuantity {
  amount: number;
  units: INGREDIENT_UNITS;
}

export interface IIngredientRange {
  ingredientType: IIngredientType;
  minimum: IIngredientQuantity;
  maximum: IIngredientQuantity;
}

export interface IDesiredDosages {
  __typename: string;
  ingredientRanges: IIngredientRange[];
}

export type Frequency = 'DAILY' | 'MONTHLY' | 'YEARLY';

export interface IPrice {
  amount: number
}

export interface ICost {
  value: IPrice;
  frequency: Frequency;
}

export interface IUnitQuantity {
  amount: number;
  frequency: Frequency;
}
