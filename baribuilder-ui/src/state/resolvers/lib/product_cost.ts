import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {ICost} from '../../client-schema-types';

const calculateCost = (): ICost => {
  return {
    value: {
      amount: 100.0,
    },
    frequency: FREQUENCY.DAILY,
  }
};

export default calculateCost;
