var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('lodash');
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key : key.consumer_key,
  consumer_secret : key.consumer_secret,
  token : key.token,
  token_secret : key.token_secret
});

// The Type Ahead API.
function typeahead(req, res) {

  if (!req.query.text) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
  }

  var term = req.query.text.trim().split('@');
  var searchQuery = term[0];
  var locationQuery = term[1];
  var response;

  // term defaults to 'food', whereas location defaults to 'San Francisco'
  try {
    response = sync.await(yelp.search({
      term: searchQuery || 'food',
      location: locationQuery || 'San Francisco',
      limit: 5
    }, sync.defer()));
    response.statusCode = 200;
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  if (response.statusCode !== 200 || !response.businesses) {
    res.status(500).send('Error');
    return;
  }

  // creates HTML for all listings
  var results = response.businesses.map(generateListingHTML);

  if (results.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    res.json(results);
  }
};

// generates HTML for a single listing
function generateListingHTML(listing) {

  // checks if listing is valid
  if(!listing.categories || !listing.location.display_address ||
     !listing.name || !listing.review_count) {
       return null;
     }

  // Remove redundant/duplicate information for categories
  var categories = _.map(listing.categories, '[0]').join(', ');
  var address = listing.location.display_address.join(', ');

  var html = `<div>
  ${listing.name}
  </div>
  <img style="vertical-align:middle" src="${listing.rating_img_url}">
  <font style="font-size:12px; font-weight:normal; color:grey">
    ${listing.review_count} Reviews
  </font> </br>
  <div style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
    <font style="font-size:12px;font-weight:normal">
      ${address}
    </font>
  </div>
  <font style="font-size:12px; font-weight:normal; color:grey">
    ${categories}
  </font>
  `;
  return {
    title: html,
    text: JSON.stringify(listing),
  };
}

module.exports = { typeahead: typeahead, generateListingHTML: generateListingHTML};
