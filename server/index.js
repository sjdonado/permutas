const http = require('http');

const app = require('./app/');
const config = require('./app/config/');

const {
  port,
  hostname,
} = config.server;

const server = http.createServer(app);

server.listen((process.env.PORT || port), hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
