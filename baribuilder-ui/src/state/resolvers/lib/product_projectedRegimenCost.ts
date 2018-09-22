import {
  GetAllProductsIngredients,
  GetAllProductsIngredients_allProducts
} from '../../../typings/gql/GetAllProductsIngredients';
import {ICost, IIngredientRange, IQuantity, IRegimenCost, IRegimenProduct} from '../../client-schema-types';
import {
  addCosts, calculateRegimenCost,
  projectCost,
  subtractProductFromIngredients,
  subtractRegimenIngredientsFromIngredientRanges
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
  const targetIngredients = subtractRegimenIngredientsFromIngredientRanges(currentRegimenProducts, desiredIngredientRanges, products);
  const remainingIngredients = subtractProductFromIngredients(targetIngredients, product);
  const numRemainingProducts = remainingIngredients.length;
  const remainingProjectedCost = projectCost(remainingIngredients);
  const totalProjectedCost: ICost = addCosts(product.cost, calculateRegimenCost(currentRegimenProducts), remainingProjectedCost);
  return {
    __typename: 'RegimenCost',
    numRemainingProducts,
    cost: totalProjectedCost,
  }
};

export default calculateProjectedRegimenCost;
