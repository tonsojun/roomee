var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('../database/index.js');
const PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static(path.join(__dirname,'../client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencode app.use(multer());
// for parsing multipart/form-data
app.use(bodyParser.json());

app.get('/', function (req, res){
   res.send('Hello World!');
});

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}!`);
});