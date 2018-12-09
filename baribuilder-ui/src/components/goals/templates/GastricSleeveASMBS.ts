import {FREQUENCY, INGREDIENT_QUANTITY_UNITS} from '../../../typings/gql/globalTypes';
import {IGoalsScreenState} from '../GoalsScreen';

export const SLEEVE_TEMPLATE_NAME = 'Gastric Sleeve (VSG) - ASMBS';

const state: IGoalsScreenState = {
  "showRedirectModal": false,
  "selectedTemplateName": SLEEVE_TEMPLATE_NAME,
  "goalIngredients": {
    "ingredientRanges": [
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Vitamin A",
        "minimumAmount": 5000,
        "maximumAmount": 5001,
        "units": INGREDIENT_QUANTITY_UNITS.IU,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Vitamin D3",
        "minimumAmount": 3000,
        "maximumAmount": 3001,
        "units": INGREDIENT_QUANTITY_UNITS.IU,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Vitamin E",
        "minimumAmount": 22,
        "maximumAmount": 23,
        "units": INGREDIENT_QUANTITY_UNITS.IU,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Vitamin K1",
        "minimumAmount": 90,
        "maximumAmount": 120,
        "units": INGREDIENT_QUANTITY_UNITS.MCG,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Thiamine",
        "minimumAmount": 12,
        "maximumAmount": 100,
        "units": INGREDIENT_QUANTITY_UNITS.MG,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Folic Acid",
        "minimumAmount": 400,
        "maximumAmount": 1000,
        "units": INGREDIENT_QUANTITY_UNITS.MCG,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Vitamin B12",
        "minimumAmount": 350,
        "maximumAmount": 500,
        "units": INGREDIENT_QUANTITY_UNITS.MCG,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Calcium",
        "minimumAmount": 1200,
        "maximumAmount": 1500,
        "units": INGREDIENT_QUANTITY_UNITS.MG,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Iron",
        "minimumAmount": 18,
        "maximumAmount": 19,
        "units": INGREDIENT_QUANTITY_UNITS.MG,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Zinc",
        "minimumAmount": 8,
        "maximumAmount": 11,
        "units": INGREDIENT_QUANTITY_UNITS.MG,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Copper",
        "minimumAmount": 1,
        "maximumAmount": 2,
        "units": INGREDIENT_QUANTITY_UNITS.MG,
        "frequency": FREQUENCY.DAILY
      }
    ],
    "__typename": "GoalIngredients"
  }
};

export default state;
