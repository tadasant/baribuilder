import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {ICost} from '../../client-schema-types';

const calculateProjectedRegimenCost = (): ICost => {
  return {
    value: {
      amount: 200.0,
    },
    frequency: FREQUENCY.DAILY,
  }
};

export default calculateProjectedRegimenCost;
