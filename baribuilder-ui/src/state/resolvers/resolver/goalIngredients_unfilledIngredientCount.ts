import {GetAllProductsIngredients} from '../../../typings/gql/GetAllProductsIngredients';
import {GetCurrentRegimenProducts} from '../../../typings/gql/GetCurrentRegimenProducts';
import {GetGoalIngredients} from '../../../typings/gql/GetGoalIngredients';
import {TResolverFunc} from '../../resolvers';
import {subtractRegimenIngredientsFromGoalIngredientRanges} from '../lib/helpers';
/**
 * Query fields need to be prefetched into cache.
 */
import {ALL_PRODUCTS_INGREDIENTS_QUERY, CURRENT_REGIMEN_PRODUCTS_QUERY, GOAL_INGREDIENTS_QUERY} from './queries';


const unfilledIngredientCountResolver: TResolverFunc<{}, {}, number> = (obj, _, {cache}) => {
    //// Grab data
    const allCatalogProductsResult = cache.readQuery<GetAllProductsIngredients>({
      query: ALL_PRODUCTS_INGREDIENTS_QUERY
    });
    const goalIngredientsResult = cache.readQuery<GetGoalIngredients>({
      query: GOAL_INGREDIENTS_QUERY
    });
    const currentRegimenProductsResult = cache.readQuery<GetCurrentRegimenProducts>({
      query: CURRENT_REGIMEN_PRODUCTS_QUERY
    });

    //// Verify successful grabs
    if (!allCatalogProductsResult) {
      console.warn('allCatalogProductsResult falsey');
      return null;
    }
    if (!goalIngredientsResult || !goalIngredientsResult.goalIngredients) {
      console.warn('goalIngredientsResult falsey');
      return null;
    }
    if (!currentRegimenProductsResult || !currentRegimenProductsResult.currentRegimen) {
      console.warn('currentRegimenProductsResult falsey');
      return null;
    }

    if (goalIngredientsResult.goalIngredients.ingredientRanges.length === 0) {
      return 0;
    }

    //// Perform transformation
    const targetRegimenIngredients = subtractRegimenIngredientsFromGoalIngredientRanges(currentRegimenProductsResult.currentRegimen.products, goalIngredientsResult.goalIngredients.ingredientRanges, allCatalogProductsResult.allCatalogProducts);
    const remainingRegimenIngredients = targetRegimenIngredients.filter(ingredient => ingredient.amount > 0);
    return remainingRegimenIngredients.length;
  }
;

export default unfilledIngredientCountResolver;
