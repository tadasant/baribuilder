const updateBaribuilderAmazonPricesWithViglink = require('./src/updateBaribuilderAmazonPricesWithViglink');

exports.handler = function(event, context, callback) {
  updateBaribuilderAmazonPricesWithViglink.run();
  callback(null, 'Successfully invoked!');
};