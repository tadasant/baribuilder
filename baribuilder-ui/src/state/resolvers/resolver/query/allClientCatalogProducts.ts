import gql from 'graphql-tag';
import {GetAllCatalogProductsForClientCatalogProducts} from '../../../../typings/gql/GetAllCatalogProductsForClientCatalogProducts';
// import {CATEGORY} from '../../../../typings/gql/globalTypes';
import {IClientCatalogProduct} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';
import ClientCatalogProductResolver from './ClientCatalogProduct';

const ALL_CATALOG_PRODUCTS_QUERY = gql`
    query GetAllCatalogProductsForClientCatalogProducts {
        allCatalogProducts {
            id
            category
            # TODO could maybe micro optimize this by using a filter arg instead of filtering; but would that induce a cache miss? 
        }
    }
`;

// interface IClientCatalogProductsArgs {
//   category?: CATEGORY;
// }

const allClientCatalogProducts: TResolverFunc<{}, {}, IClientCatalogProduct[]> = (obj, args, {cache}) => {
  const queryResult = cache.readQuery<GetAllCatalogProductsForClientCatalogProducts>({
    query: ALL_CATALOG_PRODUCTS_QUERY,
  });

  if (!queryResult) {
    return [];
  }

  const results: IClientCatalogProduct[] = [];
  const t0 = performance.now(); // TODO delete
  queryResult.allCatalogProducts.forEach(product => {
    // if (!args.category || product.category === args.category) { // invoke category filter
      const clientCatalogProduct = ClientCatalogProductResolver(obj, {catalogProductId: product.id}, {cache});
      if (clientCatalogProduct) {
        results.push(clientCatalogProduct);
      } else {
        console.error('Failed to resolve product. Error code 999134');
      }
    // }
  });
  console.log("Call to resolve client catalog products took " + (performance.now() - t0) + " milliseconds."); // TODO delete
  return results;
};

export default allClientCatalogProducts;
