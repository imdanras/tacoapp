var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require ('../models');

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('GET /tacos', function() {
  it('should return a 200 response', function(done) {
    request(app).get('/tacos').expect(200, done);
  });
});

//GET tacos/new

describe('GET /tacos/new', function() {
  it('should return a 200 response', function(done) {
    request(app).get('/tacos/new').expect(200, done);
  });
});


describe('POST /tacos', function() {
  it('should create and redirect to /tacos after posting a valid taco', function(done) {
    request(app).post('/tacos')
    .type('form')
    .send({
      name: 'Doritos Locos',
      amount: 9001
    })
    .expect('Location', '/tacos')
    .expect(302, done);
  });
});

//GET /tacos/:id/edit
describe('GET /tacos/:id/edit', function() {
  it('should return a 200 response and show an edit page', function(done) {
    request(app).get('/tacos/1/edit').expect(200, done);
  });
});

//GET /tacos/:id
describe('GET /tacos/:id', function() {
  it('should return a 200 and a specific taco by id', function(done) {
    request(app).get('/tacos/1').expect(200, done);
  });
});

//PUT /tacos/:id
describe('PUT /tacos/:id', function() {
  it('return a 200 and send a success message', function(done) {
    request(app).put('/tacos/1')
    .type('form')
    .send({
      name: 'Gordita Crunch',
      amount: 2000
    })
    .end(function(err, response) {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('msg');
      expect(response.body.msg).to.equal('success');
      done();
    });
  });
});

describe('DELETE tacos/:id', function() {
  it('should delete a taco and send a success message and return a 200', function(done) {
    request(app).delete('/tacos/1')
    .end(function(err, response) {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('msg');
      expect(response.body.msg).to.equal('success');
      done();
    });
  });
});

//DELETE a taco that does not exist
describe('DELETE /tacos/:id', function() {
  it('should return an error message and 404', function(done) {
    request(app).delete('/tacos/1')
    .end(function(err, response) {
      expect(response.statusCode).to.equal(404);
      expect(response.body).to.have.property('msg');
      expect(response.body.msg).to.equal('error');
      done();
    });
  });
});













