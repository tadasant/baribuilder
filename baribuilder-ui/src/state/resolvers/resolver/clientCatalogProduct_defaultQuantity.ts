import {GetAllProductsIngredients} from '../../../typings/gql/GetAllProductsIngredients';
import {GetCurrentRegimenProducts} from '../../../typings/gql/GetCurrentRegimenProducts';
import {GetGoalIngredients} from '../../../typings/gql/GetGoalIngredients';
import {GetProductIngredients} from '../../../typings/gql/GetProductIngredients';
import {ICatalogProductQuantity} from '../../client-schema-types';
import {IProductObj, TLocalCatalogProductResolverFunc} from '../clientCatalogProduct';
import {calculateDefaultQuantity} from '../lib/clientCatalogProduct_defaultQuantity';
/**
 * Query fields need to be prefetched into cache.
 */
import {
  ALL_PRODUCTS_INGREDIENTS_QUERY,
  CURRENT_REGIMEN_PRODUCTS_QUERY,
  GOAL_INGREDIENTS_QUERY,
  PRODUCT_INGREDIENTS_QUERY
} from './queries';


const defaultQuantityResolver: TLocalCatalogProductResolverFunc<IProductObj, ICatalogProductQuantity> = (obj, _, {cache}) => {
  //// Grab data
  const catalogProductId = 'id' in obj ? obj.id : obj.catalogProductId;
  const productResult = cache.readQuery<GetProductIngredients>({
    query: PRODUCT_INGREDIENTS_QUERY(catalogProductId)
  });
  const allProductsResult = cache.readQuery<GetAllProductsIngredients>({
    query: ALL_PRODUCTS_INGREDIENTS_QUERY
  });
  const goalIngredientsResult = cache.readQuery<GetGoalIngredients>({
    query: GOAL_INGREDIENTS_QUERY
  });
  const regimenResult = cache.readQuery<GetCurrentRegimenProducts>({
    query: CURRENT_REGIMEN_PRODUCTS_QUERY
  });

  //// Verify successful grabs
  if (!productResult || !productResult.CatalogProduct || !productResult.CatalogProduct.serving.ingredients) {
    console.warn('productResult falsey');
    return null;
  }
  if (!allProductsResult) {
    console.warn('allProductsResult falsey');
    return null;
  }
  if (!goalIngredientsResult || !goalIngredientsResult.goalIngredients || !goalIngredientsResult.goalIngredients.ingredientRanges) {
    console.warn('goalIngredientRanges falsey');
    return null;
  }
  if (!regimenResult || !regimenResult.currentRegimen) {
    console.warn('currentRegimen falsey');
    return null;
  }

  //// Perform transformation
  return calculateDefaultQuantity(
    productResult.CatalogProduct.serving.ingredients,
    allProductsResult.allCatalogProducts,
    goalIngredientsResult.goalIngredients.ingredientRanges,
    regimenResult.currentRegimen.products,
  );
  // TODO write quantity to the cache
};

export default defaultQuantityResolver;
