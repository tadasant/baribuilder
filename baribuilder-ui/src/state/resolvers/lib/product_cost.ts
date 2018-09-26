import {GetProductForProductCost_CatalogProduct_listings} from '../../../typings/gql/GetProductForProductCost';
import {ICatalogProductCost, ICatalogProductQuantity} from '../../client-schema-types';

const calculateCheapestCostPerServing = (listings: GetProductForProductCost_CatalogProduct_listings[]): number => {
  let cheapestCostPerServing: number | undefined = undefined;

  listings.forEach(listing => {
    const nextCostPerServing = listing.price.amount / listing.numServings;
    if (cheapestCostPerServing === undefined || nextCostPerServing < cheapestCostPerServing) {
      cheapestCostPerServing = nextCostPerServing;
    }
  });

  return cheapestCostPerServing || 0;
};

const calculateCost = (listings: GetProductForProductCost_CatalogProduct_listings[], quantity: ICatalogProductQuantity): ICatalogProductCost => {
  if (listings.length === 0) {
    return {
      __typename: 'CatalogProductCost',
      money: 0.0,
      frequency: quantity.frequency,
    }
  }

  const cheapestCostPerServing = calculateCheapestCostPerServing(listings);

  // Use qty to calculate the amount
  return {
    __typename: 'CatalogProductCost',
    money: cheapestCostPerServing * quantity.amount,
    frequency: quantity.frequency,
  }
};

export default calculateCost;
