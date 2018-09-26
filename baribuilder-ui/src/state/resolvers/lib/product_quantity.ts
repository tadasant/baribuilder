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
    const ingredientName = ingredientRange.ingredientType.name;
    if (productIngredientsByName.hasOwnProperty(ingredientName)) {
      let smallestToFillIngredient: number | undefined = undefined;
      if (ingredientRange.minimum) {
        smallestToFillIngredient = ingredientRange.minimum.amount / productIngredientsByName[ingredientName].quantity.amount;
        smallestToFillIngredient = smallestToFillIngredient % 1 > 0.001 ? Math.ceil(smallestToFillIngredient) : Math.floor(smallestToFillIngredient); // Don't round up if it's within .001
      }

      let maxBeforeExceedIngredient: number | undefined = undefined;
      if (ingredientRange.maximum) {
        maxBeforeExceedIngredient = Math.floor(ingredientRange.maximum.amount / productIngredientsByName[ingredientName].quantity.amount);
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
const calculateTargetIngredientRanges = (desiredIngredientRanges: IIngredientRange[], currentRegimenProducts: IRegimenProduct[], catalogProducts: GetAllProductsIngredients_allCatalogProducts[]): IIngredientRange[] => {
  // TODO quantity units need to implemented somewhere here
  const productsById = keyBy(catalogProducts, product => product.id);
  const allRangesDaily = desiredIngredientRanges.every(range => range.frequency === 'DAILY');
  const allRegimenProductIngredientsDaily = currentRegimenProducts.every(product => product.quantity.frequency === 'DAILY');
  if (!allRangesDaily || !allRegimenProductIngredientsDaily) {
    console.warn('Not all frequencies are DAILY. Error 38239');
    return [];
  }

  const targetIngredientRanges: IIngredientRange[] = [];
  desiredIngredientRanges.forEach(range => {
    let newMax = range.maximum ? range.maximum.amount : undefined;
    let newMin = range.minimum ? range.minimum.amount : undefined;
    currentRegimenProducts.forEach(product => {
      const productIngredients = productsById[product.catalogProductId].serving.ingredients || [];
      productIngredients.forEach((productIngredient: GetProductIngredients_CatalogProduct_serving_ingredients) => {
        if (productIngredient.ingredientType.name === range.ingredientType.name) {
          if ((range.maximum && productIngredient.quantity.units !== range.maximum.units) || (range.minimum && productIngredient.quantity.units !== range.minimum.units)) {
            console.warn(`Conversions not yet supported ${product.catalogProductId}, ${productIngredient.ingredientType.name}`);
          }
          if (range.maximum && newMax !== undefined) {
            newMax -= productIngredient.quantity.amount * product.quantity.amount;
          }
          if (range.minimum && newMin !== undefined) {
            newMin -= productIngredient.quantity.amount * product.quantity.amount;
          }
        }
      });
    });
    const result = {...range};
    if (range.minimum && newMin !== undefined) {
      result.minimum = {
        ...range.minimum,
        amount: newMin,
      }
    }
    if (range.maximum && newMax !== undefined) {
      result.maximum = {
        ...range.maximum,
        amount: newMax,
      }
    }
    targetIngredientRanges.push(result);
  });

  return targetIngredientRanges;
};

export const calculateDefaultQuantity = (
  productIngredients: GetProductIngredients_CatalogProduct_serving_ingredients[],
  products: GetAllProductsIngredients_allCatalogProducts[],
  desiredIngredientRanges: IIngredientRange[],
  currentRegimenProducts: IRegimenProduct[]
): ICatalogProductQuantity => {
  const targetIngredientRanges = calculateTargetIngredientRanges(desiredIngredientRanges, currentRegimenProducts, products);
  return {
    __typename: 'CatalogProductQuantity',
    amount: deriveIdealQuantityViaLimitingMicros(productIngredients, targetIngredientRanges),
    units: PRODUCT_QUANTITY_UNITS.SERVINGS,
    frequency: FREQUENCY.DAILY,
  };
};