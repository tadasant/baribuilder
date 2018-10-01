import {keyBy} from 'lodash';
import {GetAllProductsIngredients_allCatalogProducts} from '../../../typings/gql/GetAllProductsIngredients';

import {GetProductIngredients_CatalogProduct_serving_ingredients} from '../../../typings/gql/GetProductIngredients';
import {FREQUENCY, PRODUCT_QUANTITY_UNITS} from '../../../typings/gql/globalTypes';
import {ICatalogProductQuantity, IIngredientRange, IRegimenProduct} from '../../client-schema-types';

/**
 * Returns the ideal number of servings of this product for the given target
 * Will give you the least amount that fulfills the most micronutrients without exceeding any
 */
const deriveIdealQuantityViaLimitingMicros = (
  productIngredients: GetProductIngredients_CatalogProduct_serving_ingredients[],
  targetIngredientRanges: IIngredientRange[],
): number => {
  const productIngredientsByName = keyBy(productIngredients, (o: GetProductIngredients_CatalogProduct_serving_ingredients) => o.ingredientType.name);
  let smallestToFill: number | undefined = undefined;
  let maxBeforeExceed: number | undefined = undefined;

  targetIngredientRanges.forEach(ingredientRange => {
    const ingredientName = ingredientRange.ingredientTypeName;
    if (productIngredientsByName.hasOwnProperty(ingredientName)) {
      let smallestToFillIngredient: number | undefined = undefined;
      if (ingredientRange.minimumAmount !== null) {
        smallestToFillIngredient = ingredientRange.minimumAmount / productIngredientsByName[ingredientName].quantity.amount;
        smallestToFillIngredient = smallestToFillIngredient % 1 > 0.001 ? Math.ceil(smallestToFillIngredient) : Math.floor(smallestToFillIngredient); // Don't round up if it's within .001
      }

      let maxBeforeExceedIngredient: number | undefined = undefined;
      if (ingredientRange.maximumAmount !== null) {
        maxBeforeExceedIngredient = Math.floor(ingredientRange.maximumAmount / productIngredientsByName[ingredientName].quantity.amount);
      }

      if (smallestToFill === undefined || (smallestToFillIngredient !== undefined && smallestToFillIngredient > smallestToFill)) {
        smallestToFill = smallestToFillIngredient;
      }
      if (maxBeforeExceed === undefined || (maxBeforeExceedIngredient !== undefined && maxBeforeExceedIngredient < maxBeforeExceed)) {
        maxBeforeExceed = maxBeforeExceedIngredient;
      }
    }
  });
  return smallestToFill === undefined || maxBeforeExceed === undefined ? 1 : smallestToFill > maxBeforeExceed ? maxBeforeExceed : smallestToFill;
};

// TODO break this out into more steps (very confusing logic)
const calculateTargetIngredientRanges = (goalIngredientRanges: IIngredientRange[], currentRegimenProducts: IRegimenProduct[], catalogProducts: GetAllProductsIngredients_allCatalogProducts[]): IIngredientRange[] => {
  // TODO quantity units need to implemented somewhere here
  const productsById = keyBy(catalogProducts, product => product.id);
  const allRangesDaily = goalIngredientRanges.every(range => range.frequency === 'DAILY');
  const allRegimenProductIngredientsDaily = currentRegimenProducts.every(product => product.quantity.frequency === 'DAILY');
  if (!allRangesDaily || !allRegimenProductIngredientsDaily) {
    console.warn('Not all frequencies are DAILY. Error 38239');
    return [];
  }

  const targetIngredientRanges: IIngredientRange[] = [];
  goalIngredientRanges.forEach(range => {
    let newMax = range.maximumAmount !== null ? range.maximumAmount : undefined;
    let newMin = range.minimumAmount !== null ? range.minimumAmount : undefined;
    currentRegimenProducts.forEach(product => {
      const productIngredients = productsById[product.catalogProductId].serving.ingredients || [];
      productIngredients.forEach((productIngredient: GetProductIngredients_CatalogProduct_serving_ingredients) => {
        if (productIngredient.ingredientType.name === range.ingredientTypeName) {
          if (range.maximumAmount !== null && newMax !== undefined) {
            newMax -= productIngredient.quantity.amount * product.quantity.amount;
          }
          if (range.minimumAmount !== null && newMin !== undefined) {
            newMin -= productIngredient.quantity.amount * product.quantity.amount;
          }
        }
      });
    });
    const result = {...range};
    if (range.minimumAmount !== null && newMin !== undefined) {
      result.minimumAmount = newMin;
    }
    if (range.maximumAmount !== null && newMax !== undefined) {
      result.maximumAmount = newMax;
    }
    targetIngredientRanges.push(result);
  });

  return targetIngredientRanges;
};

export const calculateDefaultQuantity = (
  productIngredients: GetProductIngredients_CatalogProduct_serving_ingredients[],
  products: GetAllProductsIngredients_allCatalogProducts[],
  goalIngredientRanges: IIngredientRange[],
  currentRegimenProducts: IRegimenProduct[]
): ICatalogProductQuantity => {
  const targetIngredientRanges = calculateTargetIngredientRanges(goalIngredientRanges, currentRegimenProducts, products);
  return {
    __typename: 'CatalogProductQuantity',
    amount: deriveIdealQuantityViaLimitingMicros(productIngredients, targetIngredientRanges),
    units: PRODUCT_QUANTITY_UNITS.SERVINGS,
    frequency: FREQUENCY.DAILY,
  };
};