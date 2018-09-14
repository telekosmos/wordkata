var Dictionary = require('oxford-dictionary-api');
var app_id = '5126e325';
var app_key = '990296d99e60fc4ff2b159226c291493';
var dict = new Dictionary(app_id, app_key);

dict.find('ace', function(error, data) {
  if (error) return console.log(`ERR: ${error}`);
  console.log(`Result: ${JSON.stringify(data)}`);
});
