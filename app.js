/**
 * Connects to a MongoDB defined in the .env file.
 * @function createDatabaseConnection
 * @return {Promise}
 */
const createDatabaseConnection = () => {
  const dbName = process.env.MONGO_DATABASE_NAME;
  const dbAddress = process.env.MONGO_DATABASE_ADDRESS;
  const dbUsername = process.env.MONGO_DATABASE_USERNAME;
  const dbPassword = process.env.MONGO_DATABASE_PASSWORD;
  const mongoDbUrl = `mongodb://${dbUsername}:${dbPassword}@${dbAddress}/${dbName}`;
  const options = { useNewUrlParser: true };
  return mongoose.connect(mongoDbUrl, options);
};


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Mongoose Stuff
// 
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var LupanSchema = new Schema({
  level: {
    type: Number,
  },
  race: {
    type: String,
    enum: ['Big', 'Med', 'Small',]
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {np
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
