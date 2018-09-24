import {keyBy} from 'lodash';
import {GetAllProductsIngredients_allCatalogProducts} from '../../../typings/gql/GetAllProductsIngredients';

import {GetProductIngredients_CatalogProduct_serving_ingredients} from '../../../typings/gql/GetProductIngredients';
import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {IIngredientRange, IProductQuantity, IRegimenProduct, PRODUCT_QUANTITY_UNITS} from '../../client-schema-types';

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
      if (ingredientRange.minimumQuantity) {
        smallestToFillIngredient = ingredientRange.minimumQuantity.amount / productIngredientsByName[ingredientName].quantity.amount;
        smallestToFillIngredient = smallestToFillIngredient % 1 > 0.001 ? Math.ceil(smallestToFillIngredient) : Math.floor(smallestToFillIngredient); // Don't round up if it's within .001
      }

      let maxBeforeExceedIngredient: number | undefined = undefined;
      if (ingredientRange.maximumQuantity) {
        maxBeforeExceedIngredient = Math.floor(ingredientRange.maximumQuantity.amount / productIngredientsByName[ingredientName].quantity.amount);
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
    let newMax = range.maximumQuantity ? range.maximumQuantity.amount : undefined;
    let newMin = range.minimumQuantity ? range.minimumQuantity.amount : undefined;
    currentRegimenProducts.forEach(product => {
      const productIngredients = productsById[product.catalogProductId].serving.ingredients || [];
      productIngredients.forEach((productIngredient: GetProductIngredients_CatalogProduct_serving_ingredients) => {
        if (productIngredient.ingredientType.name === range.ingredientType.name) {
          if ((range.maximumQuantity && productIngredient.quantity.units !== range.maximumQuantity.units) || (range.minimumQuantity && productIngredient.quantity.units !== range.minimumQuantity.units)) {
            console.warn(`Conversions not yet supported ${product.catalogProductId}, ${productIngredient.ingredientType.name}`);
          }
          if (range.maximumQuantity && newMax !== undefined) {
            newMax -= productIngredient.quantity.amount * product.quantity.amount;
          }
          if (range.minimumQuantity && newMin !== undefined) {
            newMin -= productIngredient.quantity.amount * product.quantity.amount;
          }
        }
      });
    });
    const result = {...range};
    if (range.minimumQuantity && newMin !== undefined) {
      result.minimumQuantity = {
        ...range.minimumQuantity,
        amount: newMin,
      }
    }
    if (range.maximumQuantity && newMax !== undefined) {
      result.maximumQuantity = {
        ...range.maximumQuantity,
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
): IProductQuantity => {
  const targetIngredientRanges = calculateTargetIngredientRanges(desiredIngredientRanges, currentRegimenProducts, products);
  return {
    __typename: 'ProductQuantity',
    amount: deriveIdealQuantityViaLimitingMicros(productIngredients, targetIngredientRanges),
    units: PRODUCT_QUANTITY_UNITS.SERVINGS,
    frequency: FREQUENCY.DAILY,
  };
};