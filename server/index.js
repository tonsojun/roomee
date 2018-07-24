const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const db = require('../database/index.js');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencode app.use(multer());
// for parsing multipart/form-data

app.post('/search/get', (req, res) => {
  console.log('req from get in server', req.body)
  res.end('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
