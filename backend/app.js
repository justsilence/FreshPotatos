const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

mongoose.connect(mongoDB, {useNewUrlParser: true, retryWrites: true});

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var indexRouter = require('./routes/index');
// var studentsAPI = require('./api/students');
// var coursesAPI = require('./api/courses');


//use the static files in the public folder
app.use(express.static('public'));

//tell express where to get your views and which template engine to use
app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");


app.use('/', indexRouter);
app.use('/api/students/', studentsAPI);
app.use('/api/courses/', coursesAPI);


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});