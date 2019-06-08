import {GetGoalIngredients} from '../../../../typings/gql/GetGoalIngredients';
import {IGoalIngredients} from '../../../client-schema-types';
import {TResolverFunc} from '../../../resolvers';
import unfilledIngredientCountResolver from '../goalIngredients_unfilledIngredientCount';
import {GOAL_INGREDIENTS_QUERY} from '../queries';

const goalIngredients: TResolverFunc<{}, {}, IGoalIngredients> = (obj, args, {cache}) => {
  const unfilledIngredientCount = unfilledIngredientCountResolver(obj, args, {cache});
  const goalIngredientsResult = cache.readQuery<GetGoalIngredients>({query: GOAL_INGREDIENTS_QUERY});

  if (!goalIngredientsResult || !goalIngredientsResult.goalIngredients) {
    console.warn('goalIngredientsResult falsey');
    return null;
  }
  if (unfilledIngredientCount === null) {
    console.warn('unfilledIngredientCount null');
    return null;
  }

  return {
    ...goalIngredientsResult.goalIngredients,
    unfilledIngredientCount,
  }
};

export default goalIngredients;
