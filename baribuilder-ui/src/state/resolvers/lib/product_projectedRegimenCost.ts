import {GetAllProductsIngredients_allProducts} from '../../../typings/gql/GetAllProductsIngredients';
import {ICost, IIngredientRange, IProductQuantity, IRegimenCost} from '../../client-schema-types';
import {
  addCosts,
  sumCostOfProducts,
  projectCostOfIngredients,
  subtractProductFromRegimenIngredients,
  subtractRegimenIngredientsFromDesiredIngredientRanges
} from './helpers';

export interface IProductForProjectedRegimenCost extends GetAllProductsIngredients_allProducts {
  cost: ICost;
  quantity: IProductQuantity;
}

const calculateProjectedRegimenCost = (
  product: IProductForProjectedRegimenCost,
  desiredIngredientRanges: IIngredientRange[],
  currentRegimenProducts: IProductForProjectedRegimenCost[],
  products: GetAllProductsIngredients_allProducts[],
): IRegimenCost => {
  const targetRegimenIngredients = subtractRegimenIngredientsFromDesiredIngredientRanges(currentRegimenProducts, desiredIngredientRanges, products);
  const remainingRegimenIngredients = subtractProductFromRegimenIngredients(targetRegimenIngredients, product);
  const numRemainingProducts = remainingRegimenIngredients.length;
  const remainingProjectedCost = projectCostOfIngredients(remainingRegimenIngredients);
  const totalProjectedCost: ICost = addCosts(product.cost, sumCostOfProducts(currentRegimenProducts), remainingProjectedCost);
  return {
    __typename: 'RegimenCost',
    numRemainingProducts,
    cost: totalProjectedCost,
  }
};

export default calculateProjectedRegimenCost;
