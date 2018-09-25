import ApolloClient from 'apollo-client/ApolloClient';
import {IApolloStateShape} from './defaults';
import localProductResolvers from './resolvers/clientCatalogProduct';
import AddProductToCurrentRegimen from './resolvers/resolver/mutation/AddProductToCurrentRegimen';
import allClientCatalogProducts from './resolvers/resolver/query/allClientCatalogProducts';

export interface IResolverContext {
  cache: ApolloClient<IApolloStateShape>
}

export type TResolverFunc<TObj, TArgs, TData> = (obj: TObj, args: TArgs, context: IResolverContext) => TData | null;

// TODO is there a way to make a remote query call within local resolver so my dependent things don't break if not present in cache?
const resolvers = {
  Query: {
    allClientCatalogProducts,
  },
  CatalogProduct: {
    ...localProductResolvers
  },
  Mutation: {
    AddProductToCurrentRegimen,
  // RemoveProductFromCurrentRegimen(id, qty, units)
  // SetDesiredIngredientRanges(...: I)
  },
};

export default resolvers;
