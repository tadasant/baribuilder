import { fromEvent } from 'graphcool-lib';
import data from './input/ingredientTypes';

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
const ingredientTypeRecordToEntry = (record) => {
  return {
    'name': `"${record['name']}"`, // string
    'synonyms': `[${record['synonyms'].map(o => `"${o}"`).join(',')}]`, // list
    'defaultUnits': record['defaultUnits'] // enum
  }
};

const run = () => {
  const dataType = data['typeName'];
  const records = data['values'];
  records.forEach(record => {
    const entry = ingredientTypeRecordToEntry(record);
    const query = generateCreateMutation(dataType, entry);
    // console.log(query);
    api
      .request(query)
      .then(data => console.log(data))
  });
};

// run();
