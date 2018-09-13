import { fromEvent } from 'graphcool-lib';
import inputData from './input/input';

// const pat = '__PAT__';
const projectId = 'cjlzqvawt1ib00107g3nfr04i';

const event = {
  context: {
    graphcool: {
      projectId,
      // include a PAT if you need full read/write access on the server-side
      // pat,
    }
  }
};

const api = fromEvent(event).api('simple/v1');

const generateCreateMutation = (dataType, entry) => {
  const args = Object.keys(entry).map(key =>
    `${key}: ${entry[key]}`
  ).join(',\n');
  return `
    mutation {
      create${dataType}(
        ${args}
      ) {
        id
      }
    }
  `
};

// JSON format to entry-able string format (i.e. correcttly formatted lists, enums, etc.)
// const ingredientTypeRecordToEntry = (record) => {
//   return {
//     'name': `"${record['name']}"`, // string
//     'synonyms': `[${record['synonyms'].map(o => `"${o}"`).join(',')}]`, // list
//     'defaultUnits': record['defaultUnits'] // enum
//   }
// };

const graphcmsRecordToEntry = (record, ingredientTypeIdByIngredientTypeName) => {
  const servingValues = [
    `size: ${record.nutritionFacts.serving.size}`,
    `count: ${record.nutritionFacts.serving.count}`,
    `units: ${record.nutritionFacts.serving.units}`
  ];
  const relevantIngredientNames = Object.keys(records.nutritionFacts.micronutrients).filter(name =>
    !['calories', 'total_carbohydrates', 'total_fat', 'sugar', 'sugars', 'sugar_alcohol', 'stevia'].includes(name)
  )
  const ingredientValuesList = [
    Object.keys(record.nutritionFacts.micronutrients).map(name => [
      `amount: ${}`,
      `units: ${}`,
      `ingredientTypeId" ${}`
    ])
  ];
  const nutritionFacts = {
    'serving': `{\n${servingValues.join(',\n')}\n}`,
    'ingredients': `[\n${ingredientValuesList.map(l => `{${l.join(',\n')}}`).join(',\n')}\n]`,
  };
  return {
    'name': record['name'],
    'brand': record['brand'],
    'category': record['category'],
    'form': record['form'],
    'nutritionFacts': `{\n${nutritionFacts}\n}`
  }
};

const getIngredientTypes = async () => {
  const query = `
    query {
      allIngredientTypes {
        id
        name
      }
    }
  `;
  const values = await api.request(query)['data']['allIngredientTypes'];
  const result = {};
  values.forEach(value => {
    result[value['name']] = value['id']
  });
  return result;
};

const run = () => {
  const ingredientTypeIdByIngredientTypeName = getIngredientTypes();
  inputData.forEach(record => {
    const entry = graphcmsRecordToEntry(record, ingredientTypeIdByIngredientTypeName);
    const query = generateCreateMutation('Product', entry);
    console.log(query);
    // api
    //   .request(query)
    //   .then(data => console.log(data))
  });
};

run();
