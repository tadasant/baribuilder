import {cloneDeep, keyBy} from 'lodash';
import {
  GetAllProductsIngredients_allCatalogProducts
} from '../../../typings/gql/GetAllProductsIngredients';
import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {ICost, IIngredientRange, IRegimenIngredient, IRegimenProduct} from '../../client-schema-types';
import {ingredientPricesByName} from '../data/ingredientPrices';

// TODO some sort of standardization for unexpected input handling (e.g. propogate toErrorBoundary)

/**
 * Returns non-range ingredients with the minimum desired as a reference point. If the existing exceeds the
 * minimum, will omit from the results. Assumes minimum of 0 if not set.
 */
export const subtractRegimenIngredientsFromDesiredIngredientRanges = (
  regimenProducts: IRegimenProduct[],
  desiredIngredientRanges: IIngredientRange[],
  products: GetAllProductsIngredients_allCatalogProducts[],
): IRegimenIngredient[] => {
  const regimenIngredientsByName = calculateRegimenIngredients(regimenProducts, products);
  const results: IRegimenIngredient[] = [];

  desiredIngredientRanges.forEach(range => {
    const result = subtractRegimenIngredientFromMinimumIngredient(range, regimenIngredientsByName[range.ingredientType.name]);
    if (result !== null && result.quantity.amount > 0) {
      results.push(result)
    }
  });

  return results;
};

/**
 * Returns the same regimenIngredients minus the aggregate of the ingredients found in product.
 */
export const subtractProductFromRegimenIngredients = (
  regimenIngredients: IRegimenIngredient[],
  product: GetAllProductsIngredients_allCatalogProducts,
): IRegimenIngredient[] => {
  if (product.serving.ingredients === null) {
    console.warn(`Ingredients shouldn\'t be null. Error code 58938238. Product ID: ${product.id}`);
    return [];
  }

  const productIngredientsByName = keyBy(product.serving.ingredients, i => i.ingredientType.name);
  return regimenIngredients.map(regimenIngredient => {
    if (productIngredientsByName.hasOwnProperty(regimenIngredient.ingredientType.name)) {
      if (regimenIngredient.quantity.units === productIngredientsByName[regimenIngredient.ingredientType.name].quantity.units) {
        return {
          ...regimenIngredient,
          quantity: {
            ...regimenIngredient.quantity,
            amount: regimenIngredient.quantity.amount - productIngredientsByName[regimenIngredient.ingredientType.name].quantity.amount,
          }
        }
      } else {
        console.warn('Unit conversions unsupported. Error code 58938238');
      }
    }
    return regimenIngredient;
  })
};

// NB: "project" is a verb here
export const projectCostOfIngredients = (ingredients: IRegimenIngredient[]): ICost => {
  let totalMoney = 0.0;
  const frequency = ingredients.length > 0 ? ingredients[0].frequency : FREQUENCY.DAILY;

  ingredients.forEach(ingredient => {
    if (ingredient.frequency === frequency) {
      const ingredientPrice = ingredientPricesByName[ingredient.ingredientType.name];
      if (ingredientPrice) {
        if (ingredientPrice.units === ingredient.quantity.units) {
          totalMoney += ingredientPrice.price * ingredient.quantity.amount;
        } else {
          console.warn('Unit conversions unsupported. Error code 10493.');
        }
      } else {
        console.warn(`Missing ingredientPrice for ${ingredient.ingredientType.name}`)
      }
    } else {
      console.warn('Frequency conversions unsupported. Error code 10493.');
    }
  });
  return {
    __typename: 'Cost',
    money: totalMoney,
    frequency,
  };
};

export const sumCostOfProducts = (regimenProducts: IRegimenProduct[]): ICost => {
  let totalMoney = 0.0;
  const frequency = regimenProducts.length > 0 ? regimenProducts[0].quantity.frequency : FREQUENCY.DAILY;
  regimenProducts.forEach(product => {
    if (product.quantity.frequency === frequency) {
      totalMoney += product.quantity.number;
    } else {
      console.warn('Frequency conversions unsupported. Error code 69821.');
    }
  });
  return {
    __typename: 'Cost',
    money: totalMoney,
    frequency,
  };
};

export const sumCosts = (...costs: ICost[]): ICost => {
  if (costs.length === 0) {
    return {
      __typename: 'Cost',
      money: 0.0,
      frequency: FREQUENCY.DAILY
    }
  } else if (costs.length === 1) {
    return costs[0];
  } else if (costs.length === 2) {
    if (costs[0].frequency !== costs[1].frequency) {
      console.warn('Frequency conversions unsupported. Error code 09204');
    }

    return {
      ...cloneDeep(costs[0]),
      money: costs[0].money + costs[1].money,
    }
  }

  return sumCosts(costs[0], sumCosts(...costs.slice(1)));
};

/**
 * Below are local helpers. In the weeds.
 */

interface IRegimenIngredientsByName {
  [key: string]: IRegimenIngredient;
}

const calculateRegimenIngredients = (
  regimenProducts: IRegimenProduct[],
  catalogProducts: GetAllProductsIngredients_allCatalogProducts[]
): IRegimenIngredientsByName => {
  const productsById = keyBy(catalogProducts, product => product.id);

  const result: IRegimenIngredientsByName = {};
  regimenProducts.forEach(product => {
    const ingredients = productsById[product.catalogProductId].serving.ingredients;
    if (ingredients !== null) {
      ingredients.forEach(ingredient => {
        const regimenIngredient: IRegimenIngredient = {
          ...cloneDeep(ingredient),
          quantity: {
            ...cloneDeep(ingredient.quantity),
            amount: ingredient.quantity.amount * product.quantity.number,
          },
          frequency: product.quantity.frequency,
        };

        if (!result.hasOwnProperty(ingredient.ingredientType.name)) {
          result[ingredient.ingredientType.name] = regimenIngredient;
        } else {
          const totalRegimenIngredients = sumRegimenIngredients(result[ingredient.ingredientType.name], regimenIngredient);
          if (totalRegimenIngredients !== null) {
            result[ingredient.ingredientType.name] = totalRegimenIngredients;
          }
        }
      })
    } else {
      console.warn(`Ingredients shouldn\'t be null. Error code 589238. Product ID: ${product.catalogProductId}`);
    }
  });

  return result;
};

const sumRegimenIngredients = (baseIngredient: IRegimenIngredient, ...ingredients: IRegimenIngredient[]): IRegimenIngredient => {
  if (ingredients.length === 0) {
    return baseIngredient;
  } else if (ingredients.length === 1) {
    if (baseIngredient.ingredientType.name !== ingredients[0].ingredientType.name) {
      console.error(`${baseIngredient.ingredientType.name} !== ${ingredients[0].ingredientType.name}. This shouldn't happen. Error code 434829.`);
    }
    if (baseIngredient.quantity.units !== ingredients[0].quantity.units) {
      console.warn('Unit conversions unsupported. Error code 434829');
    }

    return {
      ...cloneDeep(baseIngredient),
      quantity: {
        ...cloneDeep(baseIngredient.quantity),
        amount: baseIngredient.quantity.amount + ingredients[0].quantity.amount,
      }
    }
  }

  return sumRegimenIngredients(sumRegimenIngredients(baseIngredient, ingredients[0]), ...ingredients.slice(1));
};

const subtractRegimenIngredientFromMinimumIngredient = (
  range: IIngredientRange,
  regimenIngredient: IRegimenIngredient
): IRegimenIngredient | null => {
  const {minimumQuantity} = range;
  // Assume 0 minimum if not set
  const minimumIngredientQuantityAmount = minimumQuantity === null ? 0 : minimumQuantity.amount;

  if (range.ingredientType.name !== regimenIngredient.ingredientType.name) {
    console.error(`${range.ingredientType.name} !== ${regimenIngredient.ingredientType.name}. This shouldn't happen. Error code 489293.`);
    return null;
  }
  if (range.frequency !== regimenIngredient.frequency) {
    console.warn('Frequency conversions unsupported. Error code 489293.');
    return null;
  }
  if (minimumQuantity !== null) {
    if (minimumQuantity.units !== regimenIngredient.quantity.units) {
      console.warn('Ingredient conversions unsupported. Error code 489293.');
      return null;
    }
  }

  return {
    ...cloneDeep(regimenIngredient),
    quantity: {
      ...cloneDeep(regimenIngredient.quantity),
      amount: minimumIngredientQuantityAmount - regimenIngredient.quantity.amount,
    },
  }
};