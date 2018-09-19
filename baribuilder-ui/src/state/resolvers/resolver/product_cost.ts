import {ICost} from '../../client-schema-types';
import calculateCost from '../lib/product_cost';
import {TLocalProductResolverFunc} from '../localProduct';

// TODO queries

// const CURRENT_REGIMEN_QUERY = gql`
//     query GetCurrentRegimen {
//         currentRegimen @client {
//             products {
//                 id
//                 numServings
//                 frequency
//             }
//         }
//     }
// `;

const costResolver: TLocalProductResolverFunc<ICost> = (obj, _, {cache}) => {
  //// Grab data
  // const productResult: GetProductIngredients | null = cache.readQuery<any, GetProductIngredients>({
  //   query: PRODUCT_INGREDIENTS_QUERY(obj.id)
  // });

  //// Verify successful grabs
  // if (!productResult || !productResult.Product || !productResult.Product.nutritionFacts.ingredients) {
  //   console.warn('productResult falsey');
  //   return null;
  // }

  //// Perform transformation
  return calculateCost();
};

export default costResolver;
