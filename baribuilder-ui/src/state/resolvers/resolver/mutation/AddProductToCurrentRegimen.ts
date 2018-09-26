import gql from 'graphql-tag';
import {GetCurrentRegimen} from '../../../../typings/gql/GetCurrentRegimen';
import {FREQUENCY, PRODUCT_QUANTITY_UNITS} from '../../../../typings/gql/globalTypes';
import {IRegimen} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';
import costResolver from '../clientCatalogProduct_cost';

interface IAddProductToCurrentRegimenArgs {
  catalogProductId: string;
  amount: number;
  units: PRODUCT_QUANTITY_UNITS;
  frequency: FREQUENCY;
}

// Should contain entire aggregate
const CURRENT_REGIMEN_QUERY = gql`
    query GetCurrentRegimen {
        currentRegimen @client {
            products {
                catalogProductId
                quantity {
                    amount
                    units
                    frequency
                }
                cost {
                    money
                    frequency
                }
            }
        }
    }
`;

const AddProductToCurrentRegimenResolver: TResolverFunc<{}, IAddProductToCurrentRegimenArgs, IRegimen> = (obj, args, {cache}) => {
  const currentRegimenResult = cache.readQuery<GetCurrentRegimen>({query: CURRENT_REGIMEN_QUERY});
  if (!currentRegimenResult) {
    console.error('Failed to grab currentRegimen. Error code 348298');
    return null;
  }

  const {currentRegimen} = currentRegimenResult;
  const product = currentRegimen.products.find(p => p.catalogProductId === args.catalogProductId);
  if (!product) {
    const productCost = costResolver({catalogProductId: args.catalogProductId}, {}, {cache});
    if (!productCost) {
      console.error('Failed to resolve cost for new product. Error code 348298');
      return null;
    }
    currentRegimen.products.push({
      __typename: 'RegimenProduct',
      catalogProductId: args.catalogProductId,
      quantity: {
        __typename: 'RegimenProductQuantity',
        amount: args.amount,
        frequency: args.frequency,
        units: args.units
      },
      cost: {
        __typename: 'RegimenProductCost',
        frequency: productCost.frequency,
        money: productCost.money,
      },
    })
  } else {
    // update quantity TODO
  }

  cache.writeQuery<GetCurrentRegimen>({
    query: CURRENT_REGIMEN_QUERY,
    data: {currentRegimen},
  });

  return currentRegimen;
};

export default AddProductToCurrentRegimenResolver;
