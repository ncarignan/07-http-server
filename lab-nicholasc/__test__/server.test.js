'use strict';

const superagent = require('superagent');
const server = require('../lib/server');

describe('server.test.js', () => {
  test('POST request should respond with a 200 status code and a body if there is no error', () => {
    let bodyToTest = {car : 'Gregor'};
    return superagent.post('http://localhost:3000/echo')
      .send(bodyToTest) //send returns a Promise now everything that follows should be then or catch
      .then(response => {
        //here is where we use expect
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(bodyToTest); //TODO: in homework- this line will change
      });
  });
  test('POST request should respond with a 400 status code if there is an error', () => {
    let bodyToTest = {car : 'Gregor'};
    return superagent.post('http://localhost:3000/echo')
      .set('Content-Type', 'Application/json')
      .send('{') //send returns a Promise now everything that follows should be then or catch
      .then(response => Promise.reject(response)) //prevents it from sending positive response when expecting error
      .catch(response => {
        //here is where we use expect
        expect(response.status).toEqual(400);
        expect(response.body).toEqual(bodyToTest); //TODO: in homework- this line will change
      });
  });
});












//http post localhost:3000/echo
//localhost - domain
// 3000 - port
// echo -  route
