import {GetCurrentRegimen} from '../../../../typings/gql/GetCurrentRegimen';
import {IRegimen, IRegimenProductQuantity} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';
import {CURRENT_REGIMEN_QUERY} from '../queries';

interface ISetCurrentRegimenProductQuantityArgs {
  catalogProductId: string;
  regimenProductQuantity: IRegimenProductQuantity;
}

const SetCurrentRegimenProductQuantityResolver: TResolverFunc<{}, ISetCurrentRegimenProductQuantityArgs, IRegimen> = (obj, args, {cache}) => {
  const currentRegimenResult = cache.readQuery<GetCurrentRegimen>({query: CURRENT_REGIMEN_QUERY});
  if (!currentRegimenResult) {
    console.error('Failed to grab currentRegimen. Error code 5829233');
    return null;
  }

  const {currentRegimen} = currentRegimenResult;
  const product = currentRegimen.products.find(p => p.catalogProductId === args.catalogProductId);
  if (product) {
    if (args.regimenProductQuantity.frequency !== product.quantity.frequency || args.regimenProductQuantity.units !== product.quantity.units) {
      console.warn('Conversions not yet implemented. Error code 5829233');
      return null;
    }
    product.quantity.amount = args.regimenProductQuantity.amount;
  } else {
    console.error('Couldn\'t find edited product. Error code 5829233');
    return null;
  }

  cache.writeQuery<GetCurrentRegimen>({
    query: CURRENT_REGIMEN_QUERY,
    data: {currentRegimen},
  });

  return currentRegimen;
};

export default SetCurrentRegimenProductQuantityResolver;
