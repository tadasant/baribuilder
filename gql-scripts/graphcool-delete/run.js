import {fromEvent} from 'graphcool-lib';

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

import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(`https://api.graph.cool/simple/v1/${projectId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


function getCatalogProduct() {
  return client.request(`
    {
      CatalogProduct(id: "cjnjghuuo0ej9012431g5hy2w") {
        serving {
          id
          ingredients {
            id
            quantity {
              id
            }
          }
        }
      }
    }
  `)
}

const generateDeleteMutation = (dataType, entry) => {
  const args = Object.keys(entry).map(key =>
    `${key}: ${entry[key]}`
  ).join(',\n');
  return `
    mutation {
      delete${dataType}(
        ${args}
      ) {
        id
      }
    }
  `
};

const recordToEntry = (record) => {
  return {
    'id': `"${record['id']}"`, // string
  }
};


const run = () => {
  getCatalogProduct()
    .then(response => {
      const product = response.CatalogProduct;
      console.log(product)
      product.serving.ingredients.forEach(ingredient => {
        const quantityQuery = generateDeleteMutation('ServingIngredientQuantity', recordToEntry(ingredient.quantity))
        api
          .request(quantityQuery)
          .then(data => {
            const query = generateDeleteMutation('ServingIngredient', recordToEntry(ingredient));
            api
              .request(query)
              .then(data => console.log(data))
          })

      })
    })
};

// run();
