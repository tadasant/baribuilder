import {FREQUENCY, INGREDIENT_UNITS} from '../typings/gql/globalTypes';

export enum QUANTITY_UNITS {
  SERVINGS = "SERVINGS",
}

export interface IRegimenProduct {
  id: string;
  quantity: IQuantity;
}

export interface IRegimen {
  __typename: string;
  products: IRegimenProduct[]
}

// TODO this should be moved to central source of truth reference data concept
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

export interface ICost {
  __typename: string;
  value: number;
  frequency: FREQUENCY;
}

export interface IQuantity {
  __typename: string;
  number: number;
  units: QUANTITY_UNITS;
  frequency: FREQUENCY;
}
