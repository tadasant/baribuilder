import {IDesiredIngredients, IRegimen} from './client-schema-types';

export interface IApolloStateShape {
  currentRegimen: IRegimen;
  desiredIngredients: IDesiredIngredients;
}

const defaults: IApolloStateShape = {
  currentRegimen: {
    __typename: 'Regimen',
    products: [],
  },
  desiredIngredients: {
    __typename: 'DesiredIngredients',
    ingredientRanges: [],
  }
};

export default defaults;
