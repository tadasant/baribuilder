import {GetAllProductsIngredients_allCatalogProducts} from '../../../typings/gql/GetAllProductsIngredients';
import {FREQUENCY} from '../../../typings/gql/globalTypes';
import {
  ICatalogProductCost,
  ICatalogProductQuantity,
  IIngredientRange,
  IRegimenProduct
} from '../../client-schema-types';
import {
  projectCostOfIngredients,
  subtractProductFromRegimenIngredients,
  subtractRegimenIngredientsFromGoalIngredientRanges,
  sumCostOfProducts,
  sumCosts
} from './helpers';


export interface IProductForCostEffectivenessRating extends GetAllProductsIngredients_allCatalogProducts {
  cost: ICatalogProductCost;
  quantity: ICatalogProductQuantity;
}

// TODO note that the "product quantity" here is the defaultQuantity. Consider possibility of dynamically updating as quantity changes.
// TODO bug: assumes exceeding is worse than not meeting. e.g. if I only want 1 IU, it will project cost 0 (but we should give priority to excess)
/* Returns 0.0 - 10.0, 10.0 if the projected regimen cost is 150 or higher*/
const calculateCostEffectivenessRating = (
  product: IProductForCostEffectivenessRating,
  goalIngredientRanges: IIngredientRange[],
  currentRegimenProducts: IRegimenProduct[],
  products: GetAllProductsIngredients_allCatalogProducts[],
): number => {
  const targetRegimenIngredients = subtractRegimenIngredientsFromGoalIngredientRanges(currentRegimenProducts, goalIngredientRanges, products);
  const remainingRegimenIngredients = subtractProductFromRegimenIngredients(targetRegimenIngredients, product);
  const remainingProjectedCost = projectCostOfIngredients(remainingRegimenIngredients);
  const totalProjectedCost = sumCosts(product.cost, sumCostOfProducts(currentRegimenProducts), remainingProjectedCost);
  // TODO more robust conversions
  if (totalProjectedCost.frequency === FREQUENCY.DAILY) {
    totalProjectedCost.money *= 30;
    totalProjectedCost.frequency = FREQUENCY.MONTHLY;
  }
  const result = (1 - (totalProjectedCost.money / 150)) * 10;
  return result > 10 ? 10 : result < 0 ? 0 : result;
};

export default calculateCostEffectivenessRating;
