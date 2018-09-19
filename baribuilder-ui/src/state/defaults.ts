import {IDesiredDosages, IRegimen} from './client-schema-types';

export interface IApolloStateShape {
  currentRegimen: IRegimen;
  desiredDosages: IDesiredDosages;
}

const defaults: IApolloStateShape = {
  currentRegimen: {
    __typename: 'Regimen',
    products: [],
  },
  desiredDosages: {
    __typename: 'DesiredDosages',
    ingredientRanges: [],
  }
};

export default defaults;
