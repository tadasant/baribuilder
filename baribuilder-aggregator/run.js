// https://www.amazon.com/gp/product/B001FY1KAE
// API: acbd58153445ac1640082974c1fe0f93

// https://rest.viglink.com/api/product/metadata

import axios from 'axios';
import {fromEvent} from 'graphcool-lib';

const viglinkSecretToken = 'b622e46ec05d0a2df526e053b3fca2b9c7fc3a1f';
const productApiUrl = 'https://rest.viglink.com/api/product/metadata';
const graphcoolToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzgzOTA3NjAsImNsaWVudElkIjoiY2psemtzaHB0MTB0czAxNDIybDlzM2pkbyIsInByb2plY3RJZCI6ImNqbHpxdmF3dDFpYjAwMTA3ZzNuZnIwNGkiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqbXE2NHptajJ5bGcwMTMwbzFsenhjbGMifQ.17q8GNMZI8r53I3QfgQhlkumnbZQRezevQ_L7NE0pHA';
const graphcoolProjectId = 'cjlzqvawt1ib00107g3nfr04i';

const event = {
  context: {
    graphcool: {
      projectId: graphcoolProjectId,
      rootToken: graphcoolToken,
    }
  }
};

const graphcoolApi = fromEvent(event).api('simple/v1');

const getProductMetadata = (productUrl) => {
  return axios.get(productApiUrl, {
    params: {
      url: productUrl
    },
    headers: {
      'Authorization': viglinkSecretToken,
    }
  })
};

const getAllPackageListings = () => {
  const query = `
    query {
      allPackageListings {
        url
        retailerName
        price {
          id
          amount
        }
        package {
          product {
            id
            name
          }
        }
      }
    }
  `;
  return graphcoolApi.request(query)
};

const updatePrice = (priceId, priceAmount) => {
  // TODO
  console.log('send request to graphcool');
};


const updatePackagePrice = (pkg) => {
  const {url, price, package: {product: {id, name}}} = pkg;
  console.info(`Getting metadata for ${url}`);
  getProductMetadata(url)
    .then(response => {
      const {data} = response;
      try {
        const newPriceAsFloat = parseFloat(data.price.replace('$',''));
        if (newPriceAsFloat !== price.amount) {
          console.log(`Listing ${name} (${id}) has new price $${newPriceAsFloat} (prior: $${price.amount}).`)
          updatePrice(price.id, price.amount);
        }
      } catch(err) {
        console.log(err);
      }
    })
    .catch(error => {
      console.log(`Failed to grab metadata for "${name}" (id: ${id}) at ${url}.`);
      console.log(error);
    })
  // TODO consider sending email update when a price has changed
};

const run = () => {
  getAllPackageListings()
    .then(data => {
      console.info('Grabbing all package listings...');
      const packages = data.allPackageListings;
      let nextDelay = 0;
      console.info('Iterating over listings...');
      packages.forEach(pkg => {
        if (pkg.retailerName === "AMAZON") {
          setTimeout(() => updatePackagePrice(pkg), nextDelay);
          nextDelay += 2000;
        }
      });
    })
};

run();