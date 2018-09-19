import ApolloClient from 'apollo-client/ApolloClient';
import {IApolloStateShape} from './defaults';
import localProduct from './resolvers/localProduct';
import localProducts from './resolvers/localProducts';

export interface IResolverContext {
  cache: ApolloClient<IApolloStateShape>
}

const resolvers = {
  Query: {
    localProducts,
    localProduct,
  },
  Product: {
    extraInfo: (obj: any, args: any, context: any) => {
      return 'hello';
    }
  },
  // Mutation: {
  // AddProductToCurrentRegimen(id, qty, units)
  // RemoveProductFromCurrentRegimen(id, qty, units)
  // SetDesiredDosages(...: IDosages[])
  // },
};

export default resolvers;
