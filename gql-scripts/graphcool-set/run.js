import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('https://api.graph.cool/simple/v1/cjlzqvawt1ib00107g3nfr04i', {
  headers: {
    // TODO bad - eliminate use of inline-tokens after graphcool -> prisma migration
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzgzOTA3NjAsImNsaWVudElkIjoiY2psemtzaHB0MTB0czAxNDIybDlzM2pkbyIsInByb2plY3RJZCI6ImNqbHpxdmF3dDFpYjAwMTA3ZzNuZnIwNGkiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqbXE2NHptajJ5bGcwMTMwbzFsenhjbGMifQ.17q8GNMZI8r53I3QfgQhlkumnbZQRezevQ_L7NE0pHA',
  },
});

const getProductPackages = () => {
  return client.request(`
    {
      allProductPackages {
        identifiers {
          value
        }
        listings {
          id
        }
      }
    }
  `);
};

const createAffiliateLink = (asin, listingId) => {
  const url = `https://www.amazon.com/dp/${asin}/?tag=baribuilder-20`;
  return client.request(`
    mutation {
      createAffiliateLink(
        source: AMAZON,
        url: "${url}",
        listingId: "${listingId}"
      ) {
        id
      }
    }
  `);
};

// getProductPackages()
//   .then(data => {
//     const productPackages = data.allProductPackages;
//     productPackages.forEach(productPackage => {
//       const asin = productPackage.identifiers[0].value;
//       const listingId = productPackage.listings[0].id;
//       createAffiliateLink(asin, listingId).then(data => console.log(data));
//     });
//   })
//   .catch(error => console.log(error));
