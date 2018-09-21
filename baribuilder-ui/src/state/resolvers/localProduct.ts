import {ICost, IQuantity, IRegimenCost} from '../client-schema-types';
import {TResolverFunc} from '../resolvers';
import costResolver from './resolver/product_cost';
import defaultQuantityResolver from './resolver/product_defaultQuantity';
import matchScoreResolver from './resolver/product_matchScore';
import projectedRegimenCostResolver from './resolver/product_projectedRegimenCost';

/**
 * Used for ensuring that the @client resolvers (presumably called after the remote ones) have access to
 * upstream properties to do their resolution.
 *
 * Basically a hacky way to do args, since they don't get passed down.
 */
export interface IProductObj {
  id: string;
}

export type TLocalProductResolverFunc<IRemoteObj, IResultData> = TResolverFunc<IRemoteObj, {}, IResultData>;

/**
 * Beware that most of these local resolvers require that certain remote data be present in the cache.
 */
interface ILocalProductResolvers {
  cost: TLocalProductResolverFunc<IProductObj, ICost>;
  projectedRegimenCost: TLocalProductResolverFunc<IProductObj, IRegimenCost>;
  defaultQuantity: TLocalProductResolverFunc<IProductObj, IQuantity>;
  matchScore: TLocalProductResolverFunc<IProductObj, number>;
}


const resolvers: ILocalProductResolvers = {
  cost: costResolver,
  projectedRegimenCost: projectedRegimenCostResolver,
  defaultQuantity: defaultQuantityResolver,
  matchScore: matchScoreResolver,
};

export default resolvers;
