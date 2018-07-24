const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencode app.use(multer());
// for parsing multipart/form-data

app.get('/search', (req, res) => {
  const searchTerm = null || req.param('term');
  console.log('req from get in server', searchTerm);
  db.Listing.findListings(searchTerm, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/listing', (req, res) => {
  console.log('req from get in server', req.body);
  db.Listing.createListing(req.body, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
