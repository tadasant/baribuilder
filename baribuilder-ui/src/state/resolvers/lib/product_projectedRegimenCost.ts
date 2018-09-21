import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {ICost} from '../../client-schema-types';

const calculateProjectedRegimenCost = (): ICost => {
  return {
    __typename: 'Cost',
    value: {
      __typename: 'Price',
      amount: 200.0,
    },
    frequency: FREQUENCY.DAILY,
  }
};

export default calculateProjectedRegimenCost;
