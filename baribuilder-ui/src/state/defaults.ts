import {FREQUENCY, PRODUCT_QUANTITY_UNITS} from '../typings/gql/globalTypes';
import {IClientCatalogProduct, IDesiredIngredients, IRegimen} from './client-schema-types';

export interface IApolloStateShape {
  currentRegimen: IRegimen;
  desiredIngredients: IDesiredIngredients;
  clientCatalogProducts: IClientCatalogProduct[];
}

const defaults: IApolloStateShape = {
  currentRegimen: {
    __typename: 'Regimen',
    products: [
      {
        __typename: 'RegimenProduct',
        catalogProductId: 'cjm0rzfrj1sdp0138x3hhr3us',
        quantity: {
          amount: 5,
          __typename: 'RegimenProductQuantity',
          frequency: FREQUENCY.DAILY,
          units: PRODUCT_QUANTITY_UNITS.SERVINGS,
        },
        cost: {
          __typename: 'RegimenProductCost',
          money: 50.4,
          frequency: FREQUENCY.MONTHLY,
        }
      },
    ],
  },
  desiredIngredients: {
    __typename: 'DesiredIngredients',
    ingredientRanges: [],
  },
  clientCatalogProducts: [],
};

export default defaults;
