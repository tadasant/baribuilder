import {GetAllProductIngredients_allProducts} from '../../../typings/gql/GetAllProductIngredients';

import {GetProductIngredients_Product_nutritionFacts_ingredients} from '../../../typings/gql/GetProductIngredients';
import {IUnitQuantity} from '../../types';
import {keyBy} from 'lodash';

// Returns the ideal number of servings of this product for the given target
// Will give you the least amount that fulfills the most micronutrients without exceeding any
const deriveIdealQuantityViaLimitingMicros = (
  productIngredients: GetProductIngredients_Product_nutritionFacts_ingredients[],
  targetIngredientRanges: any[],
): number => {
  const productIngredientsByName = keyBy(productIngredients, (o: GetProductIngredients_Product_nutritionFacts_ingredients) => o.ingredientType.name);
  let smallestToFill: number | undefined = undefined;
  let maxBeforeExceed: number | undefined = undefined;

  targetIngredientRanges.forEach(ingredientRange => {
    const ingredientName = ingredientRange.ingredientType.name;
    if (productIngredientsByName.hasOwnProperty(ingredientName)) {
      let smallestToFillIngredient = ingredientRange.minimum / productIngredientsByName[ingredientName].amount;
      smallestToFillIngredient = smallestToFillIngredient % 1 > 0.001 ? Math.ceil(smallestToFillIngredient) : Math.floor(smallestToFillIngredient); // Don't round up if it's within .001
      const maxBeforeExceedIngredient = Math.floor(ingredientRange.maximum / productIngredientsByName[ingredientName].amount);
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
const calculateTargetDosages = (desiredIngredientRanges: any[], currentRegimenProducts: any[], products: GetAllProductIngredients_allProducts): any[] => {
  // Assert that all desired dosages are daily
  return desiredIngredientRanges;
};

export const calculateDefaultUnitQuantity = (
  productIngredients: GetProductIngredients_Product_nutritionFacts_ingredients[],
  products: GetAllProductIngredients_allProducts[],
  desiredIngredientRanges: any[],
  currentRegimenProducts: any[]
): IUnitQuantity => {
  const targetIngredientRanges = calculateTargetDosages(desiredIngredientRanges, currentRegimenProducts, products);
  return {
    amount: deriveIdealQuantityViaLimitingMicros(productIngredients, targetIngredientRanges),
    frequency: 'DAILY',
  };
};