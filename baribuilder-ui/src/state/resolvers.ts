import ApolloClient from 'apollo-client/ApolloClient';
import {IApolloStateShape} from './defaults';
import localProductResolvers from './resolvers/clientCatalogProduct';
import AddProductToCurrentRegimen from './resolvers/resolver/mutation/AddProductToCurrentRegimen';
import DeleteCurrentRegimenProductQuantity from './resolvers/resolver/mutation/DeleteCurrentRegimenProductQuantity';
import SetCurrentRegimen from './resolvers/resolver/mutation/SetCurrentRegimen';
import SetCurrentRegimenProductQuantity from './resolvers/resolver/mutation/SetCurrentRegimenProductQuantity';
import SetGoalIngredients from './resolvers/resolver/mutation/SetGoalIngredients';
import SetSearchQuery from './resolvers/resolver/mutation/SetSearchQuery';
import allClientCatalogProducts from './resolvers/resolver/query/allClientCatalogProducts';
import ClientCatalogProduct from './resolvers/resolver/query/ClientCatalogProduct';

export interface IResolverContext {
  cache: ApolloClient<IApolloStateShape>
}

export type TResolverFunc<TObj, TArgs, TData> = (obj: TObj, args: TArgs, context: IResolverContext, info?: any) => TData | null;

const resolvers = {
  Query: {
    allClientCatalogProducts,
    ClientCatalogProduct,
  },
  CatalogProduct: {
    ...localProductResolvers
  },
  Mutation: {
    AddProductToCurrentRegimen,
    SetGoalIngredients,
    SetCurrentRegimen,
    SetCurrentRegimenProductQuantity,
    DeleteCurrentRegimenProductQuantity,
    SetSearchQuery,
  },
};

export default resolvers;
