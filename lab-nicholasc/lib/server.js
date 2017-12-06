'use strict';

const http = require('http');
const logger = require('./logger');
const router = require('./router');
// const winston = require('winston');
const requestParser = require('./request-parser');
const cowsay = require('cowsay');

process.env.PORT = 3000;

require('../route/note-router');

//===================================================
// const app = http.createServer((request, response) => {
//   logger.log('info', 'Processing Request');
//   logger.log('info', `Method: ${request.method}`);
//   logger.log('info', `URL: ${request.url}`);
//   logger.log('info', `Headers: ${JSON.stringify(request.headers)}`);
//   //process request
//   requestParser.parse(request)
//     .then(request => {
//       // this is the same as having http:/localhost:3000/
//       if(request.method === 'GET' && request.url.pathname === '/'){
//         response.writeHead(200, {'Content-Type' : 'text/html'});
//         response.write(`<!DOCTYPE html>
//                           <html>
//                             <head>
//                               <title> cowsay </title>
//                             </head>
//                             <body>
//                              <header>
//                                <nav>
//                                  <ul>
//                                    <li><a href="/cowsay">cowsay</a></li>
//                                  </ul>
//                                </nav>
//                              <header>
//                              <main>
//                                <!-- project description -->
//                              </main>
//                             </body>
//                           </html>
//                           `);
//         logger.log('info', `responding with a 200 status code`);
//         response.end();
//         return;
//       }if(request.method === 'GET' && request.url.pathname === '/cowsay'){
//         response.writeHead(200, {'Content-Type' : 'text/html'});
//
//         let cowSays;
//         if(request.url.query.text)
//           cowSays = request.url.query.text;
//         else
//           cowSays = 'I need something good to say!';
//
//         response.write(`<!DOCTYPE html>
//                           <html>
//                             <head>
//                               <title> cowsay </title>
//                             </head>
//                             <body>
//                               <h1> cowsay </h1>
//                               <pre>
//                                 ${cowsay.say({ text: cowSays})}
//                               </pre>
//                             </body>
//                           </html>
//                           `);
//         logger.log('info', `responding with a 200 status code`);
//         response.end();
//         return;
//       }else if(request.method == 'POST' && request.url.pathname == '/api/cowsay'){
//         response.writeHead(200, {'Content-Type' : 'application/json'});
//         response.write(JSON.stringify(request.body));
//         response.end();
//         return;
//       }
//       response.writeHead(404, {'Content-Type' : 'text/plain'});
//       response.write('not found');
//       logger.log('info', 'responding with a 404 status code');
//       response.end(); //requuired to end the connection- otherwise connection stays open
//       return;
//     }).catch(error => {
//       logger.log('info', 'answering with a 400 status code');
//       logger.log('info', error);
//       response.writeHead(400, {'Content-Type' : 'text/plain' });
//       response.write('Bad Request');
//       response.end();
//       return;
//     });
// });
// //===================================================
const app = http.createServer(router.route);

let isServerOn = false ;

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) =>{
    if(isServerOn){
      logger.log('error', '__SERVER_ERROR__ server is already running');
      return reject(new Error('__SERVER_ERROR__ server is already running'));
    }
    if(!process.env.PORT){
      logger.log('error', '__SERVER_ERROR__ PORT variable is  not configured');
      return reject(new Error('__SERVER_ERROR__ PORT variable is not configured'));
    }
    app.listen(process.env.PORT, error => {
      if(error)
        return reject(error);
      isServerOn = true;
      logger.log('info', `Server is online on port ${process.env.PORT}`);
      console.log('info', `Server is online on port ${process.env.PORT}`);
      return resolve();

    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) =>{
    if(!isServerOn){
      logger.log('error', '__SERVER_ERROR__ server is already off');
      return reject(new Error('__SERVER_ERROR__ server is already off'));
    }
    app.close(error => {
      if(error){
        logger.log('info', `__SERVER_ERROR__ server can't be shut down`);
        logger.log('error', error);
        return reject(error);
      }
      isServerOn = false;
      return resolve();

    });
  });
};
