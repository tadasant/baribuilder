import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {IRegimenCost, QUANTITY_UNITS} from '../../client-schema-types';

const calculateProjectedRegimenCost = (): IRegimenCost => {
  return {
    __typename: 'RegimenCost',
    numRemainingProducts: 0,
    cost: {
      __typename: 'Cost',
      value: 200.0,
      quantity: {
        __typename: 'Quantity',
        units: QUANTITY_UNITS.SERVINGS,
        frequency: FREQUENCY.DAILY,
        number: 0.0,
      },
    }
  }
};

export default calculateProjectedRegimenCost;
