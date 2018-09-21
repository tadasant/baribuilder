import gql from 'graphql-tag';
import {GetProductForProductCost} from '../../../typings/gql/GetProductForProductCost';
import {ICost, IUnitQuantity} from '../../client-schema-types';
import calculateCost from '../lib/product_cost';
import {TLocalProductResolverFunc} from '../localProduct';

/**
 * Can pass these args
 */
export interface ICostArgs {
  quantity?: IUnitQuantity; // If not present, use defaultUnitQuantity
}

const PRODUCT_QUERY = (id: string) => gql`
    query GetProductForProductCost {
        Product(id: "${id}"){
            listings {
                price {
                    amount
                }
                numServings
            }
            defaultUnitQuantity @client {
                amount
                frequency
            }
        }
    }
`;

const costResolver: TLocalProductResolverFunc<ICost, ICostArgs> = (obj, args, {cache}) => {
  //// Grab data
  const productResult: GetProductForProductCost | null = cache.readQuery<any, GetProductForProductCost>({
    query: PRODUCT_QUERY(obj.id)
  });

  //// Verify successful grabs
  if (!productResult || !productResult.Product || !productResult.Product.listings) {
    console.warn('productResult falsey');
    return null;
  }

  //// Perform transformation
  return calculateCost(productResult.Product.listings, args.quantity || productResult.Product.defaultUnitQuantity);
};

export default costResolver;
