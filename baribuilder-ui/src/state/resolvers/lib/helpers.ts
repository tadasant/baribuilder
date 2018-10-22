import {cloneDeep, keyBy} from 'lodash';
import {GetAllProductsIngredients_allCatalogProducts} from '../../../typings/gql/GetAllProductsIngredients';
import {FREQUENCY, INGREDIENT_QUANTITY_UNITS, PRODUCT_QUANTITY_UNITS} from '../../../typings/gql/globalTypes';
import {ICatalogProductCost, IIngredientRange, IRegimenProduct, IRegimenProductCost} from '../../client-schema-types';
import {ingredientPricesByName} from '../data/ingredientPrices';
import {IProductForCostEffectivenessRating} from './clientCatalogProduct_costEffectivenessRating';

// TODO some sort of standardization for unexpected input handling (e.g. propogate toErrorBoundary)

// Holds the amount of an ingredient aggregated across a regimen
export interface IRegimenIngredient {
  frequency: FREQUENCY;
  amount: number;
  units: INGREDIENT_QUANTITY_UNITS;
  ingredientTypeName: string;
}

/**
 * Returns non-range ingredients with the minimum goal as a reference point. If the existing exceeds the
 * minimum, will omit from the results. Assumes minimum of 0 if not set.
 */
export const subtractRegimenIngredientsFromGoalIngredientRanges = (
  regimenProducts: IRegimenProduct[],
  goalIngredientRanges: IIngredientRange[],
  products: GetAllProductsIngredients_allCatalogProducts[],
): IRegimenIngredient[] => {
  const regimenIngredientsByName = calculateRegimenIngredients(regimenProducts, products);
  const results: IRegimenIngredient[] = [];

  goalIngredientRanges.forEach(range => {
    let result: IRegimenIngredient | null = null;
    if (regimenIngredientsByName.hasOwnProperty(range.ingredientTypeName)) {
      result = subtractRegimenIngredientFromMinimumIngredient(range, regimenIngredientsByName[range.ingredientTypeName])
    } else if (range.minimumAmount) {
      result = {
        ingredientTypeName: range.ingredientTypeName,
        units: range.units,
        amount: range.minimumAmount,
        frequency: range.frequency,
      }
    }
    if (result !== null && result.amount > 0) {
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
  product: IProductForCostEffectivenessRating,
): IRegimenIngredient[] => {
  if (product.serving.ingredients === null) {
    console.warn(`Ingredients shouldn\'t be null. Error code 58938238. Product ID: ${product.id}`);
    return [];
  }

  const productIngredientsByName = keyBy(product.serving.ingredients, i => i.ingredientType.name);
  return regimenIngredients.map(regimenIngredient => {
    if (productIngredientsByName.hasOwnProperty(regimenIngredient.ingredientTypeName)) {
      if (regimenIngredient.units === productIngredientsByName[regimenIngredient.ingredientTypeName].quantity.units) {
        if (product.quantity.units === PRODUCT_QUANTITY_UNITS.SERVINGS) {
          if (product.quantity.frequency === regimenIngredient.frequency) {
            return {
              ...regimenIngredient,
              amount: regimenIngredient.amount - (productIngredientsByName[regimenIngredient.ingredientTypeName].quantity.amount * product.quantity.amount),
            }
          } else {
            console.warn('Frequency conversions unsupported. Error code 58938238');
            console.warn(`Product ID: ${product.id}. Ingredient: ${regimenIngredient.ingredientTypeName}. ${regimenIngredient.frequency} vs. ${product.quantity.frequency}`)
          }
        } else {
          console.warn('Quantity unit conversions unsupported. Error code 58938238');
        }
      } else {
        console.warn('Unit conversions unsupported. Error code 58938238');
        console.warn(`Product ID: ${product.id}. Ingredient: ${regimenIngredient.ingredientTypeName}. ${regimenIngredient.units} vs. ${productIngredientsByName[regimenIngredient.ingredientTypeName].quantity.units}`)
      }
    }
    return regimenIngredient;
  }).filter(regimenIngredient => regimenIngredient.amount > 0)
};

// NB: "project" is a verb here
export const projectCostOfIngredients = (ingredients: IRegimenIngredient[]): IRegimenProductCost => {
  let totalMoney = 0.0;
  const frequency = ingredients.length > 0 ? ingredients[0].frequency : FREQUENCY.DAILY;

  ingredients.forEach(ingredient => {
    if (ingredient.frequency === frequency) {
      const ingredientPrice = ingredientPricesByName[ingredient.ingredientTypeName];
      if (ingredientPrice) {
        if (ingredientPrice.units === ingredient.units) {
          totalMoney += ingredientPrice.price * ingredient.amount;
        } else {
          console.warn('Unit conversions unsupported. Error code 10493.');
        }
      } else {
        console.warn(`Missing ingredientPrice for ${ingredient.ingredientTypeName}`)
      }
    } else {
      console.warn('Frequency conversions unsupported. Error code 10493.');
    }
  });
  return {
    __typename: 'RegimenProductCost',
    money: totalMoney,
    frequency,
  };
};

export const sumCostOfProducts = (regimenProducts: IRegimenProduct[]): IRegimenProductCost => {
  let totalMoney = 0.0;
  const frequency = regimenProducts.length > 0 ? regimenProducts[0].quantity.frequency : FREQUENCY.DAILY;
  regimenProducts.forEach(product => {
    if (product.quantity.frequency === frequency) {
      totalMoney += (product.cost.money * product.quantity.amount);
    } else {
      console.warn('Frequency conversions unsupported. Error code 69821.');
    }
  });
  return {
    __typename: 'RegimenProductCost',
    money: totalMoney,
    frequency,
  };
};

export const sumCosts = (...costs: Array<ICatalogProductCost | IRegimenProductCost>): ICatalogProductCost => {
  if (costs.length === 0) {
    return {
      __typename: 'CatalogProductCost',
      money: 0.0,
      frequency: FREQUENCY.DAILY
    }
  } else if (costs.length === 1) {
    return {
      __typename: 'CatalogProductCost',
      money: costs[0].money,
      frequency: costs[0].frequency,
    };
  } else if (costs.length === 2) {
    if (costs[0].frequency !== costs[1].frequency) {
      console.warn('Frequency conversions unsupported. Error code 09204');
    }

    return {
      __typename: 'CatalogProductCost',
      money: costs[0].money + costs[1].money,
      frequency: costs[0].frequency,
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

export const calculateRegimenIngredients = (
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
          ingredientTypeName: ingredient.ingredientType.name,
          amount: ingredient.quantity.amount * product.quantity.amount,
          units: ingredient.quantity.units,
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
    if (baseIngredient.ingredientTypeName !== ingredients[0].ingredientTypeName) {
      console.error(`${baseIngredient.ingredientTypeName} !== ${ingredients[0].ingredientTypeName}. This shouldn't happen. Error code 434829.`);
    }
    if (baseIngredient.units !== ingredients[0].units) {
      console.warn(`Unit conversions unsupported (${baseIngredient.units} vs. ${ingredients[0].units} for ${baseIngredient.ingredientTypeName}). Error code 434829`);
    }

    return {
      ...cloneDeep(baseIngredient),
      amount: baseIngredient.amount + ingredients[0].amount,
    }
  }

  return sumRegimenIngredients(sumRegimenIngredients(baseIngredient, ingredients[0]), ...ingredients.slice(1));
};

const subtractRegimenIngredientFromMinimumIngredient = (
  range: IIngredientRange,
  regimenIngredient: IRegimenIngredient
): IRegimenIngredient | null => {
  const {minimumAmount} = range;
  // Assume 0 minimum if not set
  const minimumIngredientQuantityAmount = minimumAmount === null ? 0 : minimumAmount;

  if (range.ingredientTypeName !== regimenIngredient.ingredientTypeName) {
    console.error(`${range.ingredientTypeName} !== ${regimenIngredient.ingredientTypeName}. This shouldn't happen. Error code 489293.`);
    return null;
  }
  if (range.frequency !== regimenIngredient.frequency) {
    console.warn('Frequency conversions unsupported. Error code 489293.');
    return null;
  }
  if (minimumAmount !== null) {
    if (range.units !== regimenIngredient.units) {
      console.warn('Ingredient conversions unsupported. Error code 489293.');
      return null;
    }
  }

  return {
    ...cloneDeep(regimenIngredient),
    amount: minimumIngredientQuantityAmount - regimenIngredient.amount,
  }
};