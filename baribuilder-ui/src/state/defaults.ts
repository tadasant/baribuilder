import {IClientCatalogProduct, IGoalIngredients, IRegimen} from './client-schema-types';

export interface IApolloStateShape {
  currentRegimen: IRegimen;
  goalIngredients: IGoalIngredients;
  clientCatalogProducts: IClientCatalogProduct[];
  // Navigation / builder filter
  searchQuery: string;
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
  searchQuery: '',
};

export default defaults;
