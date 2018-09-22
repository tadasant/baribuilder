import {
  GetAllProductsIngredients,
  GetAllProductsIngredients_allProducts
} from '../../../typings/gql/GetAllProductsIngredients';
import {ICost, IIngredientRange, IQuantity, IRegimenCost, IRegimenProduct} from '../../client-schema-types';
import {
  addCosts, calculateRegimenCost,
  projectCost,
  subtractProductFromRegimenIngredients,
  subtractRegimenIngredientsFromDesiredIngredientRanges
} from './helpers';

export interface IProductForProjectedRegimenCost extends GetAllProductsIngredients {
  cost: ICost;
  quantity: IQuantity;
}

const calculateProjectedRegimenCost = (
  product: IProductForProjectedRegimenCost,
  desiredIngredientRanges: IIngredientRange[],
  currentRegimenProducts: IRegimenProduct[],
  products: GetAllProductsIngredients_allProducts[],
): IRegimenCost => {
  const targetRegimenIngredients = subtractRegimenIngredientsFromDesiredIngredientRanges(currentRegimenProducts, desiredIngredientRanges, products);
  const remainingRegimenIngredients = subtractProductFromRegimenIngredients(targetRegimenIngredients, product);
  const numRemainingProducts = remainingRegimenIngredients.length;
  const remainingProjectedCost = projectCost(remainingRegimenIngredients);
  const totalProjectedCost: ICost = addCosts(product.cost, calculateRegimenCost(currentRegimenProducts), remainingProjectedCost);
  return {
    __typename: 'RegimenCost',
    numRemainingProducts,
    cost: totalProjectedCost,
  }
};

export default calculateProjectedRegimenCost;
