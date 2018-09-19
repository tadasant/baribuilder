import {GetAllProductIngredients_allProducts} from '../../../typings/gql/GetAllProductIngredients';

import {GetProductIngredients_Product_nutritionFacts_ingredients} from '../../../typings/gql/GetProductIngredients';
import {IIngredientRange, IUnitQuantity, IRegimenProduct} from '../../client-schema-types';
import {keyBy} from 'lodash';

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
      let smallestToFillIngredient = ingredientRange.minimum.amount / productIngredientsByName[ingredientName].amount;
      smallestToFillIngredient = smallestToFillIngredient % 1 > 0.001 ? Math.ceil(smallestToFillIngredient) : Math.floor(smallestToFillIngredient); // Don't round up if it's within .001
      const maxBeforeExceedIngredient = Math.floor(ingredientRange.maximum.amount / productIngredientsByName[ingredientName].amount);
      if (smallestToFill === undefined || smallestToFillIngredient > smallestToFill) {
        smallestToFill = smallestToFillIngredient;
      }
      if (maxBeforeExceed === undefined || maxBeforeExceedIngredient < maxBeforeExceed) {
        maxBeforeExceed = maxBeforeExceedIngredient;
      }
    }
  });
  return smallestToFill === undefined || maxBeforeExceed === undefined ? 1 : smallestToFill > maxBeforeExceed ? maxBeforeExceed : smallestToFill;
};

// TODO return type is same as desiredIngredientRanges
const calculateTargetIngredientRanges = (desiredIngredientRanges: IIngredientRange[], currentRegimenProducts: IRegimenProduct[], products: GetAllProductIngredients_allProducts[]): IIngredientRange[] => {
  const allDosagesDaily = desiredIngredientRanges.every(range => range.frequency === 'DAILY');
  const allRegimenProductDosagesDaily = currentRegimenProducts.every(product => product.frequency === 'DAILY');
  if (!allDosagesDaily || !allRegimenProductDosagesDaily) {
    console.warn('Not all desired dosages are DAILY. Error 38239');
    return [];
  }

  const targetIngredientRanges: IIngredientRange[] = [];
  desiredIngredientRanges.forEach(range => {
    let newMax = range.maximum.amount;
    let newMin = range.minimum.amount;
    currentRegimenProducts.forEach(product => {
      const productIngredients = products[product.id].nutritionFacts.ingredients || [];
      productIngredients.forEach((productIngredient: GetProductIngredients_Product_nutritionFacts_ingredients) => {
        if (productIngredient.ingredientType.name === range.ingredientType.name) {
          if (productIngredient.units === range.units) {
            newMax -= productIngredient.amount * product.numServings;
            newMin -= productIngredient.amount * product.numServings;
          } else {
            console.warn(`Conversions not yet supported ${products[product.id].name}, ${productIngredient.ingredientType.name}`);
          }
        }
      });
    });
    targetIngredientRanges.push({
      ...range,
      minimum: {
        ...range.minimum,
        amount: newMin,
      },
      maximum: {
        ...range.maximum,
        amount: newMax,
      },
    });
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
    amount: deriveIdealQuantityViaLimitingMicros(productIngredients, targetIngredientRanges),
    frequency: 'DAILY',
  };
};