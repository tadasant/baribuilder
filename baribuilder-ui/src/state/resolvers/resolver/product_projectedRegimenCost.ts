import {GetAllProductsIngredients} from '../../../typings/gql/GetAllProductsIngredients';
import {GetDesiredIngredients} from '../../../typings/gql/GetDesiredIngredients';
import {IRegimenCost} from '../../client-schema-types';
import calculateProjectedRegimenCost, {IProductForProjectedRegimenCost} from '../lib/product_projectedRegimenCost';
import {IProductObj, TLocalProductResolverFunc} from '../localProduct';
import costResolver from './product_cost';
import defaultQuantityResolver from './product_defaultQuantity';
/**
 * Query fields need to be prefetched into cache.
 */
import {ALL_PRODUCTS_INGREDIENTS_QUERY, DESIRED_INGREDIENTS_QUERY} from './queries';


const projectedRegimenCostResolver: TLocalProductResolverFunc<IProductObj, IRegimenCost> = (obj, _, {cache}) => {
  //// Grab data
  const allProductsResult = cache.readQuery<GetAllProductsIngredients>({
    query: ALL_PRODUCTS_INGREDIENTS_QUERY
  });
  // TODO get quantity from local state cache
  const productQuantity = defaultQuantityResolver(obj, _, {cache});
  const productCost = costResolver(obj, _, {cache});
  const desiredIngredientsResult = cache.readQuery<GetDesiredIngredients>({
    query: DESIRED_INGREDIENTS_QUERY
  });
  // const currentRegimenProducts =

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
  if (!desiredIngredientsResult || !desiredIngredientsResult.desiredIngredients) {
    console.warn('desiredIngredientsResult falsey');
    return null;
  }

  //// Perform transformation

  const productForProjectedRegimenCost: IProductForProjectedRegimenCost = {
    ...product,
    cost: productCost,
    quantity: productQuantity,
  };

  return calculateProjectedRegimenCost(
    productForProjectedRegimenCost,
    desiredIngredientsResult.desiredIngredients.ingredientRanges,
    // TODO
    [],
    allProductsResult.allProducts,
  );
};

export default projectedRegimenCostResolver;
