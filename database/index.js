const Sequelize = require('sequelize');


// create the connection to database
//if name is empty, you can create the db using sequelize
 const sequelize = new Sequelize('roomee', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 1
  }
});

sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.log('Unable to connect to the database:', err));

const User = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  username: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING
});

const Listing = sequelize.define('listing', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  address2: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  stateAbbr: { type: Sequelize.STRING },
  zipCode: { type: Sequelize.STRING },
  lat: { type: Sequelize.DECIMAL(9, 6) },
  lon: { type: Sequelize.DECIMAL(9, 6) },
  description: { type: Sequelize.STRING },
  price: { type: Sequelize.INTEGER }
});

const Photo = sequelize.define('photo', {
  title: Sequelize.STRING,
  url: Sequelize.STRING
});

// User.hasMany(Listing);
Listing.hasMany(Photo);

sequelize.sync({ force: true });
// sequelize.sync();

Listing.findListingsByZip = (queryStr, callback) => {
  queryStr.include = [{ model: Photo }];
  Listing.findAll(queryStr)
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
};

Listing.findListingsByID = (id, callback) => {
  const queryStr = { where: { id }, includes: [{ model: Photo }] };
  Listing.findAll(queryStr)
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
};

Listing.createListing = (listing, callback) => {
  Listing.create(listing)
    .then(data => {
      if (listing.photos.length > 0) {
        const listingResult = data;
        const photos = listing.photos.map( url => {const p = { url, listingId: listingResult.id }; return p})
        Photo.bulkCreate(photos)
        .then (() => Listing.findListingsByID(listingResult.id, callback));
      } else {
        callback(null, data);
      }
    })
    .catch(err => callback(err, null));
};

module.exports.sequelize = sequelize;
module.exports.Listing = Listing;
