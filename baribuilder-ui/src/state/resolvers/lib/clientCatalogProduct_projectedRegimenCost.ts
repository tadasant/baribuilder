import {GetAllProductsIngredients_allCatalogProducts} from '../../../typings/gql/GetAllProductsIngredients';
import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {
  ICatalogProductCost,
  ICatalogProductQuantity,
  IIngredientRange,
  IRegimenCost,
  IRegimenProduct
} from '../../client-schema-types';
import {
  projectCostOfIngredients,
  subtractProductFromRegimenIngredients,
  subtractRegimenIngredientsFromGoalIngredientRanges,
  sumCostOfProducts,
  sumCosts
} from './helpers';


export interface IProductForProjectedRegimenCost extends GetAllProductsIngredients_allCatalogProducts {
  cost: ICatalogProductCost;
  quantity: ICatalogProductQuantity;
}

// TODO bug: assumes exceeding is worse than not meeting. e.g. if I only want 1 IU, it will project cost 0 (but we should give priority to excess)
const calculateProjectedRegimenCost = (
  product: IProductForProjectedRegimenCost,
  goalIngredientRanges: IIngredientRange[],
  currentRegimenProducts: IRegimenProduct[],
  products: GetAllProductsIngredients_allCatalogProducts[],
): IRegimenCost => {
  const targetRegimenIngredients = subtractRegimenIngredientsFromGoalIngredientRanges(currentRegimenProducts, goalIngredientRanges, products);
  const remainingRegimenIngredients = subtractProductFromRegimenIngredients(targetRegimenIngredients, product);
  const numRemainingProducts = remainingRegimenIngredients.length;
  const remainingProjectedCost = projectCostOfIngredients(remainingRegimenIngredients);
  const totalProjectedCost = sumCosts(product.cost, sumCostOfProducts(currentRegimenProducts), remainingProjectedCost);
  // TODO more robust conversions
  if (totalProjectedCost.frequency === FREQUENCY.DAILY) {
    totalProjectedCost.money *= 30;
    totalProjectedCost.frequency = FREQUENCY.MONTHLY;
  }
  return {
    __typename: 'RegimenCost',
    numRemainingProducts,
    money: totalProjectedCost.money,
    frequency: totalProjectedCost.frequency,
  }
};

export default calculateProjectedRegimenCost;
