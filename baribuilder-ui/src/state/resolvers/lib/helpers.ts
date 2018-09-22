import {cloneDeep, keyBy} from 'lodash';
import {GetAllProductsIngredients_allProducts} from '../../../typings/gql/GetAllProductsIngredients';
import {FREQUENCY, INGREDIENT_UNITS} from '../../../typings/gql/globalTypes';
import {ICost, IIngredient, IIngredientRange, IRegimenProduct, QUANTITY_UNITS} from '../../client-schema-types';
import {IProductForProjectedRegimenCost} from './product_projectedRegimenCost';


const calculateRegimenIngredients = (
  regimenProducts: IRegimenProduct[],
  products: GetAllProductsIngredients_allProducts[]
): IIngredient[] => {
  const productsById = keyBy(products, product => product.id);

  interface IIngredientsByName {
    [key: string]: IIngredient;
  }

  const regimenIngredientsByName: IIngredientsByName = {};
  regimenProducts.forEach(product => {
    const ingredients = productsById[product.id].nutritionFacts.ingredients;
    if (ingredients !== null) {
      ingredients.forEach(ingredient => {
        if (!regimenIngredientsByName.hasOwnProperty(ingredient.ingredientType.name)) {
          regimenIngredientsByName[ingredient.ingredientType.name] = cloneDeep(ingredient);
        } else {
          regimenIngredientsByName[ingredient.ingredientType.name] = addIngredients(regimenIngredientsByName[ingredient.ingredientType.name], ingredient);
        }
      })
    } else {
      console.warn(`Ingredients shouldn\'t be null. Error code 589238. Product ID: ${product.id}`);
    }
  });

  return Object.keys(regimenIngredientsByName).map(k => regimenIngredientsByName[k]);
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
  const regimenIngredients = calculateRegimenIngredients(regimenProducts, products);
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

const addIngredients = (...ingredients: IIngredient[]): IIngredient => {
  // TODO
  return {
    __typename: 'Ingredient',
    amount: 0.0,
    ingredientType: {
      __typename: 'IngredientType',
      name: 'Vitamin A',
    },
    units: INGREDIENT_UNITS.G
  }
};