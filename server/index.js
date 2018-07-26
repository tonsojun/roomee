const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const db = require('../database/index.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencode app.use(multer());
// for parsing multipart/form-data

// initialize passport and the express sessions and passport sessions
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.get('/searchListing', (req, res) => {
  const zip = req.param('zip');
  const queryStr = zip ? { where: { zipCode: zip } } : {};
  db.Listing.findListingsByZip(queryStr, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.post('/listing', (req, res) => {
  db.Listing.createListing(req.body, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(result);
    }
  });
});

// handlers for refresh button on all views
// res.redirect('back') will take user back to homepage
app.get('/createListing', (req, res) => {
  res.redirect('localhost:3000/createListing');
});

app.get('/loginView', (req, res) => {
  // res.render('loginView');
  res.redirect('localhost:3000/loginView');
});

app.get('/house', (req, res) => {
  // res.render('loginView');
  res.redirect('localhost:3000/house');
});

app.get('/search', (req, res) => {
  // res.render('searchView');
  res.redirect('localhost:3000/search');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
