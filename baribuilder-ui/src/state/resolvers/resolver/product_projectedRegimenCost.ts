import {GetAllProductsIngredients} from '../../../typings/gql/GetAllProductsIngredients';
import {IRegimenCost} from '../../client-schema-types';
import calculateProjectedRegimenCost, {IProductForProjectedRegimenCost} from '../lib/product_projectedRegimenCost';
import {IProductObj, TLocalProductResolverFunc} from '../localProduct';
import costResolver from './product_cost';
import defaultQuantityResolver, {ALL_PRODUCTS_QUERY as ALL_PRODUCTS_INGREDIENTS_QUERY} from './product_defaultQuantity';

/**
 * Query fields need to be prefetched into cache.
 */
const ALL_PRODUCTS_QUERY = ALL_PRODUCTS_INGREDIENTS_QUERY;

const projectedRegimenCostResolver: TLocalProductResolverFunc<IProductObj, IRegimenCost> = (obj, _, {cache}) => {
  //// Grab data
  const allProductsResult: GetAllProductsIngredients | null = cache.readQuery<any, GetAllProductsIngredients>({
    query: ALL_PRODUCTS_QUERY
  });
  // TODO get quantity from local state cache
  const productQuantity = defaultQuantityResolver(obj, _, {cache});
  const productCost = costResolver(obj, _, {cache});

  //// Verify successful grabs
  if (!allProductsResult) {
    console.warn('allProductsResult falsey');
    return null;
  }
  const product = allProductsResult.allProducts.find(product => product.id === obj.id);
  if (!product) {
    console.warn('product not found in allProducts');
    return null;
  }
  if (!productQuantity) {
    console.warn('productQuantity for projection failed');
    return null;
  }
  if (!productCost) {
    console.warn('productCost for projection failed');
    return null;
  }
  // if (!productResult || !productResult.Product || !productResult.Product.nutritionFacts.ingredients) {
  //   console.warn('productResult falsey');
  //   return null;
  // }

  //// Perform transformation

  const productForProjectedRegimenCost: IProductForProjectedRegimenCost = {
    ...product,
    cost: productCost,
    quantity: productQuantity,
  };

  return calculateProjectedRegimenCost(
    productForProjectedRegimenCost
  );
};

export default projectedRegimenCostResolver;
