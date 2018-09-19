import {FREQUENCY} from '../../typings/gql/globalTypes';
import {ICost, IUnitQuantity} from '../client-schema-types';
import {IResolverContext, TResolverFunc} from '../resolvers';
import defaultUnitQuantityResolver from './resolver/product_defaultUnitQuantity';

/**
 * Used for ensuring that the @client resolvers (presumably called after the remote ones) have access to
 * upstream properties to do their calculations.
 *
 * Basically a hacky way to do args, since they don't get passed down.
 */
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
    frequency: FREQUENCY.DAILY,
  }
};

const projectedRegimenCostResolver = (_: any, args: any, {cache}: IResolverContext): ICost => {
  return {
    value: {
      amount: 200.0,
    },
    frequency: FREQUENCY.DAILY,
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
