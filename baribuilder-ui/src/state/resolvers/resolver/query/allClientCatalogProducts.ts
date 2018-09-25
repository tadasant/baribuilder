import gql from 'graphql-tag';
import {GetAllCatalogProductsForClientCatalogProducts} from '../../../../typings/gql/GetAllCatalogProductsForClientCatalogProducts';
import {IClientCatalogProduct} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';
import costResolver from '../clientCatalogProduct_cost';
import matchScoreResolver from '../clientCatalogProduct_matchScore';
import projectedRegimenCostResolver from '../clientCatalogProduct_projectedRegimenCost';
import quantityResolver from '../clientCatalogProduct_quantity';

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
    const cost = costResolver({catalogProductId: product.id}, {}, {cache});
    const projectedRegimenCost = projectedRegimenCostResolver({catalogProductId: product.id}, {}, {cache});
    const quantity = quantityResolver({catalogProductId: product.id}, {}, {cache});
    const matchScore = matchScoreResolver({catalogProductId: product.id}, {}, {cache});
    // TODO look into returning resolvers directly
    if (cost !== null && quantity !== null && matchScore !== null) {
      results.push({
        __typename: 'ClientCatalogProduct',
        catalogProductId: product.id,
        cost,
        projectedRegimenCost: projectedRegimenCost || undefined,
        quantity,
        matchScore,
      })
    }
  });
  return results;
};

export default allClientCatalogProducts;
