import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('https://api.graph.cool/simple/v1/cjlzqvawt1ib00107g3nfr04i', {
  headers: {
    Authorization: 'Bearer YOUR_AUTH_TOKEN',
  },
});

const getIngredients = () => {
  return client.request(`
    {
      allIngredients {
        id
        amount
        units
      }
    }
  `);
};

const setIngredientQuantities = (id, amount, units) => {
  return client.request(`
    mutation {
      createIngredientQuantity(
        ingredientId: "${id}",
        amount: ${amount},
        units: ${units}
      ) {
        id
      }
    }
  `);
};

// getIngredients()
//   .then(data => {
//     const ingredients = data.allIngredients;
//     ingredients.forEach(ingredient => {
//       const {id, amount, units} = ingredient;
//       setIngredientQuantities(id, amount, units).then(data => console.log(data));
//     });
//   })
//   .catch(error => console.log(error));
