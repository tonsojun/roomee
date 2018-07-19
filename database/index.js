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

//in package.json mysql might need to be mysql2


module.exports.sequelize = sequelize;

