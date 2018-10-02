import {fromEvent, FunctionEvent} from 'graphcool-lib'
import {GraphQLClient} from 'graphql-request'

// Don't need to be doing this on the backend. TODO remove

// From https://www.fda.gov/Food/GuidanceRegulation/GuidanceDocumentsRegulatoryInformation/LabelingNutrition/ucm513734.htm#collapseOne
// Scroll to "General order for listing..."

const ingredientTypeNameOrder = [
  'Vitamin A',
  'Vitamin C',
  'Vitamin D3',
  'Vitamin E',
  'Vitamin K1',
  'Thiamine',
  'Riboflavin',
  'Niacin',
  'Vitamin B6',
  'Folic Acid',
  'Vitamin B12',
  'Biotin',
  'Pantothenic Acid',
  'Choline',
  'Calcium',
  'Iron',
  'Phosphorous',
  'Iodine',
  'Magnesium',
  'Zinc',
  'Selenium',
  'Copper',
  'Manganese',
  'Chromium',
  'Molybdenum',
  'Chloride',
  'Sodium',
  'Potassium',
  'Fluoride',
  'Vitamin K2',
  'Vitamin D2',
];

interface IQueryResponse {
  allIngredientTypes: IIngredientType[];
}

interface IIngredientType {
  name: String;
  synonyms: String[];
}

async function getAllIngredientTypes(api: GraphQLClient): Promise<IQueryResponse> {
  const query = `
    query {
      allIngredientTypes {
        name
        synonyms
      }
    }
  `;
  return api.request<IQueryResponse>(query)
}

const sortIngredientTypes = (ingredientTypes: IIngredientType[]) => {
  return ingredientTypes.sort((i1, i2) => {
    const index1 = ingredientTypeNameOrder.findIndex(n => n === i1.name);
    const index2 = ingredientTypeNameOrder.findIndex(n => n === i2.name);
    if (index1 === -1 && index2 === -1) {
      return 0;
    }
    if (index1 === -1) {
      return 1;
    }
    if (index2 === -1) {
      return -1;
    }
    return index1 - index2;
  });
};

export default async (event: FunctionEvent) => {
  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const queryResponse = await getAllIngredientTypes(api);
    // @ts-ignore
    console.log(queryResponse);
    return {
      data: sortIngredientTypes(queryResponse.allIngredientTypes),
    }
  } catch (e) {
    return {error: `An unexpected error occured. ${e}`}
  }
}