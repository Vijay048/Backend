const express = require('express');
var cookieParser = require('cookie-parser');
const port = 8000;

const db = require('./config/mongoose');

const app =  express();

app.use(express.urlencoded());
app.use(cookieParser());

//use express routers
app.use('/', require('./routes'));

// view engine set up
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
