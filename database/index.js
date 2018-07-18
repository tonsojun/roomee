const Sequelize = require('sequelize');
 const db = new Sequelize('roomee', 'user', null, { 
  host: 'localhost', 
  dialect: 'mysql',  
  pool: {
    max: 5, 
    min: 0, 
    acquire: 30000, 
    idle: 10000 
  }
});

db.authenticate() 
  .then(() => {  console.log('Connection has been established successfully.');  }) 
  .catch(err => {  console.error('Unable to connect to the database:', err); 
});

//in package.json mysql might need to be mysql2