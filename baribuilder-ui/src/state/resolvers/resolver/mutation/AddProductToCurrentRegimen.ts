import gql from 'graphql-tag';
import {FragExistingRegimenProductQuantity} from '../../../../typings/gql/FragExistingRegimenProductQuantity';
import {FREQUENCY, PRODUCT_QUANTITY_UNITS} from '../../../../typings/gql/globalTypes';
import {IRegimenProduct} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';

interface IAddProductToCurrentRegimenArgs {
  catalogProductId: string;
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

const REGIMEN_PRODUCT_QUANTITY_FRAGMENT = gql`
    fragment FragExistingRegimenProductQuantity on RegimenProduct {
        __typename
        catalogProductId @client
        quantity @client {
            __typename
            amount
            units
            frequency
        }
    }
`;

const AddProductToCurrentRegimenResolver: TResolverFunc<{}, IAddProductToCurrentRegimenArgs, FragExistingRegimenProductQuantity> = (obj, args, {cache}) => {
  const product = cache.readFragment<FragExistingRegimenProductQuantity, IRegimenProduct>({
    id: `RegimenProduct:${args.catalogProductId}`,
    fragment: REGIMEN_PRODUCT_QUANTITY_FRAGMENT,
  });

  console.log(product);

  if (!product) {
    cache.writeFragment<FragExistingRegimenProductQuantity, IRegimenProduct>({
      id: `RegimenProduct:${args.catalogProductId}`,
      data: {
        __typename: 'RegimenProduct',
        catalogProductId: args.catalogProductId,
        quantity: {
          __typename: 'RegimenProductQuantity',
          amount: args.amount,
          units: args.units,
          frequency: args.frequency,
        },
      },
      fragment: REGIMEN_PRODUCT_QUANTITY_FRAGMENT,
    })
  } else {
    // update quantity
  }

  return product ? product : cache.readFragment<FragExistingRegimenProductQuantity, IRegimenProduct>({
    id: `RegimenProduct:${args.catalogProductId}`,
    fragment: REGIMEN_PRODUCT_QUANTITY_FRAGMENT,
  });
};

export default AddProductToCurrentRegimenResolver;
