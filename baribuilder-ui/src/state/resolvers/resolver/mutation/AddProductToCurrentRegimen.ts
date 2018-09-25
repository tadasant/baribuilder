import gql from 'graphql-tag';
import {GetCurrentRegimenProductQuantities} from '../../../../typings/gql/GetCurrentRegimenProductQuantities';
import {PRODUCT_QUANTITY_UNITS} from '../../../../typings/gql/globalTypes';
import {TResolverFunc} from '../../../resolvers';

interface IAddProductToCurrentRegimenArgs {
  productCatalogId: string;
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
}

const CURRENT_QUANTITIES_QUERY = gql`
    query GetCurrentRegimenProductQuantities {
        currentRegimen @client {
            products {
                catalogProductId
                quantity {
                    amount
                    frequency
                    units
                }
            }
        }
    }
`;

const AddProductToCurrentRegimenResolver: TResolverFunc<{}, IAddProductToCurrentRegimenArgs, void> = (obj, args, {cache}) => {
  const currentQuantitiesResult = cache.readQuery<GetCurrentRegimenProductQuantities>({query: CURRENT_QUANTITIES_QUERY});
  if (!currentQuantitiesResult || !currentQuantitiesResult.currentRegimen) {
    console.warn('Current Regimen should never be undefined. Error code 453289.');
    return;
  }

  const matchingRegimenProduct = currentQuantitiesResult.currentRegimen.products.find(p => p.catalogProductId === args.productCatalogId);
  if (!matchingRegimenProduct) {

    // create new one
  } else {
    // update quantity
  }
};

export default AddProductToCurrentRegimenResolver;
