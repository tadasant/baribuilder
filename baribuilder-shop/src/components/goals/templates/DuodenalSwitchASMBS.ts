import {FREQUENCY, INGREDIENT_QUANTITY_UNITS} from '../../../typings/gql/globalTypes';
import {IGoalsScreenState} from '../GoalsScreen';

const state: IGoalsScreenState = {
  "showRedirectModal": false,
  "selectedTemplateName": 'Duodenal Switch (BPD/DS) - ASMBS',
  "goalIngredients": {
    "ingredientRanges": [
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Vitamin A",
        "minimumAmount": 10000,
        "maximumAmount": 20000,
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
        "minimumAmount": 300,
        "maximumAmount": 301,
        "units": INGREDIENT_QUANTITY_UNITS.MCG,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Thiamine",
        "minimumAmount": 50,
        "maximumAmount": 100,
        "units": INGREDIENT_QUANTITY_UNITS.MG,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Folic Acid",
        "minimumAmount": 1000,
        "maximumAmount": 1001,
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
        "minimumAmount": 1800,
        "maximumAmount": 2400,
        "units": INGREDIENT_QUANTITY_UNITS.MG,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Iron",
        "minimumAmount": 45,
        "maximumAmount": 60,
        "units": INGREDIENT_QUANTITY_UNITS.MG,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Zinc",
        "minimumAmount": 16,
        "maximumAmount": 22,
        "units": INGREDIENT_QUANTITY_UNITS.MG,
        "frequency": FREQUENCY.DAILY
      },
      {
        "__typename": "IngredientRange",
        "ingredientTypeName": "Copper",
        "minimumAmount": 2,
        "maximumAmount": 3,
        "units": INGREDIENT_QUANTITY_UNITS.MG,
        "frequency": FREQUENCY.DAILY
      }
    ],
    "__typename": "GoalIngredients"
  }
};

export default state;
