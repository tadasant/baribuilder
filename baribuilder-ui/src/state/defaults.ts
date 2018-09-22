import {IDesiredIngredientRanges, IRegimen} from './client-schema-types';

export interface IApolloStateShape {
  currentRegimen: IRegimen;
  desiredIngredientRanges: IDesiredIngredientRanges;
}

const defaults: IApolloStateShape = {
  currentRegimen: {
    __typename: 'Regimen',
    products: [],
  },
  desiredIngredientRanges: {
    __typename: 'DesiredIngredientRanges',
    ingredientRanges: [],
  }
};

export default defaults;
