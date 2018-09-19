import {INGREDIENT_UNITS} from '../typings/gql/globalTypes';

interface IRegimenProduct {
  id: string;
  numServings: number;
  frequency: Frequency;
}

export interface IRegimen {
  __typename: string;
  products: IRegimenProduct[]
}

export interface IIngredientType {
  name: string;
}

export interface IIngredientRange {
  ingredientType: IIngredientType;
  minimum: number;
  maximum: number;
  units: INGREDIENT_UNITS;
  frequency: Frequency;
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
