import ApolloClient from 'apollo-client/ApolloClient';
import {IApolloStateShape} from './defaults';
import localProductResolvers from './resolvers/clientCatalogProduct';

export interface IResolverContext {
  cache: ApolloClient<IApolloStateShape>
}

export type TResolverFunc<TObj, TArgs, TData> = (obj: TObj, args: TArgs, context: IResolverContext) => TData | null;

// TODO is there a way to make a remote query call within local resolver so my dependent things don't break if not present in cache?
const resolvers = {
  CatalogProduct: {
    ...localProductResolvers
  },
  Mutation: {
    // AddProductToCurrentRegimen: (_: any, args: , context): boolean => true,
  // RemoveProductFromCurrentRegimen(id, qty, units)
  // SetDesiredIngredientRanges(...: I)
  },
};

export default resolvers;
