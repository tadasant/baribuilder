import gql from 'graphql-tag';
import {PRODUCT_QUANTITY_UNITS} from '../../../../typings/gql/globalTypes';
import {IRegimenProduct} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';

interface IAddProductToCurrentRegimenArgs {
  catalogProductId: string;
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
}

const AddProductToCurrentRegimenResolver: TResolverFunc<{}, IAddProductToCurrentRegimenArgs, void> = (obj, args, {cache}) => {
  // TODO investigate why this doesn't generate
  interface IExistingRegimenProductQuantity {
    catalogProductId: string;
    quantity: { amount: number };
  }

  const product = cache.readFragment<IExistingRegimenProductQuantity, IRegimenProduct>({
    id: `RegimenProduct:${args.catalogProductId}`,
    fragment: gql`
        fragment ExistingRegimenProductQuantity on RegimenProduct {
            catalogProductId @client
            quantity @client {
                amount
            }
        }
    `,
  });

  console.log(product);

  if (!product) {
    // create new one
  } else {
    // update quantity
  }
};

export default AddProductToCurrentRegimenResolver;
