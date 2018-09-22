import {GetAllProductsIngredients_allProducts} from '../../../typings/gql/GetAllProductsIngredients';
import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {ICost, IIngredient, IIngredientRange, IRegimenProduct, QUANTITY_UNITS} from '../../client-schema-types';
import {IProductForProjectedRegimenCost} from './product_projectedRegimenCost';

export const subtractRegimenIngredientsFromIngredientRanges = (
  regimenProducts: IRegimenProduct[],
  desiredIngredientRanges: IIngredientRange[],
  products: GetAllProductsIngredients_allProducts[],
): IIngredient[] => {
  // TODO
  return [];
};

export const subtractProductFromIngredients = (
  ingredients: IIngredient[],
  product: IProductForProjectedRegimenCost,
): IIngredient[] => {
  // TODO
  return [];
};

// NB: "project" is a verb here
export const projectCost = (remainingIngredients: IIngredient[]): ICost => {
  // TODO
  return {
    __typename: 'Cost',
    value: 0.0,
    quantity: {
      __typename: 'Quantity',
      number: 5,
      frequency: FREQUENCY.DAILY,
      units: QUANTITY_UNITS.SERVINGS,
    }
  };
};

export const calculateRegimenCost = (regimenProducts: IRegimenProduct[]): ICost => {
  // TODO
  return {
    __typename: 'Cost',
    value: 0.0,
    quantity: {
      __typename: 'Quantity',
      number: 5,
      frequency: FREQUENCY.DAILY,
      units: QUANTITY_UNITS.SERVINGS,
    }
  };
};

export const addCosts = (...costs: ICost[]): ICost => {
  // TODO
  return {
    __typename: 'Cost',
    value: 0.0,
    quantity: {
      __typename: 'Quantity',
      number: 5,
      frequency: FREQUENCY.DAILY,
      units: QUANTITY_UNITS.SERVINGS,
    }
  };
};