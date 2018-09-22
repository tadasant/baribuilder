import {cloneDeep, keyBy} from 'lodash';
import {GetAllProductsIngredients_allProducts} from '../../../typings/gql/GetAllProductsIngredients';
import {FREQUENCY, INGREDIENT_UNITS} from '../../../typings/gql/globalTypes';
import {
  ICost,
  IIngredient,
  IIngredientRange,
  IRegimenIngredient,
  IRegimenProduct,
  QUANTITY_UNITS
} from '../../client-schema-types';
import {IProductForProjectedRegimenCost} from './product_projectedRegimenCost';


interface IRegimenIngredientsByName {
  [key: string]: IRegimenIngredient;
}

/**
 * RegimenIngredient, as opposed to ingredient, adds the following enhancements in the context of a regimen:
 *
 * 1) Removes concept of products so we're only looking at discrete ingredients
 * 2) Removes concept of quantity of each product so we're only looking at aggregations of ingredients
 * 3) The above removals are captured in the "amount"
 * 4) Adds concept of "frequency", since regimens are taken on a cadence
 */
const calculateRegimenIngredients = (
  regimenProducts: IRegimenProduct[],
  products: GetAllProductsIngredients_allProducts[]
): IRegimenIngredientsByName => {
  const productsById = keyBy(products, product => product.id);

  const result: IRegimenIngredientsByName = {};
  regimenProducts.forEach(product => {
    const ingredients = productsById[product.id].nutritionFacts.ingredients;
    if (ingredients !== null) {
      ingredients.forEach(ingredient => {
        const regimenIngredient: IRegimenIngredient = {
          ...cloneDeep(ingredient),
          amount: ingredient.amount * product.quantity.number,
          frequency: product.quantity.frequency,
        };

        if (!result.hasOwnProperty(ingredient.ingredientType.name)) {
          result[ingredient.ingredientType.name] = regimenIngredient;
        } else {
          result[ingredient.ingredientType.name] = addRegimenIngredients(result[ingredient.ingredientType.name], regimenIngredient);
        }
      })
    } else {
      console.warn(`Ingredients shouldn\'t be null. Error code 589238. Product ID: ${product.id}`);
    }
  });

  return result;
};

/**
 * Returns non-range ingredients with the minimum desired as a reference point. If the existing exceeds the
 * minimum, will omit from the results.
 */
export const subtractRegimenIngredientsFromDesiredIngredientRanges = (
  regimenProducts: IRegimenProduct[],
  desiredIngredientRanges: IIngredientRange[],
  products: GetAllProductsIngredients_allProducts[],
): IIngredient[] => {
  // const regimenIngredientsByName = calculateRegimenIngredients(regimenProducts, products);
  // const result = [];
  //
  // desiredIngredientRanges.forEach(range => {
  //   result.push(subtractIngredientFromDosage(range.minimumDosage, ))
  //   const
  //   let remainingIngredient = range.minimumDosage;
  // })
  // TODO
  return [];
};

export const subtractProductFromIngredients = (
  ingredients: IIngredient[],
  product: IProductForProjectedRegimenCost,
): IIngredient[] => {
  // TODO
  return [];
};

// NB: "project" is a verb here
export const projectCost = (remainingIngredients: IIngredient[]): ICost => {
  // TODO
  return {
    __typename: 'Cost',
    value: 0.0,
    quantity: {
      __typename: 'Quantity',
      number: 5,
      frequency: FREQUENCY.DAILY,
      units: QUANTITY_UNITS.SERVINGS,
    }
  };
};

export const calculateRegimenCost = (regimenProducts: IRegimenProduct[]): ICost => {
  // TODO
  return {
    __typename: 'Cost',
    value: 0.0,
    quantity: {
      __typename: 'Quantity',
      number: 5,
      frequency: FREQUENCY.DAILY,
      units: QUANTITY_UNITS.SERVINGS,
    }
  };
};

export const addCosts = (...costs: ICost[]): ICost => {
  // TODO
  return {
    __typename: 'Cost',
    value: 0.0,
    quantity: {
      __typename: 'Quantity',
      number: 5,
      frequency: FREQUENCY.DAILY,
      units: QUANTITY_UNITS.SERVINGS,
    }
  };
};

const addRegimenIngredients = (...ingredients: IRegimenIngredient[]): IRegimenIngredient => {
  // TODO
  return {
    __typename: 'RegimenIngredient',
    frequency: FREQUENCY.DAILY,
    amount: 0.0,
    ingredientType: {
      __typename: 'IngredientType',
      name: 'Vitamin A',
    },
    units: INGREDIENT_UNITS.G
  }
};