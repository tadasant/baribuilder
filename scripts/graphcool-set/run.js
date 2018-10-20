import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('https://api.graph.cool/simple/v1/cjlzqvawt1ib00107g3nfr04i', {
  headers: {
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzgzOTA3NjAsImNsaWVudElkIjoiY2psemtzaHB0MTB0czAxNDIybDlzM2pkbyIsInByb2plY3RJZCI6ImNqbHpxdmF3dDFpYjAwMTA3ZzNuZnIwNGkiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqbXE2NHptajJ5bGcwMTMwbzFsenhjbGMifQ.17q8GNMZI8r53I3QfgQhlkumnbZQRezevQ_L7NE0pHA',
  },
});

const getPackageListings = () => {
  return client.request(`
    {
      allPackageListings {
        package {
          id
        }
        asin
      }
    }
  `);
};

const createPackageIdentifier = (asin, packageId) => {
  return client.request(`
    mutation {
      createPackageIdentifier(
        type: ASIN,
        value: "${asin}",
        packagesIds: ["${packageId}"]
      ) {
        id
      }
    }
  `);
};

// getPackageListings()
//   .then(data => {
//     const packageListings = data.allPackageListings;
//     packageListings.forEach(packageListing => {
//       const {asin} = packageListing;
//       const packageId = packageListing['package']['id'];
//       createPackageIdentifier(asin, packageId).then(data => console.log(data));
//     });
//   })
//   .catch(error => console.log(error));
