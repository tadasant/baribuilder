import {GetProductForProductCost_Product_listings} from '../../../typings/gql/GetProductForProductCost';
import {ICost, IUnitQuantity} from '../../client-schema-types';

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

const calculateCost = (listings: GetProductForProductCost_Product_listings[], quantity: IUnitQuantity): ICost => {
  if (listings.length === 0) {
    return {
      value: {
        amount: 0.0,
      },
      frequency: quantity.frequency,
    }
  }

  const cheapestCostPerServing = calculateCheapestCostPerServing(listings);

  // Use qty to calculate the amount
  return {
    value: {
      amount: cheapestCostPerServing * quantity.amount,
    },
    frequency: quantity.frequency,
  }
};

export default calculateCost;
