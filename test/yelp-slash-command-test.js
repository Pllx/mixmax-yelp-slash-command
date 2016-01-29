var request = require('supertest');
var express = require('express');
var assert =require('assert');

var app = require('../server.js');
var resolveHTML = require('../api/resolver').generateHTML;

describe('Typeahead tests', function() {

  it('Type ahead route should return status code 200', function(done) {
    request(app)
      .get('/typeahead')
      .expect(200, done)
  });
});

describe('Resolver tests', function() {
  var invalidJSON = {
    name : 'Mr. Meeseeks',
    species : 'Meeseeks'
  };

  // trimmed for relevant fields
  var validJSON = {
    text: `{
            "rating_img_url":"http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png",
            "review_count":1679,
            "name":"The Codmother Fish and Chips",
            "url":"http://www.yelp.com/biz/the-codmother-fish-and-chips-san-francisco?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=Vfk_xJ5DrQBJBKxY3v5VsQ",
            "categories":[["British","british"],["Fish & Chips","fishnchips"],["Seafood","seafood"]],
            "image_url":"http://s3-media4.fl.yelpcdn.com/bphoto/7PytB3z6QbM22DFpW8mK8Q/ms.jpg",
            "location":
              {
                "display_address":["496 Beach  St","North Beach/Telegraph Hill","San Francisco, CA 94133"]
              }
          }`,
    user: 'example@gmail.com'
  };

  var listing = JSON.parse(validJSON.text.trim());

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
      .query(invalidJSON)
      .expect(400, done)
  })
  it('Valid JSON requests should return status code 200', function(done) {
    request(app)
      .get('/resolver')
      .query(validJSON)
      .expect(200, done)
  })
  it('generateHTML should return null for invalid JSON', function(done) {
    assert.equal(resolveHTML(invalidJSON), null);
    done();
  })
  it('generateHTML should return a string for valid JSON', function(done) {
    assert.equal(typeof resolveHTML(listing), 'string');
    done();
  })
});
