import {
  GetAllProductsIngredients,
  GetAllProductsIngredients_allProducts
} from '../../../typings/gql/GetAllProductsIngredients';
import {
  ICost,
  IIngredientRange,
  IQuantity,
  IRegimenCost,
  IRegimenProduct,
} from '../../client-schema-types';

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
  const targetIngredients = subtractRegimenIngredientsFromDesiredIngredientRanges(currentRegimenProducts, desiredIngredientRanges, products);
  const remainingIngredients = subtractProductFromIngredients(targetIngredients, product);
  const numRemainingProducts = ...;
  const remainingProjectedCost: ICost = projectCost(remainingIngredients);
  const totalProjectedCost: ICost = addCosts(product.cost, calculateRegimenCost(currentRegimenProducts), remainingProjectedCost);
  return {
    __typename: 'RegimenCost',
    numRemainingProducts,
    cost: {
      __typename: 'Cost',
      ...totalProjectedCost,
      quantity: {
        __typename: 'Quantity',
        ...totalProjectedCost.quantity,
      },
    }
  }
};

export default calculateProjectedRegimenCost;
