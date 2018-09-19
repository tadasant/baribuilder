import {ICost} from '../../client-schema-types';
import calculateProjectedRegimenCost from '../lib/product_projectedRegimenCost';
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

const projectedRegimenCostResolver: TLocalProductResolverFunc<ICost> = (obj, _, {cache}) => {
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
  return calculateProjectedRegimenCost();
};

export default projectedRegimenCostResolver;
