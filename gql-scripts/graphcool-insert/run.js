import {fromEvent} from 'graphcool-lib';
import data from './input/productCategories';

// TODO bad - eliminate use of inline-tokens after graphcool -> prisma migration
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzgzOTA3NjAsImNsaWVudElkIjoiY2psemtzaHB0MTB0czAxNDIybDlzM2pkbyIsInByb2plY3RJZCI6ImNqbHpxdmF3dDFpYjAwMTA3ZzNuZnIwNGkiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqbXE2NHptajJ5bGcwMTMwbzFsenhjbGMifQ.17q8GNMZI8r53I3QfgQhlkumnbZQRezevQ_L7NE0pHA';
const projectId = 'cjlzqvawt1ib00107g3nfr04i';

const event = {
  context: {
    graphcool: {
      projectId,
      // include a PAT if you need full read/write access on the server-side
      rootToken: token,
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

const generateUpdateMutation = (dataType, entry) => {
  const args = Object.keys(entry).map(key =>
    `${key}: ${entry[key]}`
  ).join(',\n');
  return `
    mutation {
      update${dataType}(
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

const catalogProductRecordToEntry = (record) => {
  return {
    'id': `"${record['id']}"`, // string
    'category': `${record['category']}`, // enum
  }
};

const imageURLRecordToEntry = (record) => {
  return {
    'productId': `"${record['id']}"`, // string
    'url': `"${record['url']}"`, // string
  }
};

// inserting ingredient types
// const run = () => {
//   const dataType = data['typeName'];
//   const records = data['values'];
//   records.forEach(record => {
//     const entry = ingredientTypeRecordToEntry(record);
//     const query = generateCreateMutation(dataType, entry);
//     // console.log(query);
//     api
//       .request(query)
//       .then(data => console.log(data))
//   });
// };

// updating product names
const run = () => {
  data.forEach(record => {
    const entry = catalogProductRecordToEntry(record);
    const query = generateUpdateMutation('CatalogProduct', entry);
    api
      .request(query)
      .then(data => console.log(data))
  });
};

// const run = () => {
//   data.forEach(record => {
//     const entry = imageURLRecordToEntry(record);
//     const query = generateCreateMutation('Image', entry);
//     // console.log(query);
//     api
//       .request(query)
//       .then(data => console.log(data))
//   });
// };

// run();
