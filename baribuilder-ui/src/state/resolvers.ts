import ApolloClient from 'apollo-client/ApolloClient';
import {IApolloStateShape, IProductLocal} from './defaults';

interface IResolverContext {
  cache: ApolloClient<IApolloStateShape>
}

interface ILocalProductArgs {
  id: string;
}

const resolvers = {
  Query: {
    localProducts: (_: any, args: any, { cache }: IResolverContext): IProductLocal[] => {
      // Get all products
      // Augment them
      return [];
    },
    localProduct: (_: any, args: ILocalProductArgs, { cache }: IResolverContext): IProductLocal => {
      // Get single product w/ args
      // Augment
      return {
        id: 'testid',
        cost: {
          value: {
            amount: 100.00,
          },
          frequency: 'DAILY',
        },
        projectedRegimenCost: {
          value: {
            amount: 100.00,
          },
          frequency: 'DAILY',
        },
        defaultUnitQuantity: 1,
        matchScore: 100.0,
      };
    }
  },
  Mutation: {
    // AddProductToCurrentRegimen(id, qty, units)
    // RemoveProductFromCurrentRegimen(id, qty, units)
    // SetDesiredDosages(...: IDosages[])
  },
};

export default resolvers;
