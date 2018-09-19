import ApolloClient from 'apollo-client/ApolloClient';
import {IApolloStateShape} from './defaults';
import localProductResolvers from './resolvers/localProduct';

export interface IResolverContext {
  cache: ApolloClient<IApolloStateShape>
}

export type TResolverFunc<TObj, TData> = (obj: TObj, args: {}, context: IResolverContext) => TData | null;

// TODO is there a way to enforce a remote query so that my local queries don't break if dependent on a remote one wasn't done?
const resolvers = {
  Product: {
    ...localProductResolvers
  },
  // Mutation: {
  // AddProductToCurrentRegimen(id, qty, units)
  // RemoveProductFromCurrentRegimen(id, qty, units)
  // SetDesiredDosages(...: IDosages[])
  // },
};

export default resolvers;
