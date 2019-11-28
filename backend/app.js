const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
var passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();
// init project
const mongoDB = ("mongodb+srv://"+
                 process.env.USERNAME+
                 ":"
                 +process.env.PASSWORD+
                 "@"
                 +process.env.HOST+
                 "/"
                 +process.env.DATABASE);
// console.log("Connection String: "+mongoDB);

mongoose.connect(mongoDB, {useNewUrlParser: true, retryWrites: true, useUnifiedTopology: true});

//debugging 
mongoose.connection.on('connected', function (){
  console.log('Mongoose connected to '+process.env.DATABASE);
});

mongoose.connection.on('error', function (err){
  console.log('Mongoose connection error: '+err);
});

mongoose.connection.on('disconnected', function (){
  console.log('Mongoose disconnected.');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var indexRouter = require('./routes/index');

//use the static files in the public folder
app.use(express.static('public'));

app.use('/api', indexRouter);


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});