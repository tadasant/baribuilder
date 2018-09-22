import {keyBy} from 'lodash';
import {GetAllProductsIngredients_allProducts} from '../../../typings/gql/GetAllProductsIngredients';

import {GetProductIngredients_Product_nutritionFacts_ingredients} from '../../../typings/gql/GetProductIngredients';
import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {IIngredientRange, IQuantity, IRegimenProduct, QUANTITY_UNITS} from '../../client-schema-types';

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
      if (ingredientRange.minimumDosage) {
        smallestToFillIngredient = ingredientRange.minimumDosage.number / productIngredientsByName[ingredientName].amount;
        smallestToFillIngredient = smallestToFillIngredient % 1 > 0.001 ? Math.ceil(smallestToFillIngredient) : Math.floor(smallestToFillIngredient); // Don't round up if it's within .001
      }

      let maxBeforeExceedIngredient: number | undefined = undefined;
      if (ingredientRange.maximumDosage) {
        maxBeforeExceedIngredient = Math.floor(ingredientRange.maximumDosage.number / productIngredientsByName[ingredientName].amount);
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
  const allDosagesDaily = desiredIngredientRanges.every(range => (range.minimumDosage ? range.minimumDosage.frequency === 'DAILY' : true) && (range.maximumDosage ? range.maximumDosage.frequency === 'DAILY' : true));
  const allRegimenProductDosagesDaily = currentRegimenProducts.every(product => product.quantity.frequency === 'DAILY');
  if (!allDosagesDaily || !allRegimenProductDosagesDaily) {
    console.warn('Not all frequencies are DAILY. Error 38239');
    return [];
  }

  const targetIngredientRanges: IIngredientRange[] = [];
  desiredIngredientRanges.forEach(range => {
    let newMax = range.maximumDosage ? range.maximumDosage.number : undefined;
    let newMin = range.minimumDosage ? range.minimumDosage.number : undefined;
    currentRegimenProducts.forEach(product => {
      const productIngredients = products[product.id].nutritionFacts.ingredients || [];
      productIngredients.forEach((productIngredient: GetProductIngredients_Product_nutritionFacts_ingredients) => {
        if (productIngredient.ingredientType.name === range.ingredientType.name) {
          if ((range.maximumDosage && productIngredient.units !== range.maximumDosage.units) || (range.minimumDosage && productIngredient.units !== range.minimumDosage.units)) {
            console.warn(`Conversions not yet supported ${products[product.id].name}, ${productIngredient.ingredientType.name}`);
          }
          if (range.maximumDosage && newMax !== undefined) {
            newMax -= productIngredient.amount * product.quantity.number;
          }
          if (range.minimumDosage && newMin !== undefined) {
            newMin -= productIngredient.amount * product.quantity.number;
          }
        }
      });
    });
    const result = {...range};
    if (range.minimumDosage && newMin !== undefined) {
      result.minimumDosage = {
        ...range.minimumDosage,
        number: newMin,
      }
    }
    if (range.maximumDosage && newMax !== undefined) {
      result.maximumDosage = {
        ...range.maximumDosage,
        number: newMax,
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
): IQuantity => {
  const targetIngredientRanges = calculateTargetIngredientRanges(desiredIngredientRanges, currentRegimenProducts, products);
  return {
    __typename: 'Quantity',
    number: deriveIdealQuantityViaLimitingMicros(productIngredients, targetIngredientRanges),
    units: QUANTITY_UNITS.SERVINGS,
    frequency: FREQUENCY.DAILY,
  };
};