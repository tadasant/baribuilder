import {ICatalogProductCost, ICatalogProductQuantity} from '../client-schema-types';
import {TResolverFunc} from '../resolvers';
import costResolver from './resolver/clientCatalogProduct_cost';
import costEffectivenessRatingResolver from './resolver/clientCatalogProduct_costEffectivenessRating';
import quantityResolver from './resolver/clientCatalogProduct_defaultQuantity';
import matchScoreResolver from './resolver/clientCatalogProduct_matchScore';

/**
 * Used for ensuring that the @client resolvers (presumably called after the remote ones) have access to
 * upstream properties to do their resolution.
 *
 * Basically a hacky way to do args, since they don't get passed down.
 */
export interface IClientCatalogProductObj {
  id: string;
}

export interface IRegimenProductObj {
  catalogProductId: string;
}

export type IProductObj = IClientCatalogProductObj | IRegimenProductObj;

export type TLocalCatalogProductResolverFunc<IRemoteObj, IResultData> = TResolverFunc<IRemoteObj, {}, IResultData>;

/**
 * Beware that most of these local resolvers require that certain remote data be present in the cache.
 */
interface IClientCatalogProductResolvers {
  cost: TLocalCatalogProductResolverFunc<IProductObj, ICatalogProductCost>;
  costEffectivenessRating: TLocalCatalogProductResolverFunc<IProductObj, number>;
  quantity: TLocalCatalogProductResolverFunc<IProductObj, ICatalogProductQuantity>;
  matchScore: TLocalCatalogProductResolverFunc<IProductObj, number>;
}


const resolvers: IClientCatalogProductResolvers = {
  cost: costResolver,
  costEffectivenessRating: costEffectivenessRatingResolver,
  quantity: quantityResolver,
  matchScore: matchScoreResolver,
};

export default resolvers;
