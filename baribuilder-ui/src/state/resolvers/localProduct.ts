import {IResolverContext, TResolverFunc} from '../resolvers';
import {ICost, IUnitQuantity} from '../types';
import defaultUnitQuantityResolver from './resolver/product_defaultUnitQuantity';

// TODO replace with actual query that uses @client (this is used in the client side `obj` arg for resolvers)
interface IProductQuery {
  id: string;

  [key: string]: any;
}

export type TLocalProductResolverFunc<TData> = TResolverFunc<IProductQuery, TData>;

/**
 * Beware that most of these local resolvers require that certain remote data be present in the cache.
 */
interface ILocalProductResolvers {
  cost: TLocalProductResolverFunc<ICost>;
  projectedRegimenCost: TLocalProductResolverFunc<ICost>;
  defaultUnitQuantity: TLocalProductResolverFunc<IUnitQuantity>;
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
