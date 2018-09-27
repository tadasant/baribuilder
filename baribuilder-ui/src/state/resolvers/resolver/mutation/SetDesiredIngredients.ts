import {IDesiredIngredients} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';

interface ISetDesiredIngredientsArgs {
  desiredIngredients: IDesiredIngredients[];
}

const SetDesiredIngredientsResolver: TResolverFunc<{}, ISetDesiredIngredientsArgs, IDesiredIngredients[]> = (obj, args, {cache}) => {
  cache.writeData({
    data: {
      desiredIngredients: args.desiredIngredients,
    }
  });
  // TODO needs to bust up LocalProductCatalog cache
  return args.desiredIngredients;
};

export default SetDesiredIngredientsResolver;
