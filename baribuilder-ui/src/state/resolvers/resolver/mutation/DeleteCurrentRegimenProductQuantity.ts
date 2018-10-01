import {GetCurrentRegimen} from '../../../../typings/gql/GetCurrentRegimen';
import {IRegimen} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';
import {CURRENT_REGIMEN_QUERY} from '../queries';

interface IDeleteCurrentRegimenProductQuantityArgs {
  catalogProductId: string;
}

const DeleteCurrentRegimenProductQuantityResolver: TResolverFunc<{}, IDeleteCurrentRegimenProductQuantityArgs, IRegimen> = (obj, args, {cache}) => {
  const currentRegimenResult = cache.readQuery<GetCurrentRegimen>({query: CURRENT_REGIMEN_QUERY});
  if (!currentRegimenResult) {
    console.error('Failed to grab currentRegimen. Error code 5009233');
    return null;
  }

  const {currentRegimen} = currentRegimenResult;
  const productIndex = currentRegimen.products.findIndex(p => p.catalogProductId === args.catalogProductId);
  if (productIndex !== -1) {
    currentRegimen.products.splice(productIndex, 1);
  } else {
    console.error('Couldn\'t find deleted product. Error code 5009233');
    return null;
  }

  cache.writeQuery<GetCurrentRegimen>({
    query: CURRENT_REGIMEN_QUERY,
    data: {currentRegimen},
  });

  return currentRegimen;
};

export default DeleteCurrentRegimenProductQuantityResolver;
