import gql from 'graphql-tag';
import {GetProductForProductCost} from '../../../typings/gql/GetProductForProductCost';
import {GetProductIngredients} from '../../../typings/gql/GetProductIngredients';
import {ICost} from '../../client-schema-types';
import calculateCost from '../lib/product_cost';
import {IProductObj, TLocalProductResolverFunc} from '../localProduct';
import defaultQuantityResolver from './product_defaultQuantity';

/**
 * Query fields need to be prefetched into cache.
 */
const PRODUCT_QUERY = (id: string) => gql`
    query GetProductForProductCost {
        Product(id: "${id}"){
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

  // Grab data
  const productResult: GetProductForProductCost | null = cache.readQuery<any, GetProductIngredients>({
    query: PRODUCT_QUERY(obj.id)
  });
  // TODO get quantity from local state cache
  const quantity = defaultQuantityResolver(obj, _, {cache});

  //// Verify required data is present
  if (!productResult || !productResult.Product || !productResult.Product.listings) {
    console.warn('productResult falsey');
    return null;
  }
  if (quantity === null) {
    console.warn('quantity falsey');
    return null;
  }

  //// Perform transformation
  return calculateCost(productResult.Product.listings, quantity);
};

export default costResolver;
