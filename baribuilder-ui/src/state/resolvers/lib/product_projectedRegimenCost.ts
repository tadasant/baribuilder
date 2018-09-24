import {GetAllProductsIngredients_allCatalogProducts} from '../../../typings/gql/GetAllProductsIngredients';
import {ICost, IIngredientRange, IProductQuantity, IRegimenCost, IRegimenProduct} from '../../client-schema-types';
import {
  projectCostOfIngredients,
  subtractProductFromRegimenIngredients,
  subtractRegimenIngredientsFromDesiredIngredientRanges,
  sumCostOfProducts,
  sumCosts
} from './helpers';


export interface IProductForProjectedRegimenCost extends GetAllProductsIngredients_allCatalogProducts {
  cost: ICost;
  quantity: IProductQuantity;
}

const calculateProjectedRegimenCost = (
  product: IProductForProjectedRegimenCost,
  desiredIngredientRanges: IIngredientRange[],
  currentRegimenProducts: IRegimenProduct[],
  products: GetAllProductsIngredients_allCatalogProducts[],
): IRegimenCost => {
  const targetRegimenIngredients = subtractRegimenIngredientsFromDesiredIngredientRanges(currentRegimenProducts, desiredIngredientRanges, products);
  const remainingRegimenIngredients = subtractProductFromRegimenIngredients(targetRegimenIngredients, product);
  const numRemainingProducts = remainingRegimenIngredients.length;
  const remainingProjectedCost = projectCostOfIngredients(remainingRegimenIngredients);
  const totalProjectedCost = sumCosts(product.cost, sumCostOfProducts(currentRegimenProducts), remainingProjectedCost);
  return {
    __typename: 'RegimenCost',
    numRemainingProducts,
    cost: totalProjectedCost,
  }
};

export default calculateProjectedRegimenCost;
