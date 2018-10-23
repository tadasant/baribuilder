import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('https://api.graph.cool/simple/v1/cjlzqvawt1ib00107g3nfr04i', {
  headers: {
    Authorization: 'Bearer YOUR_AUTH_TOKEN',
  },
});

const getProducts = () => {
  return client.request(`
    {
      allProducts {
        listings {
          id
        }
        nutritionFacts {
          serving {
            count
          }
        }
      }
    }
  `);
};

const setListing = (id, numServings) => {
  return client.request(`
    mutation {
      updateListing(
        id: "${id}"
        numServings: ${numServings}
      ) {
        id
      }
    }
  `);
};

// getProducts()
//   .then(data => {
//     const products = data.allProducts;
//     products.forEach(product => {
//       const {id} = product.listings[0];
//       const {count} = product.nutritionFacts.serving;
//       setListing(id, count).then(data => console.log(data));
//     });
//   })
//   .catch(error => console.log(error));
