const updateBaribuilderAmazonPricesWithViglink = require('./updateBaribuilderAmazonPricesWithViglink');

exports.handler = function(event, context, callback) {
  updateBaribuilderAmazonPricesWithViglink.run();
  callback(null, 'Successfully invoked!');
};