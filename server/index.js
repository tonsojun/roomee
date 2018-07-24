const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');

const PORT = process.env.PORT || 3000;

const app = express();
const passport = require('passport')
const session = require('express-session')

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencode app.use(multer());
// for parsing multipart/form-data

// initialize passport and the express session and passport session
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

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

//handlers for refresh button on all views
//res.redirect('back') will take user back to homepage
app.get('/loginView', (req, res) => {
  res.redirect('localhost:3000/loginView');
});

app.get('/createListing', (req, res) => {
  res.redirect('localhost:3000/createListing');
});

app.get('/search', (req, res) => {
  res.redirect('localhost:3000/search');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
