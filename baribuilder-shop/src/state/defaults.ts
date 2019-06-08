import {IClientCatalogProduct, IGoalIngredients, IRegimen, ISearchQuery} from './client-schema-types';

export interface IApolloStateShape {
  currentRegimen: IRegimen;
  goalIngredients: IGoalIngredients;
  clientCatalogProducts: IClientCatalogProduct[];
  // Navigation / builder filter
  searchQuery: ISearchQuery;
}

export const storeDefaults: IApolloStateShape = {
  currentRegimen: {
    __typename: 'Regimen',
    products: [
      // {
      //   __typename: 'RegimenProduct',
      //   cost: {
      //     __typename: 'RegimenProductCost',
      //     frequency: FREQUENCY.DAILY,
      //     money: 1.0
      //   },
      //   quantity: {
      //     __typename: 'RegimenProductQuantity',
      //     amount: 5,
      //     units: PRODUCT_QUANTITY_UNITS.SERVINGS,
      //     frequency: FREQUENCY.DAILY
      //   },
      //   catalogProductId: 'cjm0tbtko00560179xhyj5uju',
      // }, {
      //   __typename: 'RegimenProduct',
      //   cost: {
      //     __typename: 'RegimenProductCost',
      //     frequency: FREQUENCY.DAILY,
      //     money: 1.0
      //   },
      //   quantity: {
      //     __typename: 'RegimenProductQuantity',
      //     amount: 5,
      //     units: PRODUCT_QUANTITY_UNITS.SERVINGS,
      //     frequency: FREQUENCY.DAILY
      //   },
      //   catalogProductId: 'cjm0tbtko00560179xhyj5uju',
      // },
      // {
      //   __typename: 'RegimenProduct',
      //   cost: {
      //     __typename: 'RegimenProductCost',
      //     frequency: FREQUENCY.DAILY,
      //     money: 1.0
      //   },
      //   quantity: {
      //     __typename: 'RegimenProductQuantity',
      //     amount: 5,
      //     units: PRODUCT_QUANTITY_UNITS.SERVINGS,
      //     frequency: FREQUENCY.DAILY
      //   },
      //   catalogProductId: 'cjm0tbtko00560179xhyj5uju',
      // }, {
      //   __typename: 'RegimenProduct',
      //   cost: {
      //     __typename: 'RegimenProductCost',
      //     frequency: FREQUENCY.DAILY,
      //     money: 1.0
      //   },
      //   quantity: {
      //     __typename: 'RegimenProductQuantity',
      //     amount: 5,
      //     units: PRODUCT_QUANTITY_UNITS.SERVINGS,
      //     frequency: FREQUENCY.DAILY
      //   },
      //   catalogProductId: 'cjm0tbtko00560179xhyj5uju',
      // }
    ],
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

export default storeDefaults;
