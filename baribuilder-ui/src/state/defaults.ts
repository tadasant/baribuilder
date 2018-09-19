import {IRegimen} from './types';

export interface IApolloStateShape {
  currentRegimen: IRegimen;
}

const defaults: IApolloStateShape = {
  currentRegimen: {
    __typename: 'CurrentRegimen',
    products: [],
  },
  // desiredDosages: {
  //   __typename: 'DesiredDosages',
  //   ingredients: [],
  // }
};

export default defaults;
