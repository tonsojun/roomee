const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const db = require('../database/index.js');
const env = require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

// const models = require('../database/models');
// const authRoute = require('../database/passport_routes/auth.js')(app,passport);
// const passportStrat = require('../database/config/passport/passport.js')(passport, models.user);
// app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencode app.use(multer());
// for parsing multipart/form-data

// initialize passport and the express sessions and passport sessions
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

app.get('/searchListing', (req, res) => {
  let zip = req.param('zip');
  if (zip !== undefined) { zip = zip.substr(0, 3) + '__'; }
  const queryStr = zip ? { where: { zipCode: { $like: zip } } } : {};
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

app.get('/signup', (req, res) => res.render('signup'));
app.get('/loginView', (req, res) => res.render('login'));

/**
 * Create user will post to /signup for adding a user or to validate if username is available
 * post to signup will return
 * 201 when a valid user has been created
 * 202 code indicates that this user name already exists on the database
 * 204 indicates username is not in use, but since no password was sent with the request, no creation will happen
 * 409 when the databse rejected an add user
 */
app.post('/signup', (req, res) => {
  db.User.findbyUsername(req.body.username, (err, user) => {
    if (user) {
      return res.sendStatus(202);
    }
    if (!req.body.password) {
      return res.sendStatus(204);
    }
    // if we got to this point, we have a valid request to create a user in our database
    const { username, password, firstname, lastname } = req.body;
    const newUser = {
      username,
      password,
      firstname,
      lastname,
      email: username
    };
    db.User.createUser(
      newUser,
      (err, user) => (err ? res.sendStatus(409) : res.sendStatus(201))
    );
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.User.validateLogin(username, password, (err, valid) => {
    if (valid) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
