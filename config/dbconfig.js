const config = require('./config');
var pgp = require('pg-promise')({/*noWarnings: true*/});
var connectionString = config.db_string;

var db = pgp(connectionString);


if (!db){
  console.log({message: 'Failed Connect, cek your connection'}); 
}else{
  console.log({message: 'database Connected'}); 
}


module.exports = db;
