import {IDesiredDosages, IRegimen} from './types';

export interface IApolloStateShape {
  currentRegimen: IRegimen;
  desiredDosages: IDesiredDosages;
}

const defaults: IApolloStateShape = {
  currentRegimen: {
    __typename: 'CurrentRegimen',
    products: [],
  },
  desiredDosages: {
    __typename: 'DesiredDosages',
    ingredientRanges: [],
  }
};

export default defaults;
