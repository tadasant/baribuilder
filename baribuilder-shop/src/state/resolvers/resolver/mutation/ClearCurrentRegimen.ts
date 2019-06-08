import {GetCurrentRegimen} from '../../../../typings/gql/GetCurrentRegimen';
import {IRegimen} from '../../../client-schema-types';
import storeDefaults from '../../../defaults';
import {TResolverFunc} from '../../../resolvers';
import {CURRENT_REGIMEN_QUERY} from '../queries';

const DeleteCurrentRegimenResolver: TResolverFunc<{}, {}, IRegimen> = (obj, args, {cache}) => {
  const currentRegimenResult = cache.readQuery<GetCurrentRegimen>({query: CURRENT_REGIMEN_QUERY});
  if (!currentRegimenResult) {
    console.error('Failed to grab currentRegimen. Error code 93928331');
    return null;
  }

  cache.writeQuery<GetCurrentRegimen>({
    query: CURRENT_REGIMEN_QUERY,
    data: {
      currentRegimen: storeDefaults.currentRegimen
    },
  });

  return storeDefaults.currentRegimen;
};

export default DeleteCurrentRegimenResolver;
