import {GetAllProductsIngredients} from '../../../typings/gql/GetAllProductsIngredients';
import {GetCurrentRegimenProducts} from '../../../typings/gql/GetCurrentRegimenProducts';
import {GetDesiredIngredients} from '../../../typings/gql/GetDesiredIngredients';
import {IRegimenCost, IRegimenProduct} from '../../client-schema-types';
import calculateProjectedRegimenCost, {IProductForProjectedRegimenCost} from '../lib/product_projectedRegimenCost';
import {IProductObj, TLocalProductResolverFunc} from '../localProduct';
import costResolver from './product_cost';
import defaultQuantityResolver from './product_defaultQuantity';
/**
 * Query fields need to be prefetched into cache.
 */
import {ALL_PRODUCTS_INGREDIENTS_QUERY, CURRENT_REGIMEN_PRODUCTS_QUERY, DESIRED_INGREDIENTS_QUERY} from './queries';


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
    const currentRegimenProductsResult = cache.readQuery<GetCurrentRegimenProducts>({
      query: CURRENT_REGIMEN_PRODUCTS_QUERY
    });

    //// Verify successful grabs
    if (!allProductsResult) {
      console.warn('allProductsResult falsey');
      return null;
    }
    const product = allProductsResult.allProducts.find(p => p.id === obj.id);
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
    if (!currentRegimenProductsResult || !currentRegimenProductsResult.currentRegimen) {
      console.warn('currentRegimenProductsResult falsey');
      return null;
    }

    if (desiredIngredientsResult.desiredIngredients.ingredientRanges.length === 0) {
      // Can't predict a regimen cost without desiredIngredients
      return null;
    }

    //// Perform transformation
    const productForProjectedRegimenCost: IProductForProjectedRegimenCost = {
      ...product,
      cost: productCost,
      quantity: productQuantity,
    };
    const currentRegimenProducts: IRegimenProduct[] = [];
    currentRegimenProductsResult.currentRegimen.products.forEach(p => {
      const cost = costResolver(p, _, {cache});
      if (cost === null) {
        console.warn(`Unable to derive cost for ${p.id}. Error code 39293`);
      } else {
        currentRegimenProducts.push({
          ...p,
          cost,
        })
      }
    });

    return calculateProjectedRegimenCost(
      productForProjectedRegimenCost,
      desiredIngredientsResult.desiredIngredients.ingredientRanges,
      currentRegimenProducts,
      allProductsResult.allProducts,
    );
  }
;

export default projectedRegimenCostResolver;
