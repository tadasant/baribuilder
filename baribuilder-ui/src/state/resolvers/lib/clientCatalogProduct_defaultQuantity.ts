import {keyBy} from 'lodash';
import {GetAllProductsIngredients_allCatalogProducts} from '../../../typings/gql/GetAllProductsIngredients';

import {GetProductIngredients_CatalogProduct_serving_ingredients} from '../../../typings/gql/GetProductIngredients';
import {FREQUENCY, PRODUCT_QUANTITY_UNITS} from '../../../typings/gql/globalTypes';
import {ICatalogProductQuantity, IIngredientRange, IRegimenProduct} from '../../client-schema-types';
import {subtractRegimenIngredientsFromGoalIngredientRanges} from './helpers';

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

// TODO this concept is misnamed; it's the unfilled ingredient count PLUS filled ingredients irrelevant to the product
const calculateRemainingUnfilledIngredientCount = (
  currentRegimenProducts: IRegimenProduct[],
  goalIngredientRanges: IIngredientRange[],
  allCatalogProducts: GetAllProductsIngredients_allCatalogProducts[],
  productIngredients: GetProductIngredients_CatalogProduct_serving_ingredients[],
  productCount: number,
  frequency: FREQUENCY,
  units: PRODUCT_QUANTITY_UNITS,
  catalogProductId: string,
): number => {
  const additionalProduct: IRegimenProduct = {
    __typename: 'RegimenProduct',
    catalogProductId,
    quantity: {
      __typename: 'RegimenProductQuantity',
      amount: productCount,
      frequency,
      units,
    },
    // cost won't be used in this prospective calculation
    cost: {
      __typename: 'RegimenProductCost',
      money: 0.0,
      frequency: FREQUENCY.DAILY,
    },
  };
  // TODO this is horribly inefficient, looping so many times
  const catalogProductsById = keyBy(allCatalogProducts, product => product.id);
  const targetRegimenIngredients = subtractRegimenIngredientsFromGoalIngredientRanges([...currentRegimenProducts, additionalProduct], goalIngredientRanges, allCatalogProducts);
  const remainingRegimenIngredients = targetRegimenIngredients.filter(ingredient => ingredient.amount > 0);
  let remainingCount = 0;
  remainingRegimenIngredients.forEach(ingredient => {
    const goalReference = goalIngredientRanges.find(range => range.ingredientTypeName === ingredient.ingredientTypeName);
    const productIngredients = catalogProductsById[catalogProductId].serving.ingredients;
    const productContainsIngredient = Boolean(productIngredients && productIngredients.find(i => i.ingredientType.name === ingredient.ingredientTypeName));
    if (goalReference && productContainsIngredient) {
      const minimumReference = goalReference.minimumAmount || 1; // should be >0 i.e. || 1 should never be invoked
      remainingCount += ingredient.amount / minimumReference;
    } else {
      remainingCount += 1;
    }
  });
  return remainingCount;
};

export const calculateDefaultQuantity = (
  catalogProductId: string,
  productIngredients: GetProductIngredients_CatalogProduct_serving_ingredients[],
  products: GetAllProductsIngredients_allCatalogProducts[],
  goalIngredientRanges: IIngredientRange[],
  currentRegimenProducts: IRegimenProduct[]
): ICatalogProductQuantity => {
  const targetIngredientRanges = calculateTargetIngredientRanges(goalIngredientRanges, currentRegimenProducts, products);
  const calculatedAmount = deriveIdealQuantityViaLimitingMicros(productIngredients, targetIngredientRanges);
  const amount = calculatedAmount > 0 ? calculatedAmount : 1;
  const frequency = FREQUENCY.DAILY;
  const units = PRODUCT_QUANTITY_UNITS.SERVINGS;
  const remainingUnfilledIngredientCount = calculateRemainingUnfilledIngredientCount(currentRegimenProducts, goalIngredientRanges, products, productIngredients, amount, frequency, units, catalogProductId);
  return {
    __typename: 'CatalogProductQuantity',
    amount,
    units,
    frequency,
    remainingUnfilledIngredientCount,
  };
};