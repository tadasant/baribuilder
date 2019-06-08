import {GetProductForProductCost_CatalogProduct_packages} from '../../../typings/gql/GetProductForProductCost';
import {ICatalogProductCost, ICatalogProductQuantity} from '../../client-schema-types';

const calculateCheapestCostPerServing = (packages: GetProductForProductCost_CatalogProduct_packages[]): number => {
  let cheapestCostPerServing: number | undefined = undefined;

  packages.forEach(pkg => {
    if (!pkg.listings || pkg.listings.length !== 1) {
      console.warn(`Unexpected length of listings (${pkg.id}). Error code 95921893`);
      return;
    }
    const nextCostPerServing = pkg.listings[0].price.amount / pkg.numServings;
    if (cheapestCostPerServing === undefined || nextCostPerServing < cheapestCostPerServing) {
      cheapestCostPerServing = nextCostPerServing;
    }
  });

  return cheapestCostPerServing || 0;
};

const calculateCost = (packages: GetProductForProductCost_CatalogProduct_packages[], quantity: ICatalogProductQuantity): ICatalogProductCost => {
  if (packages.length === 0) {
    return {
      __typename: 'CatalogProductCost',
      money: 0.0,
      frequency: quantity.frequency,
    }
  }

  const cheapestCostPerServing = calculateCheapestCostPerServing(packages);

  // Use qty to calculate the amount
  return {
    __typename: 'CatalogProductCost',
    money: cheapestCostPerServing * quantity.amount,
    frequency: quantity.frequency,
  }
};

export default calculateCost;
