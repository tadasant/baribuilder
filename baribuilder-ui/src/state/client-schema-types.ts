import {FREQUENCY, INGREDIENT_QUANTITY_UNITS, PRODUCT_QUANTITY_UNITS} from '../typings/gql/globalTypes';

// TODO look into auto-generating this from client-schema.graphql file

// Local store types

export interface IClientCatalogProduct {
  __typename: 'ClientCatalogProduct';
  catalogProductId: string;
  cost: ICost;
  projectedRegimenCost: IRegimenCost | null;
  quantity: ICatalogProductQuantity;
  matchScore: number;
}

export interface ICost {
  __typename: 'Cost';
  money: number;
  frequency: FREQUENCY;
}

export interface IRegimenCost {
  __typename: 'RegimenCost';
  numRemainingProducts: number;
  money: number;
  frequency: FREQUENCY;
}

export interface ICatalogProductQuantity {
  __typename: 'CatalogProductQuantity';
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

export interface IRegimen {
  __typename: 'Regimen';
  products: IRegimenProduct[]
}

export interface IRegimenProduct {
  __typename: 'RegimenProduct';
  catalogProductId: string;
  quantity: IRegimenProductQuantity;
  cost: ICost;
}

export interface IRegimenProductQuantity {
  __typename: 'RegimenProductQuantity';
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
  minimum: IRangeIngredientQuantity | null;
  maximum: IRangeIngredientQuantity | null;
  frequency: FREQUENCY;
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

export interface IRangeIngredientQuantity {
  __typename: 'RangeIngredientQuantity';
  id: string;
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
}

export interface IIngredient {
  __typename: 'Ingredient';
  quantity: IRangeIngredientQuantity;
  ingredientType: IIngredientType;
}
