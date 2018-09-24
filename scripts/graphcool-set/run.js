import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('https://api.graph.cool/simple/v1/cjlzqvawt1ib00107g3nfr04i', {
  headers: {
    Authorization: 'Bearer YOUR_AUTH_TOKEN',
  },
});

const getNutritionFactses = () => {
  return client.request(`
    {
      allNutritionFactses {
        id
        serving {
          size
          units
        }
      }
    }
  `);
};

const setServingStuff = (id, size, units) => {
  return client.request(`
    mutation {
      updateNutritionFacts(
        id: "${id}",
        size: ${size},
        units: ${units}
      ) {
        id
      }
    }
  `);
};

// getNutritionFactses()
//   .then(data => {
//     const nutritionFactses = data.allNutritionFactses;
//     nutritionFactses.forEach(nutritionFacts => {
//       const {id} = nutritionFacts;
//       const {size, units} = nutritionFacts['serving'];
//       setServingStuff(id, size, units).then(data => console.log(data));
//     });
//   })
//   .catch(error => console.log(error));
