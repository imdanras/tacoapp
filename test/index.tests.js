var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');

describe('GET /', function() {
  //tests go here
  it('should return a 200 response', function(done){
    //expect a 200 status code
    request(app).get('/')
    .expect(200, done);
  });
});
