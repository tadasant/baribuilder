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
  amount: number;
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
  amount: number
}

export interface ICost {
  value: IPrice;
  frequency: FREQUENCY;
}

export interface IUnitQuantity {
  amount: number;
  frequency: FREQUENCY;
}
