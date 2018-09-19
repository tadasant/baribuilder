import gql from 'graphql-tag';
import {GetAllProductIngredients} from '../../../typings/gql/GetAllProductIngredients';
import {GetCurrentRegimen} from '../../../typings/gql/GetCurrentRegimen';
import {GetDesiredDosages} from '../../../typings/gql/GetDesiredDosages';
import {GetProductIngredients} from '../../../typings/gql/GetProductIngredients';
import {IUnitQuantity} from '../../client-schema-types';
import {TLocalProductResolverFunc} from '../localProduct';
import {calculateDefaultUnitQuantity} from '../lib/product_defaultUnitQuantity';

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
                serving {
                    count
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
                minimum {
                    amount
                    units
                    frequency
                }
                maximum {
                    amount
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
              numServings
              frequency
          }
      }
  }
`;

const defaultUnitQuantityResolver: TLocalProductResolverFunc<IUnitQuantity> = (obj, args, {cache}) => {
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
  if (!dosagesResult || !dosagesResult.desiredDosages) {
    console.warn('desiredDosages falsey');
    return null;
  }
  if (!regimenResult || !regimenResult.currentRegimen) {
    console.warn('currentRegimen falsey');
    return null;
  }

  //// Perform transformation
  return calculateDefaultUnitQuantity(
    productResult.Product.nutritionFacts.ingredients,
    allProductsResult.allProducts,
    dosagesResult.desiredDosages.ingredientRanges,
    regimenResult.currentRegimen.products,
  );
};

export default defaultUnitQuantityResolver;
