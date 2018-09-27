import {IDesiredIngredients} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';

interface ISetDesiredIngredientsArgs {
  desiredIngredients: IDesiredIngredients[];
}

const SetDesiredIngredientsResolver: TResolverFunc<{}, ISetDesiredIngredientsArgs, IDesiredIngredients[]> = (obj, args, {cache}) => {
  console.log('resolver hit');
  return args.desiredIngredients;
};

export default SetDesiredIngredientsResolver;
