import {ICost, IProductQuantity, IRegimenCost} from '../client-schema-types';
import {TResolverFunc} from '../resolvers';
import costResolver from './resolver/product_cost';
import matchScoreResolver from './resolver/product_matchScore';
import projectedRegimenCostResolver from './resolver/product_projectedRegimenCost';
import quantityResolver from './resolver/product_quantity';

/**
 * Used for ensuring that the @client resolvers (presumably called after the remote ones) have access to
 * upstream properties to do their resolution.
 *
 * Basically a hacky way to do args, since they don't get passed down.
 */
export interface ICatalogProductObj {
  id: string;
}

export interface IRegimenProductObj {
  catalogProductId: string;
}

export type IProductObj = ICatalogProductObj | IRegimenProductObj;

export type TLocalProductResolverFunc<IRemoteObj, IResultData> = TResolverFunc<IRemoteObj, {}, IResultData>;

/**
 * Beware that most of these local resolvers require that certain remote data be present in the cache.
 */
interface ILocalProductResolvers {
  cost: TLocalProductResolverFunc<IProductObj, ICost>;
  projectedRegimenCost: TLocalProductResolverFunc<IProductObj, IRegimenCost>;
  quantity: TLocalProductResolverFunc<IProductObj, IProductQuantity>;
  matchScore: TLocalProductResolverFunc<IProductObj, number>;
}


const resolvers: ILocalProductResolvers = {
  cost: costResolver,
  projectedRegimenCost: projectedRegimenCostResolver,
  quantity: quantityResolver,
  matchScore: matchScoreResolver,
};

export default resolvers;
