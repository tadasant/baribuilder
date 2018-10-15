import {IClientCatalogProduct, IGoalIngredients, IRegimen, ISearchQuery} from './client-schema-types';

export interface IApolloStateShape {
  currentRegimen: IRegimen;
  goalIngredients: IGoalIngredients;
  clientCatalogProducts: IClientCatalogProduct[];
  // Navigation / builder filter
  searchQuery: ISearchQuery;
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
  searchQuery: {
    __typename: 'SearchQuery',
    value: '',
  },
};

export default defaults;
