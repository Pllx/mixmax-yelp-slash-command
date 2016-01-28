var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('lodash'); 


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();

//TODO: try catch for JSON parse
  // // this should handle if user chose a listing
  if (/^{\S+/.test(term)) {
    handleSelection(JSON.parse(term), req, res);
  } else { //this should handle if user hit enter with search string without choice
    handleSearchString(term, req, res);
  }
};

function handleSelection(listing, req, res) {
  var categories = [];
  for (var category of listing.categories) {
    categories.push(category[0])
  }
  var html = //TODO: use string templates
  '<a style="text-decoration:none; color:inherit; display:block" href="'+listing.url+'">'+

  '<div style="width:550px; height: 100px;margin:5px; padding:10px; border: 1px solid #99b0e1; border-radius:2px">'+

  //image on left div
  '<div style="display:inline-block; float:left; margin-right:10px"><img style="max-width:90px; max-height:90px" src="'+listing.image_url+'"></div>'+

  //right div
  '<div style="float:left;">' +
  '<div style="width:100%">'+listing.name+'</div>' +
   // rating stars image
   '<img style="vertical-align:middle" src="' +
   listing.rating_img_url +
   '"> '+
   // number of reviews
   '<font style="font-size:12px; font-weight:normal; color:grey">' +
   listing.review_count + ' Reviews</font> </br>' +
   // address
   '<div style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"> '+
   '<font style="font-size:14px;font-weight:normal">' +
   listing.location.display_address.join(', ') + '</font></div>'+
   // categories
   '<font style="font-size:14px; font-weight:normal; color:grey">' +
   categories.join(', ') +
   '</font>' +
   '<div style="font-family:proxima-nova, Avenir Next, Segoe UI, Calibri, Helvetica Neue, Helvetica, Arial, sans-serif; font-size:14px; font-weight:normal; color:#aab; margin-top:5px">' +
   'YELP.COM' +
   '</div>' +
   '</div>' + //right div

   '</div>'+

   '</a>';
  res.json({
    body: html
  });
}

function handleSearchString(term, req, res) {
  //currently do nothing if nothing was selected
}

//TODO: write tests
