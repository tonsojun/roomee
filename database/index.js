const Sequelize = require('sequelize');
const mysql = require('mysql2');

//DATABASE AND SERVER HAVE TO BE RUNNING ON SEPARATE PORTS!!!
//USE HAVE TO USE DEFAULT PORT FOR MYSQL,IF YOU WANT TO CHANGE IT, IT CANNOT BE CHANGED VIA CONFIF, GOOGLE  IT!!!
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

//const db = new Sequelize('mysql://root:null@localhost:3000/roomee');

sequelize.authenticate() 
  .then(() => {  console.log('Connection has been established successfully.') }) 
  .catch(err => {  console.error('Unable to connect to the database:', err); 
});

const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});
//is this necessary? we are using passport

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'Sample',
    lastName: 'Sample',
    userName: 'Sample',
    password: 'Sample'
  });
});

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
  }
});

// force: true will drop the table if it already exists
Listing.sync({force: true}).then(() => {
  // Table created
  return Listing.create({
    title: 'Sample',
    city: 'Sample',
    address: 'Sample',
    description: 'Sample',
    price: 1
  });
});

// creates a listingId attribute to User
User.belongsTo(Listing);












//in package.json mysql might need to be mysql2
//ahhhhh!

module.exports.sequelize = sequelize;

