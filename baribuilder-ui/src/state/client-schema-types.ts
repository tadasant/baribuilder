import {FREQUENCY, INGREDIENT_UNITS} from '../typings/gql/globalTypes';

export interface IRegimenProduct {
  id: string;
  numServings: number;
  frequency: FREQUENCY;
}

export interface IRegimen {
  __typename: string;
  products: IRegimenProduct[]
}

export interface IIngredientType {
  name: string;
}

export interface IDosage {
  number: number;
  units: INGREDIENT_UNITS;
  frequency: FREQUENCY;
}

export interface IIngredientRange {
  ingredientType: IIngredientType;
  minimum: IDosage | null;
  maximum: IDosage | null;
}

export interface IDesiredDosages {
  __typename: string;
  ingredientRanges: IIngredientRange[];
}

export interface IPrice {
  __typename: string;
  amount: number
}

export interface ICost {
  __typename: string;
  value: IPrice;
  frequency: FREQUENCY;
}

export interface IUnitQuantity {
  __typename: string;
  amount: number;
  frequency: FREQUENCY;
}
