import gql from 'graphql-tag';
import {GetProductForLocal} from '../../typings/gql/GetProductForLocal';
import {IResolverContext, TResolverFunc} from '../resolvers';
import {ICost, IQuantity} from '../types';

// TODO replace with actual query that uses @client
interface IProductQuery {
  id: string;

  [key: string]: any;
}

type TLocalProductResolverFunc<TData> = TResolverFunc<IProductQuery, TData>;

/**
 * Beware that most of these local resolvers require that certain remote data be present in the cache
 */
interface ILocalProductResolvers {
  cost: TLocalProductResolverFunc<ICost>;
  projectedRegimenCost: TLocalProductResolverFunc<ICost>;
  defaultUnitQuantity: TLocalProductResolverFunc<IQuantity>;
  matchScore: TLocalProductResolverFunc<number>;
}

const costResolver: TLocalProductResolverFunc<ICost> = (_, args, {cache}) => {
  return {
    value: {
      amount: 100.0,
    },
    frequency: 'DAILY',
  }
};

const projectedRegimenCostResolver = (_: any, args: any, {cache}: IResolverContext): ICost => {
  return {
    value: {
      amount: 200.0,
    },
    frequency: 'DAILY',
  }
};

const defaultUnitQuantityResolver: TLocalProductResolverFunc<IQuantity> = (obj, args, {cache}) => {
  const query = gql`
      query GetProductForLocal {
          Product(id: "${obj.id}") {
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
  const result: GetProductForLocal | null = cache.readQuery<any, GetProductForLocal>({query});
  const remoteProduct = result === null ? null : result.Product;
  if (remoteProduct === null || remoteProduct === undefined) {
    console.warn('remoteProductData null');
    return null;
  }
  return {
    amount: 1,
    frequency: 'DAILY',
  };
};

const matchScoreResolver = (_: any, args: any, {cache}: IResolverContext): number => {
  return 100.0;
};

const resolvers: ILocalProductResolvers = {
  cost: costResolver,
  projectedRegimenCost: projectedRegimenCostResolver,
  defaultUnitQuantity: defaultUnitQuantityResolver,
  matchScore: matchScoreResolver,
};

export default resolvers;

// export default (_: any, args: ILocalProductArgs, { cache }: IResolverContext): IProductLocal => {
//   const query = gql`
//       query GetProductForLocal {
//           Product(id: "${args.id}") {
//               listings {
//                   price {
//                       amount
//                   }
//               }
//               nutritionFacts {
//                   serving {
//                       count
//                   }
//                   ingredients {
//                       amount
//                       units
//                       ingredientType {
//                           name
//                       }
//                   }
//               }
//           }
//       }
//   `;
//   const remoteProductData: DataProps<GetProductForLocal> | null = cache.readQuery<any, GetProductForLocal>({query});
//   const remoteProduct = remoteProductData === null ? null : remoteProductData.data.Product;
//   if (remoteProduct === null || remoteProduct === undefined) {
//     console.warn('remoteProductData null');
//     return {
//       id: args.id
//     }
//   }
//   return deriveLocalProduct(args, remoteProduct)
// };
