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

//TODO: Find easier way to pass in string and JSON queries to get request
//TODO: Integration tests
describe('Resolver tests', function() {

  it('Empty requests should return status code 400', function(done) {
    request(app)
      .get('/resolver')
      .expect(400, done)
  });
  it('Non-JSON requests should return status code 400', function(done) {
    request(app)
      .get('/resolver?text=test_string')
      .expect(400, done)
  });
  it('Invalid JSON requests should return status code 400', function(done) {
    request(app)
      .get('/resolver?text=%7B%22val%22%3A%201%7D')
      .expect(400, done)
  })
});
