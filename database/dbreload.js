const Sequelize = require('sequelize');

const sequelize = new Sequelize('roomee', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => console.log('Database connection has been established successfully.') )
  .catch(err => console.log('Unable to connect to the database:', err));

const User = sequelize.define('user', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  about: Sequelize.TEXT,
  email: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_login: Sequelize.DATE
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
  description: { type: Sequelize.TEXT },
  price: { type: Sequelize.INTEGER }
});

const Photo = sequelize.define('photo', {
  title: Sequelize.STRING,
  url: Sequelize.STRING
});

User.hasMany(Listing);
Listing.hasMany(Photo);
sequelize.sync({ force: true });

setTimeout(function() {
  return process.exit(0);
}, 5000);
