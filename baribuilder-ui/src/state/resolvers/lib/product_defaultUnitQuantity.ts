import {keyBy} from 'lodash';
import {GetAllProductIngredients_allProducts} from '../../../typings/gql/GetAllProductIngredients';

import {GetProductIngredients_Product_nutritionFacts_ingredients} from '../../../typings/gql/GetProductIngredients';
import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {IIngredientRange, IRegimenProduct, IUnitQuantity} from '../../client-schema-types';

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
      if (ingredientRange.minimum) {
        smallestToFillIngredient = ingredientRange.minimum.number / productIngredientsByName[ingredientName].amount;
        smallestToFillIngredient = smallestToFillIngredient % 1 > 0.001 ? Math.ceil(smallestToFillIngredient) : Math.floor(smallestToFillIngredient); // Don't round up if it's within .001
      }

      let maxBeforeExceedIngredient: number | undefined = undefined;
      if (ingredientRange.maximum) {
        maxBeforeExceedIngredient = Math.floor(ingredientRange.maximum.number / productIngredientsByName[ingredientName].amount);
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
const calculateTargetIngredientRanges = (desiredIngredientRanges: IIngredientRange[], currentRegimenProducts: IRegimenProduct[], products: GetAllProductIngredients_allProducts[]): IIngredientRange[] => {
  const allDosagesDaily = desiredIngredientRanges.every(range => (range.minimum ? range.minimum.frequency === 'DAILY' : true) && (range.maximum ? range.maximum.frequency === 'DAILY' : true));
  const allRegimenProductDosagesDaily = currentRegimenProducts.every(product => product.frequency === 'DAILY');
  if (!allDosagesDaily || !allRegimenProductDosagesDaily) {
    console.warn('Not all frequencies are DAILY. Error 38239');
    return [];
  }

  const targetIngredientRanges: IIngredientRange[] = [];
  desiredIngredientRanges.forEach(range => {
    let newMax = range.maximum ? range.maximum.number : undefined;
    let newMin = range.minimum ? range.minimum.number : undefined;
    currentRegimenProducts.forEach(product => {
      const productIngredients = products[product.id].nutritionFacts.ingredients || [];
      productIngredients.forEach((productIngredient: GetProductIngredients_Product_nutritionFacts_ingredients) => {
        if (productIngredient.ingredientType.name === range.ingredientType.name) {
          if ((range.maximum && productIngredient.units !== range.maximum.units) || (range.minimum && productIngredient.units !== range.minimum.units)) {
            console.warn(`Conversions not yet supported ${products[product.id].name}, ${productIngredient.ingredientType.name}`);
          }
          if (range.maximum && newMax !== undefined) {
            newMax -= productIngredient.amount * product.numServings;
          }
          if (range.minimum && newMin !== undefined) {
            newMin -= productIngredient.amount * product.numServings;
          }
        }
      });
    });
    const result = {...range};
    if (range.minimum && newMin !== undefined) {
      result.minimum = {
        ...range.minimum,
        number: newMin,
      }
    }
    if (range.maximum && newMax !== undefined) {
      result.maximum = {
        ...range.maximum,
        number: newMax,
      }
    }
    targetIngredientRanges.push(result);
  });

  return targetIngredientRanges;
};

export const calculateDefaultUnitQuantity = (
  productIngredients: GetProductIngredients_Product_nutritionFacts_ingredients[],
  products: GetAllProductIngredients_allProducts[],
  desiredIngredientRanges: IIngredientRange[],
  currentRegimenProducts: IRegimenProduct[]
): IUnitQuantity => {
  const targetIngredientRanges = calculateTargetIngredientRanges(desiredIngredientRanges, currentRegimenProducts, products);
  return {
    __typename: 'Quantity',
    amount: deriveIdealQuantityViaLimitingMicros(productIngredients, targetIngredientRanges),
    frequency: FREQUENCY.DAILY,
  };
};