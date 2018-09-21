import {ICost, IUnitQuantity} from '../../client-schema-types';
import {IListingForProductCost} from '../resolver/product_cost';

const calculateCheapestCostPerServing = (listings: IListingForProductCost[]): number => {
  let cheapestCostPerServing: number | undefined = undefined;

  listings.forEach(listing => {
    const nextCostPerServing = listing.price.amount / listing.numServings;
    if (cheapestCostPerServing === undefined || nextCostPerServing < cheapestCostPerServing) {
      cheapestCostPerServing = nextCostPerServing;
    }
  });

  return cheapestCostPerServing || 0;
};

const calculateCost = (listings: IListingForProductCost[], quantity: IUnitQuantity): ICost => {
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
