const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const database = require('./database');
const api = require('./api/v1/');

// Connect database
database.connect();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
}));
// parse application/json
app.use(bodyParser.json());

const staticFiles = express.static(path.join(__dirname, '../../../client/build'));
app.use(staticFiles);

app.use('/api/v1', api);
app.use('/api', api);

app.use('/*', staticFiles);

app.use((err, req, res, next) => {
  let {
    statusCode = 500, message,
  } = err;

  switch (err.type) {
    case 'entity.parse.failed':
      message = `Bad Request: ${err.message}`;
      break;
    default:
      if (err.message.startsWith('ValidationError')) {
        statusCode = 422;
      }
      break;
  }

  res.status(statusCode);
  res.json({
    error: true,
    message,
  });
});

module.exports = app;
