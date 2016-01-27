var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key : key.consumer_key,
  consumer_secret : key.consumer_secret,
  token : key.token,
  token_secret : key.token_secret
});

// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  var parsedTerm = term.split('@');
  //console.log(parsedTerm[0], ',',parsedTerm[1]);

  //if location is undefined, term is parsedTerm[0]
  //if locaton is defined, term is searchInput[0] + "&find_loc="+ searchInput[1]

  //console.log('Term is',term);
  if (!term) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
  }

  // var test = sync.await(yelp.search({term:'food',location:'Montreal'}, sync.defer()));
  // console.log('TEST is',test);

  var response;
  try {
    response = sync.await(yelp.search({
      term:'food',
      location:'Montreal',
      limit: 5
    }, sync.defer()));
    response.statusCode = 200;
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  console.log('response.businesses:',response.businesses.length);

  if (response.statusCode !== 200 || !response.businesses) {
    console.log('statusCode',response.statusCode);
    res.status(500).send('Error');
    return;
  }

  console.log('GOT HERE BEETCHES');

  var results = _.chain(response.businesses)
    // .reject(function(image) {
    //   return !image || !image.images || !image.images.fixed_height_small;
    // })
    .map(function(listing) {
      console.log('listing',listing);
      return {
        title: '<img style="height:75px" src="' + listing.image_url + '">',
        text: listing.url
      };
    })
    .value();

  // var results = response.businesses.map(function(listing) {
  //   console.log(listing);
  // });

  if (results.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    res.json(results);
  }
};
