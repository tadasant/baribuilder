import {fromEvent} from 'graphcool-lib';
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

const graphcmsRecordToEntry = (record, ingredientTypeIdByIngredientTypeName, existingNames) => {
  const serving = [
    `size: ${record.nutritionFacts.serving.size}`,
    `count: ${record.nutritionFacts.serving.count}`,
    `units: ${record.nutritionFacts.serving.units}`
  ];
  const relevantIngredientNames = Object.keys(record.nutritionFacts.micronutrients).filter(name =>
    !['calories', 'total_carbohydrates', 'total_fat', 'sugar', 'sugars', 'sugar_alcohol', 'stevia', 'fiber'].includes(name)
  );
  // if (existingNames.includes(record.name)) { use if needed as hack for retries
  //   return null
  // }
  const ingredientList =
    relevantIngredientNames.map(name => ([
      `amount: ${record.nutritionFacts.micronutrients[name].value}`,
      `units: ${record.nutritionFacts.micronutrients[name].units.toUpperCase()}`,
      `ingredientTypeId: "${ingredientTypeIdByIngredientTypeName[name]}"`
    ]));
  const nutritionFacts = [
    `serving: {\n${serving.join(',\n')}\n}`,
    `ingredients: [\n${ingredientList.map(ingredient => `{${ingredient.join(',\n')}}`).join(',\n')}\n]`,
  ];
  const listing = [
    `asin: "${record.asin}"`,
    `url: "${record.url}"`,
    `price: {\namount: ${record.price}\n}`
  ];
  return {
    'name': `"${record['name']}"`,
    'brand': record['brand'],
    'category': record['category'],
    'form': record['form'],
    'nutritionFacts': `{\n${nutritionFacts.join(',\n')}\n}`,
    'listings': `[{\n${listing.join(',\n')}\n}]`
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
  const response = await Promise.resolve(api.request(query));
  const values = response['allIngredientTypes'];
  const result = {};
  values.forEach(value => {
    result[value['name']] = value['id']
  });
  return result;
};

const getProductNames = async () => {
  const query = `
    query {
      allProducts {
        name
      }
    }
  `;
  const response = await Promise.resolve(api.request(query));
  const values = response['allProducts'];
  return values.map(entry => entry['name'])
};

const run = async () => {
  const ingredientTypeIdByIngredientTypeName = await getIngredientTypes();
  const existingNames = await getProductNames();
  inputData.forEach(record => {
    const entry = graphcmsRecordToEntry(record, ingredientTypeIdByIngredientTypeName, existingNames);
    if (entry !== null) {
      const query = generateCreateMutation('Product', entry);
      api
        .request(query)
        .then(data => console.log(data))
        .catch(error => {
          console.log(error)
        })
    }

  });
};

// Set CODE and IMPORT before uncommenting
// run();
