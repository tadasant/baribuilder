import calculateMatchScore from '../lib/product_matchScore';
import {IProductObj, TLocalCatalogProductResolverFunc} from '../clientCatalogProduct';

// TODO queries

// const CURRENT_REGIMEN_PRODUCTS_QUERY = gql`
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

const matchScoreResolver: TLocalCatalogProductResolverFunc<IProductObj, number> = (obj, _, {cache}) => {
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
  return calculateMatchScore();
};

export default matchScoreResolver;
