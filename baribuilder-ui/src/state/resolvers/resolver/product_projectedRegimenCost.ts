import {GetAllProductsIngredients} from '../../../typings/gql/GetAllProductsIngredients';
import {IRegimenCost} from '../../client-schema-types';
import calculateProjectedRegimenCost from '../lib/product_projectedRegimenCost';
import {IProductObj, TLocalProductResolverFunc} from '../localProduct';
import {ALL_PRODUCTS_QUERY as ALL_PRODUCTS_INGREDIENTS_QUERY} from './product_defaultQuantity';

/**
 * Query fields need to be prefetched into cache.
 */
const ALL_PRODUCTS_QUERY = ALL_PRODUCTS_INGREDIENTS_QUERY;

const projectedRegimenCostResolver: TLocalProductResolverFunc<IProductObj, IRegimenCost> = (obj, _, {cache}) => {
  //// Grab data
  const allProductsResult: GetAllProductsIngredients | null = cache.readQuery<any, GetAllProductsIngredients>({
    query: ALL_PRODUCTS_QUERY
  });

  //// Verify successful grabs
  if (!allProductsResult) {
    console.warn('allProductsResult falsey');
    return null;
  }
  // if (!productResult || !productResult.Product || !productResult.Product.nutritionFacts.ingredients) {
  //   console.warn('productResult falsey');
  //   return null;
  // }

  //// Perform transformation
  return calculateProjectedRegimenCost();
};

export default projectedRegimenCostResolver;
