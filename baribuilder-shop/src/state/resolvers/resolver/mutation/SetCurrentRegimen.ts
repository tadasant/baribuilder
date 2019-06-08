import {IRegimen} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';

interface ISetCurrentRegimenArgs {
  currentRegimen: IRegimen[];
}

const SetCurrentRegimenResolver: TResolverFunc<{}, ISetCurrentRegimenArgs, IRegimen[]> = (obj, args, context) => {
  context.cache.writeData({
    data: {
      currentRegimen: args.currentRegimen,
    }
  });
  return args.currentRegimen;
};

export default SetCurrentRegimenResolver;
