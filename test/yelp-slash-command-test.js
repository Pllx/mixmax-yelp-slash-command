var request = require('supertest');
var express = require('express');

var app = require('../server.js');

describe('Typeahead tests', function() {

  it('Type ahead route should return status code 200', function(done) {
    request(app)
      .get('/typeahead')
      .expect(200, done)
  });
});

describe('Resolver tests', function() {

  it('Empty requests should return status code 400', function(done) {
    request(app)
      .get('/resolver')
      .expect(400, done)
  });
  it('Non-JSON requests should return status code 400', function(done) {
    request(app)
      .get('/resolver')
      .expect(400, done)
  });
  it('Invalid JSON requests should return status code 400', function(done) {
    request(app)
      .get('/resolver')
      .query({ name: 'Tom', species: 'cat'})
      .expect(400, done)
  })
  it('Valid JSON requests should return status code 200', function(done) {
    var validJSON = { text: '{"is_claimed":true,"rating":4.5,"mobile_url":"http://m.yelp.com/biz/the-codmother-fish-and-chips-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=Vfk_xJ5DrQBJBKxY3v5VsQ","rating_img_url":"http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png","review_count":1679,"name":"The Codmother Fish and Chips","rating_img_url_small":"http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png","url":"http://www.yelp.com/biz/the-codmother-fish-and-chips-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=Vfk_xJ5DrQBJBKxY3v5VsQ","categories":[["British","british"],["Fish & Chips","fishnchips"],["Seafood","seafood"]],"phone":"4156069349","snippet_text":"finger lickin good\\n\\norder takes a while to make\\n\\nhave patience young one","image_url":"http://s3-media4.fl.yelpcdn.com/bphoto/7PytB3z6QbM22DFpW8mK8Q/ms.jpg","snippet_image_url":"http://s3-media3.fl.yelpcdn.com/photo/4XbiVpEIL2cR4VHBtjyXbw/ms.jpg","display_phone":"+1-415-606-9349","rating_img_url_large":"http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png","id":"the-codmother-fish-and-chips-san-francisco","is_closed":false,"location":{"cross_streets":"Jones St & Taylor St","city":"San Francisco","display_address":["496 Beach  St","North Beach/Telegraph Hill","San Francisco, CA 94133"],"geo_accuracy":9.5,"neighborhoods":["North Beach/Telegraph Hill","Fisherman\'s Wharf"],"postal_code":"94133","country_code":"US","address":["496 Beach  St"],"coordinate":{"latitude":37.8071157,"longitude":-122.4172602},"state_code":"CA"}}',
                   user: 'example@gmail.com' }
    request(app)
      .get('/resolver')
      .query(validJSON)
      .expect(200, done)
  })
});
