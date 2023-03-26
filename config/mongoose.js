const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codial_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console.Console,'error in connecting to db'));

db.once('open',function(){
    console.log('Successfully connect to db');
});