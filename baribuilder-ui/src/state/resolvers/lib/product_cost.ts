import {GetProductForProductCost_Product_listings} from '../../../typings/gql/GetProductForProductCost';
import {ICost, IQuantity} from '../../client-schema-types';

const calculateCheapestCostPerServing = (listings: GetProductForProductCost_Product_listings[]): number => {
  let cheapestCostPerServing: number | undefined = undefined;

  listings.forEach(listing => {
    const nextCostPerServing = listing.price.amount / listing.numServings;
    if (cheapestCostPerServing === undefined || nextCostPerServing < cheapestCostPerServing) {
      cheapestCostPerServing = nextCostPerServing;
    }
  });

  return cheapestCostPerServing || 0;
};

const calculateCost = (listings: GetProductForProductCost_Product_listings[], quantity: IQuantity): ICost => {
  if (listings.length === 0) {
    return {
      __typename: 'Cost',
      value: 0.0,
      frequency: quantity.frequency,
    }
  }

  const cheapestCostPerServing = calculateCheapestCostPerServing(listings);

  // Use qty to calculate the amount
  return {
    __typename: 'Cost',
    value: cheapestCostPerServing * quantity.number,
    frequency: quantity.frequency,
  }
};

export default calculateCost;
