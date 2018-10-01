import {IClientCatalogProduct, IGoalIngredients, IRegimen} from './client-schema-types';

export interface IApolloStateShape {
  currentRegimen: IRegimen;
  goalIngredients: IGoalIngredients;
  clientCatalogProducts: IClientCatalogProduct[];
}

const defaults: IApolloStateShape = {
  currentRegimen: {
    __typename: 'Regimen',
    products: [],
  },
  goalIngredients: {
    __typename: 'GoalIngredients',
    ingredientRanges: [],
  },
  clientCatalogProducts: [],
};

export default defaults;
