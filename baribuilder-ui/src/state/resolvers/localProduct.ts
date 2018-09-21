import {ICost, IUnitQuantity} from '../client-schema-types';
import {TResolverFunc} from '../resolvers';
import costResolver, {ICostArgs} from './resolver/product_cost';
import defaultUnitQuantityResolver from './resolver/product_defaultUnitQuantity';
import matchScoreResolver from './resolver/product_matchScore';
import projectedRegimenCostResolver from './resolver/product_projectedRegimenCost';

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

export type TLocalProductResolverFunc<TData, TArgs = {}> = TResolverFunc<IProductQuery, TArgs, TData>;

/**
 * Beware that most of these local resolvers require that certain remote data be present in the cache.
 */
interface ILocalProductResolvers {
  cost: TLocalProductResolverFunc<ICost, ICostArgs>;
  projectedRegimenCost: TLocalProductResolverFunc<ICost>;
  defaultUnitQuantity: TLocalProductResolverFunc<IUnitQuantity>;
  matchScore: TLocalProductResolverFunc<number>;
}


const resolvers: ILocalProductResolvers = {
  cost: costResolver,
  projectedRegimenCost: projectedRegimenCostResolver,
  defaultUnitQuantity: defaultUnitQuantityResolver,
  matchScore: matchScoreResolver,
};

export default resolvers;
