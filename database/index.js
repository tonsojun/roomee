const Sequelize = require('sequelize');
// DATABASE AND SERVER HAVE TO BE RUNNING ON SEPARATE PORTS!!!
// USE DEFAULT PORT FOR MYSQL

// create the connection to database
//if name is empty, you can create the db using sequelize
 const sequelize = new Sequelize('roomee', 'root', null, { 
  host: 'localhost', 
  dialect: 'mysql'  ,
  pool: {
    max: 5, 
    min: 1, 
    acquire: 30000, 
    idle: 1
  }
});

sequelize.authenticate() 
  .then(() => console.log('Connection has been established successfully.')) 
  .catch(err => console.error('Unable to connect to the database:', err));

const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  userName: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING }
});
//is this necessary? we are using passport

// force: true will drop the table if it already exists
User.sync({force: true}).then(() =>
  // Table created
  User.create({
    firstName: 'Sample',
    lastName: 'Sample',
    userName: 'Sample',
    password: 'Sample'
  })
);

// use Sequalize file for adding photos to database
const Listing = sequelize.define('Listing', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  zip: {
    type: Sequelize.INTEGER
  },
  photos: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
Listing.sync({force: true}).then(() =>
  // Table created
  Listing.create({
    title: 'Sample',
    city: 'Sample',
    address: 'Sample',
    description: 'Sample',
    price: 1,
    zip: 12345,
    photo: 'sample.png',
  })
);
Listing.findListings = (query, callback)=>
  Listing.findAll()
    .then(data => callback(null,data))
    .catch(err => callback(err,null));

Listing.createListing = (listing, callback)=>
  Listing.create(listing)
    .then(data => callback(null,data))
    .catch(err => callback(err,null));


// creates a listingId attribute to User
User.belongsTo(Listing);

module.exports.sequelize = sequelize;
module.exports.Listing = Listing;
