import {keyBy} from 'lodash';
import {GetAllProductsIngredients_allProducts} from '../../../typings/gql/GetAllProductsIngredients';

import {GetProductIngredients_Product_nutritionFacts_ingredients} from '../../../typings/gql/GetProductIngredients';
import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {IIngredientRange, IProductQuantity, IRegimenProduct, PRODUCT_QUANTITY_UNITS} from '../../client-schema-types';

/**
 * Returns the ideal number of servings of this product for the given target
 * Will give you the least amount that fulfills the most micronutrients without exceeding any
 */
const deriveIdealQuantityViaLimitingMicros = (
  productIngredients: GetProductIngredients_Product_nutritionFacts_ingredients[],
  targetIngredientRanges: IIngredientRange[],
): number => {
  const productIngredientsByName = keyBy(productIngredients, (o: GetProductIngredients_Product_nutritionFacts_ingredients) => o.ingredientType.name);
  let smallestToFill: number | undefined = undefined;
  let maxBeforeExceed: number | undefined = undefined;

  targetIngredientRanges.forEach(ingredientRange => {
    const ingredientName = ingredientRange.ingredientType.name;
    if (productIngredientsByName.hasOwnProperty(ingredientName)) {
      let smallestToFillIngredient: number | undefined = undefined;
      if (ingredientRange.minimumIngredientQuantity) {
        smallestToFillIngredient = ingredientRange.minimumIngredientQuantity.amount / productIngredientsByName[ingredientName].ingredientQuantity.amount;
        smallestToFillIngredient = smallestToFillIngredient % 1 > 0.001 ? Math.ceil(smallestToFillIngredient) : Math.floor(smallestToFillIngredient); // Don't round up if it's within .001
      }

      let maxBeforeExceedIngredient: number | undefined = undefined;
      if (ingredientRange.maximumIngredientQuantity) {
        maxBeforeExceedIngredient = Math.floor(ingredientRange.maximumIngredientQuantity.amount / productIngredientsByName[ingredientName].ingredientQuantity.amount);
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
const calculateTargetIngredientRanges = (desiredIngredientRanges: IIngredientRange[], currentRegimenProducts: IRegimenProduct[], products: GetAllProductsIngredients_allProducts[]): IIngredientRange[] => {
  // TODO quantity units need to implemented somewhere here
  // TODO [BUG] need to do a keyBy on products so I can access w/ ID
  const allRangesDaily = desiredIngredientRanges.every(range => range.frequency === 'DAILY');
  const allRegimenProductIngredientsDaily = currentRegimenProducts.every(product => product.quantity.frequency === 'DAILY');
  if (!allRangesDaily || !allRegimenProductIngredientsDaily) {
    console.warn('Not all frequencies are DAILY. Error 38239');
    return [];
  }

  const targetIngredientRanges: IIngredientRange[] = [];
  desiredIngredientRanges.forEach(range => {
    let newMax = range.maximumIngredientQuantity ? range.maximumIngredientQuantity.amount : undefined;
    let newMin = range.minimumIngredientQuantity ? range.minimumIngredientQuantity.amount : undefined;
    currentRegimenProducts.forEach(product => {
      const productIngredients = products[product.id].nutritionFacts.ingredients || [];
      productIngredients.forEach((productIngredient: GetProductIngredients_Product_nutritionFacts_ingredients) => {
        if (productIngredient.ingredientType.name === range.ingredientType.name) {
          if ((range.maximumIngredientQuantity && productIngredient.ingredientQuantity.units !== range.maximumIngredientQuantity.units) || (range.minimumIngredientQuantity && productIngredient.ingredientQuantity.units !== range.minimumIngredientQuantity.units)) {
            console.warn(`Conversions not yet supported ${products[product.id].name}, ${productIngredient.ingredientType.name}`);
          }
          if (range.maximumIngredientQuantity && newMax !== undefined) {
            newMax -= productIngredient.ingredientQuantity.amount * product.quantity.number;
          }
          if (range.minimumIngredientQuantity && newMin !== undefined) {
            newMin -= productIngredient.ingredientQuantity.amount * product.quantity.number;
          }
        }
      });
    });
    const result = {...range};
    if (range.minimumIngredientQuantity && newMin !== undefined) {
      result.minimumIngredientQuantity = {
        ...range.minimumIngredientQuantity,
        amount: newMin,
      }
    }
    if (range.maximumIngredientQuantity && newMax !== undefined) {
      result.maximumIngredientQuantity = {
        ...range.maximumIngredientQuantity,
        amount: newMax,
      }
    }
    targetIngredientRanges.push(result);
  });

  return targetIngredientRanges;
};

export const calculateDefaultQuantity = (
  productIngredients: GetProductIngredients_Product_nutritionFacts_ingredients[],
  products: GetAllProductsIngredients_allProducts[],
  desiredIngredientRanges: IIngredientRange[],
  currentRegimenProducts: IRegimenProduct[]
): IProductQuantity => {
  const targetIngredientRanges = calculateTargetIngredientRanges(desiredIngredientRanges, currentRegimenProducts, products);
  return {
    __typename: 'ProductQuantity',
    number: deriveIdealQuantityViaLimitingMicros(productIngredients, targetIngredientRanges),
    units: PRODUCT_QUANTITY_UNITS.SERVINGS,
    frequency: FREQUENCY.DAILY,
  };
};