import gql from 'graphql-tag';
import {GetProductForProductCost} from '../../../typings/gql/GetProductForProductCost';
import {GetProductIngredients} from '../../../typings/gql/GetProductIngredients';
import {ICost} from '../../client-schema-types';
import calculateCost from '../lib/product_cost';
import {IProductObj, TLocalProductResolverFunc} from '../localProduct';
import quantityResolver from './product_quantity';

/**
 * Query fields need to be prefetched into cache.
 */
const PRODUCT_QUERY = (id: string) => gql`
    query GetProductForProductCost {
        CatalogProduct(id: "${id}"){
            listings {
                price {
                    amount
                }
                numServings
            }
        }
    }
`;

const costResolver: TLocalProductResolverFunc<IProductObj, ICost> = (obj, _, {cache}) => {
  const catalogProductId = 'id' in obj ? obj.id : obj.catalogProductId;
  // Grab data
  const productResult: GetProductForProductCost | null = cache.readQuery<any, GetProductIngredients>({
    query: PRODUCT_QUERY(catalogProductId)
  });
  const quantity = quantityResolver(obj, _, {cache});

  //// Verify required data is present
  if (!productResult || !productResult.CatalogProduct || !productResult.CatalogProduct.listings) {
    console.warn('productResult falsey');
    return null;
  }
  if (quantity === null) {
    console.warn('quantity falsey');
    return null;
  }

  //// Perform transformation
  return calculateCost(productResult.CatalogProduct.listings, quantity);
};

export default costResolver;
