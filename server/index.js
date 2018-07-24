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

app.get('/search', (req, res) => {

  let q = req.params('term')
  console.log('req from get in server', q)

  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
