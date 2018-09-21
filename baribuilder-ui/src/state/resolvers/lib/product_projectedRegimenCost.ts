import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {ICost} from '../../client-schema-types';

const calculateProjectedRegimenCost = (): ICost => {
  return {
    __typename: 'Cost',
    value: 200.0,
    frequency: FREQUENCY.DAILY,
  }
};

export default calculateProjectedRegimenCost;
