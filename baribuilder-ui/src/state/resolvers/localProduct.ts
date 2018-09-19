import gql from 'graphql-tag';
import {DataProps} from 'react-apollo/types';
import {GetProductForLocal, GetProductForLocal_Product} from '../../typings/gql/GetProductForLocal';
import {IResolverContext} from '../resolvers';
import {IProductLocal, IQuantity} from '../types';

interface ILocalProductArgs {
  id: string;
  quantity?: IQuantity;
}

const calculateDefaultUnitQuantity = (remoteProduct: GetProductForLocal_Product): IQuantity => {
  return {
    amount: 1,
    frequency: 'DAILY',
  };
};

const calculateDailyCostValue = (remoteProduct: GetProductForLocal_Product, quantity: IQuantity): number => {
  return 100.0;
};

const calculateProjectedRegimenCostDailyValueAmount = (remoteProduct: GetProductForLocal_Product, quantity: IQuantity): number => {
  return 200.0;
};

const calculateMatchScore = (remoteProduct: GetProductForLocal_Product): number => {
  return 100.0;
};

export const deriveLocalProduct = (args: ILocalProductArgs, remoteProduct: GetProductForLocal_Product): IProductLocal => {
  const defaultUnitQuantity = calculateDefaultUnitQuantity(remoteProduct);
  return {
    id: args.id,
    cost: {
      value: {
        amount: calculateDailyCostValue(remoteProduct, args.quantity || defaultUnitQuantity),
      },
      frequency: 'DAILY',
    },
    projectedRegimenCost: {
      value: {
        amount: calculateProjectedRegimenCostDailyValueAmount(remoteProduct, args.quantity || defaultUnitQuantity),
      },
      frequency: 'DAILY',
    },
    defaultUnitQuantity,
    matchScore: calculateMatchScore(remoteProduct),
  }
};

export default (_: any, args: ILocalProductArgs, blah: IResolverContext): IProductLocal => {
  const cache = blah.cache;
  const query = gql`
      query GetProductForLocal {
          Product(id: "${args.id}") {
              listings {
                  price {
                      amount
                  }
              }
              nutritionFacts {
                  serving {
                      count
                  }
                  ingredients {
                      amount
                      units
                      ingredientType {
                          name
                      }
                  }
              }
          }
      }
  `;
  const remoteProductData: DataProps<GetProductForLocal> | null = cache.readQuery<any, GetProductForLocal>({query});
  const remoteProduct = remoteProductData === null ? null : remoteProductData.data.Product;
  if (remoteProduct === null || remoteProduct === undefined) {
    console.warn('remoteProductData null');
    return {
      id: args.id
    }
  }
  return deriveLocalProduct(args, remoteProduct)
};
