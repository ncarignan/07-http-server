'use strict';

const superagent = require('superagent');
const server = require('../lib/server');

describe('server.js', () => {
  test('GET request to / should respond with a 200 status code and a body if there is no error', () => {
    return superagent.get('http://localhost:3000/')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toContain(`<li><a href="/cowsay">cowsay</a></li>`);
      });
  });
  test('GET request to /cowsay should respond with a 200 status code and a body if there is no error', () => {
    return superagent.get('http://localhost:3000/cowsay?text=hi')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toContain(`cowsay`);
      });
  });
  test('POST to /api/cowsay request should respond with a 200 status code and a body', () => {
    let bodyToTest = {content : 'i wish i had thumbs'};
    return superagent.post('http://localhost:3000/api/cowsay')
      .set('Content-Type', 'application/json')
      .send(bodyToTest) //send returns a Promise now everything that follows should be then or catch
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toContain(`i wish i had thumbs`);
      });
  });
  //
  //
  // test('POST request should respond with a 400 status code if there is an error', () => {
  //   let bodyToTest = {car : 'Gregor'};
  //   return superagent.post('http://localhost:3000/echo')
  //     .set('Content-Type', 'Application/json')
  //     .send('{') //send returns a Promise now everything that follows should be then or catch
  //     .then(response => Promise.reject(response)) //prevents it from sending positive response when expecting error
  //     .catch(response => {
  //       expect(response.status).toEqual(400);
  //     });
  // });
});












//http post localhost:3000/echo
//localhost - domain
// 3000 - port
// echo -  route
