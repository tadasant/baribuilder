import {FREQUENCY, INGREDIENT_QUANTITY_UNITS, PRODUCT_QUANTITY_UNITS} from '../typings/gql/globalTypes';

// TODO look into auto-generating this from client-schema.graphql file

// Local store types

export interface IClientCatalogProduct {
  __typename: 'ClientCatalogProduct';
  catalogProductId: string;
  cost: ICatalogProductCost;
  costEffectivenessRating: number | null;
  defaultQuantity: ICatalogProductQuantity;
  matchScore: number;
}

export interface ICatalogProductCost {
  __typename: 'CatalogProductCost';
  money: number;
  frequency: FREQUENCY;
}

export interface ICatalogProductQuantity {
  __typename: 'CatalogProductQuantity';
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
  frequency: FREQUENCY;
  remainingUnfilledIngredientCount?: number;
}

export interface IRegimen {
  __typename: 'Regimen';
  products: IRegimenProduct[]
}

export interface IRegimenProduct {
  __typename: 'RegimenProduct';
  catalogProductId: string;
  quantity: IRegimenProductQuantity;
  cost: IRegimenProductCost;
}

export interface IRegimenProductQuantity {
  __typename: 'RegimenProductQuantity';
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface IRegimenProductCost {
  __typename: 'RegimenProductCost';
  money: number;
  frequency: FREQUENCY;
}

export interface IGoalIngredients {
  __typename: 'GoalIngredients';
  ingredientRanges: IIngredientRange[];
  unfilledIngredientCount?: number;
}

export interface IIngredientRange {
  __typename: 'IngredientRange';
  ingredientTypeName: string;
  minimumAmount: number | null;
  maximumAmount: number | null;
  units: INGREDIENT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface ISearchQuery {
  __typename: 'SearchQuery';
  value: string;
}
