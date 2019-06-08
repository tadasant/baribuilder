import {IGoalIngredients} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';

interface ISetGoalIngredientsArgs {
  goalIngredients: IGoalIngredients[];
}

const SetGoalIngredientsResolver: TResolverFunc<{}, ISetGoalIngredientsArgs, IGoalIngredients[]> = (obj, args, context) => {
  context.cache.writeData({
    data: {
      goalIngredients: args.goalIngredients,
    }
  });
  return args.goalIngredients;
};

export default SetGoalIngredientsResolver;
