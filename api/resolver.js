var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('lodash');

// The API that returns the in-email representation.
function resolver(req, res) {

  try {
    var listing = JSON.parse(req.query.text.trim());
    var result = generateHTML(listing);

    if (result) {
      return res.json({body: result});
    }
    return res.sendStatus(400);

  } catch (e) { //If Non-JSON or invalid JSON
    return res.sendStatus(400);
  }
};

function generateHTML(listing) {

  if (!listing.categories || !listing.location.display_address ||
      !listing.url || !listing.image_url || !listing.name ||
      !listing.rating_img_url || !listing.review_count) {
        return null;
      }

  var categories = _.map(listing.categories, '[0]').join(', ');
  var address = listing.location.display_address.join(', ');

  var html =
  `<a style="text-decoration:none; color:inherit; display:block" href="${listing.url}">
    <div style="width:550px; height: 100px;margin:5px; padding:10px; border: 1px solid #99b0e1; border-radius:2px">
      <div style="display:inline-block; float:left; margin-right:10px">
        <img style="max-width:90px; max-height:90px" src="${listing.image_url}">
      </div>
      <div style="float:left; width:80%">
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
  return html;
}

module.exports = { resolver: resolver, generateHTML: generateHTML };
