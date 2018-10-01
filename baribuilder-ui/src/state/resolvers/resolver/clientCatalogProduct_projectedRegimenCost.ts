import {GetAllProductsIngredients} from '../../../typings/gql/GetAllProductsIngredients';
import {GetCurrentRegimenProducts} from '../../../typings/gql/GetCurrentRegimenProducts';
import {GetDesiredIngredients} from '../../../typings/gql/GetDesiredIngredients';
import {IRegimenCost, IRegimenProduct} from '../../client-schema-types';
import {IProductObj, TLocalCatalogProductResolverFunc} from '../clientCatalogProduct';
import calculateProjectedRegimenCost, {IProductForProjectedRegimenCost} from '../lib/clientCatalogProduct_projectedRegimenCost';
import costResolver from './clientCatalogProduct_cost';
import quantityResolver from './clientCatalogProduct_defaultQuantity';
/**
 * Query fields need to be prefetched into cache.
 */
import {ALL_PRODUCTS_INGREDIENTS_QUERY, CURRENT_REGIMEN_PRODUCTS_QUERY, DESIRED_INGREDIENTS_QUERY} from './queries';


const projectedRegimenCostResolver: TLocalCatalogProductResolverFunc<IProductObj, IRegimenCost> = (obj, _, {cache}) => {
    //// Grab data
    const allCatalogProductsResult = cache.readQuery<GetAllProductsIngredients>({
      query: ALL_PRODUCTS_INGREDIENTS_QUERY
    });
    const productQuantity = quantityResolver(obj, _, {cache});
    const productCost = costResolver(obj, _, {cache});
    const desiredIngredientsResult = cache.readQuery<GetDesiredIngredients>({
      query: DESIRED_INGREDIENTS_QUERY
    });
    const currentRegimenProductsResult = cache.readQuery<GetCurrentRegimenProducts>({
      query: CURRENT_REGIMEN_PRODUCTS_QUERY
    });

    //// Verify successful grabs
    if (!allCatalogProductsResult) {
      console.warn('allCatalogProductsResult falsey');
      return null;
    }
    const catalogProductId = 'id' in obj ? obj.id : obj.catalogProductId;
    const product = allCatalogProductsResult.allCatalogProducts.find(p => p.id === catalogProductId);
    if (!product) {
      console.warn('product not found in allCatalogProducts');
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
        console.warn(`Unable to derive cost for ${p.catalogProductId}. Error code 39293`);
      } else {
        currentRegimenProducts.push({
          ...p,
          cost: {
            __typename: 'RegimenProductCost',
            frequency: cost.frequency,
            money: cost.money,
          },
        })
      }
    });

    return calculateProjectedRegimenCost(
      productForProjectedRegimenCost,
      desiredIngredientsResult.desiredIngredients.ingredientRanges,
      currentRegimenProducts,
      allCatalogProductsResult.allCatalogProducts,
    );
  }
;

export default projectedRegimenCostResolver;
