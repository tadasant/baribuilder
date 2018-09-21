import gql from 'graphql-tag';
import {GetAllProductIngredients} from '../../../typings/gql/GetAllProductIngredients';
import {GetCurrentRegimen} from '../../../typings/gql/GetCurrentRegimen';
import {GetDesiredDosages} from '../../../typings/gql/GetDesiredDosages';
import {GetProductIngredients} from '../../../typings/gql/GetProductIngredients';
import {IQuantity} from '../../client-schema-types';
import {calculateDefaultQuantity} from '../lib/product_defaultQuantity';
import {IProductObj, TLocalProductResolverFunc} from '../localProduct';

/**
 * Non-client queries need to be in cache already.
 */
const PRODUCT_INGREDIENTS_QUERY = (id: string) => gql`
    query GetProductIngredients {
        Product(id: "${id}") {
            nutritionFacts {
                ingredients {
                    amount
                    units
                    ingredientType {
                        name
                    }
                }
            }
        }
    }
`;

const ALL_PRODUCTS_QUERY = gql`
    query GetAllProductIngredients {
        allProducts {
            nutritionFacts {
                ingredients {
                    amount
                    ingredientType {
                        name
                    }
                    units
                }
            }
        }
    }
`;

const DESIRED_DOSAGES_QUERY = gql`
    query GetDesiredDosages {
        desiredDosages @client {
            ingredientRanges {
                ingredientType {
                    name
                }
                minimumDosage {
                    number
                    units
                    frequency
                }
                maximumDosage {
                    number
                    units
                    frequency
                }
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

const defaultQuantityResolver: TLocalProductResolverFunc<IProductObj, IQuantity> = (obj, _, {cache}) => {
  //// Grab data
  const productResult: GetProductIngredients | null = cache.readQuery<any, GetProductIngredients>({
    query: PRODUCT_INGREDIENTS_QUERY(obj.id)
  });
  const allProductsResult: GetAllProductIngredients | null = cache.readQuery<any, GetAllProductIngredients>({
    query: ALL_PRODUCTS_QUERY
  });
  const dosagesResult: GetDesiredDosages | null = cache.readQuery({
    query: DESIRED_DOSAGES_QUERY
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
  if (!dosagesResult || !dosagesResult.desiredDosages || !dosagesResult.desiredDosages.ingredientRanges) {
    console.warn('desiredDosages falsey');
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
    dosagesResult.desiredDosages.ingredientRanges,
    regimenResult.currentRegimen.products,
  );
  // TODO write quantity to the cache
};

export default defaultQuantityResolver;
