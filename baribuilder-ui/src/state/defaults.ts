import {FREQUENCY, INGREDIENT_QUANTITY_UNITS} from '../typings/gql/globalTypes';
import {IClientCatalogProduct, IDesiredIngredients, IRegimen} from './client-schema-types';

export interface IApolloStateShape {
  currentRegimen: IRegimen;
  desiredIngredients: IDesiredIngredients;
  clientCatalogProducts: IClientCatalogProduct[];
}

const defaults: IApolloStateShape = {
  currentRegimen: {
    __typename: 'Regimen',
    products: [],
  },
  desiredIngredients: {
    __typename: 'DesiredIngredients',
    ingredientRanges: [{
      __typename: 'IngredientRange',
      ingredientTypeName: 'Vitamin A',
      frequency: FREQUENCY.DAILY,
      maximumAmount: 2.0,
      units: INGREDIENT_QUANTITY_UNITS.IU,
      minimumAmount: 1.0,
    }],
  },
  clientCatalogProducts: [],
};

export default defaults;
