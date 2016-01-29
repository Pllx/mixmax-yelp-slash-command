var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('lodash');

// The API that returns the in-email representation.
module.exports = function(req, res) {
  // if term is JSON, handle the selection. Otherwise, do nothing
  console.log(req.query);
  try {
    var listing = JSON.parse(req.query.text.trim());

    //move this to handle selection. return null if not valid json
    if (!listing.categories || !listing.location.display_address ||
        !listing.url || !listing.image_url || !listing.name ||
        !listing.rating_img_url || !listing.review_count) {
          res.sendStatus(400);
        }
    else {
      //pass only listing to handle selection which should return html or null
      handleSelection(listing, req, res);
      //if not null return res.json(htlm)
      //otherwise return res.sendStatus(400)
    }
  } catch (e) { //If Non-JSON or invalid JSON
    res.sendStatus(400);
  }
};

function handleSelection(listing, req, res) {
  var categories = _.map(listing.categories, '[0]').join(', ');
  var address = listing.location.display_address.join(', ');

  var html =
  `<a style="text-decoration:none; color:inherit; display:block" href="${listing.url}">
    <div style="width:550px; height: 100px;margin:5px; padding:10px; border: 1px solid #99b0e1; border-radius:2px">
      <div style="display:inline-block; float:left; margin-right:10px">
        <img style="max-width:90px; max-height:90px" src="${listing.image_url}">
      </div>
      <div style="float:left">
        <div style="width:100%">
          ${listing.name}
        </div>
        <img style="vertical-align:middle" src="${listing.rating_img_url}">
        <font style="font-size:12px; font-weight:normal; color:grey">
        ${listing.review_count} Reviews
        </font> </br>
        <div style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
          <font style="font-size:14px;font-weight:normal">
            ${address}
          </font>
        </div>
        <font style="font-size:14px; font-weight:normal; color:grey">
          ${categories}
        </font>
        <div style="font-family:proxima-nova, Avenir Next, Segoe UI, Calibri, Helvetica Neue, Helvetica, Arial, sans-serif; font-size:14px; font-weight:normal; color:#aab; margin-top:5px">
          YELP.COM
        </div>
      </div>
    </div>
  </a>
  `
  res.json({
    body: html
  });
}
