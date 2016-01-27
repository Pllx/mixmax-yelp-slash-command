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

  var response;
  try {
    response = sync.await(yelp.search({
      term:'food',
      location:'Montreal',
      limit: 5
    }, sync.defer()));
    response.statusCode = 200;
  } catch (e) {
    console.log('ERRORRRR ', e);
    res.status(500).send('Error');
    return;
  }

  console.log('response.businesses:',response.businesses.length);

  if (response.statusCode !== 200 || !response.businesses) {
    console.log('statusCode',response.statusCode);
    res.status(500).send('Error');
    return;
  }

  var results = _.chain(response.businesses)
    // .reject(function(image) {
    //   return !image || !image.images || !image.images.fixed_height_small;
    // })
    .map(function(listing) {
      //console.log('listing',listing);
      var categories = [];
      for (var category of listing.categories) {
        categories.push(category[0])
      }
      return {
        title: '<div>'+listing.name+'</div>' +
         // rating stars image
         '<img style="vertical-align:middle" src="' +
         listing.rating_img_url +
         '"> '+
         // number of reviews
         '<font style="font-size:12px; font-weight:normal; color:grey">' +
         listing.review_count + ' Reviews</font> </br>' +
         // address
         '<div style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"> '+
         '<font style="font-size:12px;font-weight:normal">' +
         listing.location.display_address.join(', ') + '</font></div>'+
         // categories
         '<font style="font-size:12px; font-weight:normal; color:grey">' +
         categories.join(', ') +
         '</font>',
        text: 'hithere'//listing.url
      };
    })
    .value();

  if (results.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    res.json(results);
  }
};
