import ApolloClient from 'apollo-client/ApolloClient';
import {SEARCH_QUERY_QUERY} from '../components/catalog/queries';
import {IApolloStateShape} from './defaults';
import localProductResolvers from './resolvers/clientCatalogProduct';
import AddProductToCurrentRegimen from './resolvers/resolver/mutation/AddProductToCurrentRegimen';
import DeleteCurrentRegimenProductQuantity from './resolvers/resolver/mutation/DeleteCurrentRegimenProductQuantity';
import SetCurrentRegimen from './resolvers/resolver/mutation/SetCurrentRegimen';
import SetCurrentRegimenProductQuantity from './resolvers/resolver/mutation/SetCurrentRegimenProductQuantity';
import SetGoalIngredients from './resolvers/resolver/mutation/SetGoalIngredients';
import SetSearchQuery from './resolvers/resolver/mutation/SetSearchQuery';
import {CURRENT_REGIMEN_QUERY, GOAL_INGREDIENTS_QUERY} from './resolvers/resolver/queries';
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
    // @ts-ignore forces unnecessary nullchecks
    goalIngredients: (obj, args, {cache}) => {
      return cache.readQuery({query: GOAL_INGREDIENTS_QUERY}).goalIngredients;
    },
    // @ts-ignore forces unnecessary nullchecks
    currentRegimen: (obj, args, {cache}) => {
      return cache.readQuery({query: CURRENT_REGIMEN_QUERY}).currentRegimen;
    },
    // @ts-ignore forces unnecessary nullchecks
    searchQuery: (obj, args, {cache}) => {
      return cache.readQuery({query: SEARCH_QUERY_QUERY}).searchQuery;
    },
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
