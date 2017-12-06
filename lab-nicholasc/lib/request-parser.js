'use strict';

const urlModule = require('url');
const queryStringModule = require('querystring');


//=======================
const winston = require('winston');
const winstonLevels = {error: 0, warn : 1, info : 2, verbose : 3, debug : 4};

var logger = new (winston.Logger)({
  transports: [
    // new (winston.transports.Console)(),
    new (winston.transports.File)({
      filename: 'log.json',
      levels : winstonLevels,
    }),
  ],
});
//=========================
const requestParser = module.exports = {};

requestParser.parse = (request) =>{
  return new Promise((resolve, reject) => {
    //take note of console.log
    logger.log('debug', `Original URL : ${JSON.stringify(request.url)}`);
    request.url = urlModule.parse(request.url);
    request.url.query = queryStringModule.parse(request.url.query);
    logger.log('debug', `Parsed URL : ${JSON.stringify(request.url)}`);

    if(request.method !== 'POST' && request.method !== 'PUT')
      return resolve(request);
    //parsing is just for methods including body
    // if im here, i know its a post/put request
    let sentText = '';
    request.on('data', (buffer) => {
      sentText += buffer.toString();
    });
    request.on('end', () => {
      try{
        //mutates the request object and creates a body property
        request.body = JSON.parse(sentText);
        return resolve(request); //passes new promise along .then chain
      }catch(error){
        return reject(error);
      }
    });
  });
};
