import gql from 'graphql-tag';
import {GetAllCatalogProductsForClientCatalogProducts} from '../../../../typings/gql/GetAllCatalogProductsForClientCatalogProducts';
import {IClientCatalogProduct} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';
import ClientCatalogProductResolver from './ClientCatalogProduct';

const ALL_CATALOG_PRODUCTS_QUERY = gql`
    query GetAllCatalogProductsForClientCatalogProducts {
        allCatalogProducts {
            id
        }
    }
`;

const allClientCatalogProducts: TResolverFunc<{}, {}, IClientCatalogProduct[]> = (obj, args, {cache}) => {
  const queryResult = cache.readQuery<GetAllCatalogProductsForClientCatalogProducts>({
    query: ALL_CATALOG_PRODUCTS_QUERY,
  });

  if (!queryResult) {
    return [];
  }

  const results: IClientCatalogProduct[] = [];
  queryResult.allCatalogProducts.forEach(product => {
    const clientCatalogProduct = ClientCatalogProductResolver(obj, {catalogProductId: product.id}, {cache});
    if (clientCatalogProduct) {
      results.push(clientCatalogProduct);
    }
  });
  return results;
};

export default allClientCatalogProducts;
