import gql from 'graphql-tag';
import {GetProductForProductCost} from '../../../typings/gql/GetProductForProductCost';
import {GetProductIngredients} from '../../../typings/gql/GetProductIngredients';
import {ICatalogProductCost} from '../../client-schema-types';
import {IProductObj, TLocalCatalogProductResolverFunc} from '../clientCatalogProduct';
import calculateCost from '../lib/clientCatalogProduct_cost';
import quantityResolver from './clientCatalogProduct_defaultQuantity';

/**
 * Query fields need to be prefetched into cache.
 */
const PRODUCT_QUERY = (id: string) => gql`
    query GetProductForProductCost {
        CatalogProduct(id: "${id}"){
            id
            
            packages {
                id
                listings {
                    price {
                        amount
                    }
                }
                numServings
            }
        }
    }
`;

const costResolver: TLocalCatalogProductResolverFunc<IProductObj, ICatalogProductCost> = (obj, _, {cache}) => {
  const catalogProductId = 'id' in obj ? obj.id : obj.catalogProductId;
  // Grab data
  const productResult: GetProductForProductCost | null = cache.readQuery<any, GetProductIngredients>({
    query: PRODUCT_QUERY(catalogProductId)
  });
  const quantity = quantityResolver(obj, _, {cache});

  //// Verify required data is present
  if (!productResult || !productResult.CatalogProduct || !productResult.CatalogProduct.packages) {
    console.warn('productResult falsey');
    return null;
  }
  if (quantity === null) {
    console.warn('quantity falsey');
    return null;
  }

  //// Perform transformation
  return calculateCost(productResult.CatalogProduct.packages, quantity);
};

export default costResolver;
