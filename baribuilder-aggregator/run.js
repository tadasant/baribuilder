// https://www.amazon.com/gp/product/B001FY1KAE
// API: acbd58153445ac1640082974c1fe0f93

// https://rest.viglink.com/api/product/metadata

import axios from 'axios';

const secretToken = 'b622e46ec05d0a2df526e053b3fca2b9c7fc3a1f';
const productAPIUrl = 'https://rest.viglink.com/api/product/metadata';


const getProductMetadata = (productUrl) => {
  return axios.get(productAPIUrl, {
    params: {
      url: productUrl
    },
    headers: {
      'Authorization': secretToken,
    }
  })
};

const run = () => {
  // grab all packagelistings from graphcool (incl. price id and url)
  // at a rate of 1 per 2 seconds
    // iterate over list of urls, grabbing info from viglink
    // set updated price for each
};

run();