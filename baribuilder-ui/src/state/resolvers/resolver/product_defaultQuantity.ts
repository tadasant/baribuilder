import gql from 'graphql-tag';
import {GetAllProductsIngredients} from '../../../typings/gql/GetAllProductsIngredients';
import {GetCurrentRegimen} from '../../../typings/gql/GetCurrentRegimen';
import {GetDesiredIngredients} from '../../../typings/gql/GetDesiredIngredients';
import {GetProductIngredients} from '../../../typings/gql/GetProductIngredients';
import {IProductQuantity} from '../../client-schema-types';
import {calculateDefaultQuantity} from '../lib/product_defaultQuantity';
import {IProductObj, TLocalProductResolverFunc} from '../localProduct';

/**
 * Query fields need to be prefetched into cache.
 */
const PRODUCT_INGREDIENTS_QUERY = (id: string) => gql`
    query GetProductIngredients {
        Product(id: "${id}") {
            nutritionFacts {
                ingredients {
                    ingredientQuantity {
                        amount
                        units
                    }
                    ingredientType {
                        name
                    }
                }
            }
        }
    }
`;

export const ALL_PRODUCTS_QUERY = gql`
    query GetAllProductsIngredients {
        allProducts {
            id
            nutritionFacts {
                ingredients {
                    ingredientQuantity {
                        amount
                        units
                    }
                    ingredientType {
                        name
                    }
                }
            }
        }
    }
`;

const DESIRED_INGREDIENTS_QUERY = gql`
    query GetDesiredIngredients {
        desiredIngredients @client {
            ingredientRanges {
                ingredientType {
                    name
                }
                minimumIngredientQuantity {
                    amount
                    units
                }
                maximumIngredientQuantity {
                    amount
                    units
                }
                frequency
            }
        }
    }
`;

const CURRENT_REGIMEN_QUERY = gql`
    query GetCurrentRegimen {
        currentRegimen @client {
            products {
                id
                quantity {
                    number
                    frequency
                    units
                }
            }
        }
    }
`;

const defaultQuantityResolver: TLocalProductResolverFunc<IProductObj, IProductQuantity> = (obj, _, {cache}) => {
  //// Grab data
  const productResult: GetProductIngredients | null = cache.readQuery<any, GetProductIngredients>({
    query: PRODUCT_INGREDIENTS_QUERY(obj.id)
  });
  const allProductsResult: GetAllProductsIngredients | null = cache.readQuery<any, GetAllProductsIngredients>({
    query: ALL_PRODUCTS_QUERY
  });
  const desiredIngredientsResult: GetDesiredIngredients | null = cache.readQuery({
    query: DESIRED_INGREDIENTS_QUERY
  });
  const regimenResult: GetCurrentRegimen | null = cache.readQuery({
    query: CURRENT_REGIMEN_QUERY
  });

  //// Verify successful grabs
  if (!productResult || !productResult.Product || !productResult.Product.nutritionFacts.ingredients) {
    console.warn('productResult falsey');
    return null;
  }
  if (!allProductsResult) {
    console.warn('allProductsResult falsey');
    return null;
  }
  if (!desiredIngredientsResult || !desiredIngredientsResult.desiredIngredients || !desiredIngredientsResult.desiredIngredients.ingredientRanges) {
    console.warn('desiredIngredientRanges falsey');
    return null;
  }
  if (!regimenResult || !regimenResult.currentRegimen) {
    console.warn('currentRegimen falsey');
    return null;
  }

  //// Perform transformation
  return calculateDefaultQuantity(
    productResult.Product.nutritionFacts.ingredients,
    allProductsResult.allProducts,
    desiredIngredientsResult.desiredIngredients.ingredientRanges,
    regimenResult.currentRegimen.products,
  );
  // TODO write quantity to the cache
};

export default defaultQuantityResolver;
