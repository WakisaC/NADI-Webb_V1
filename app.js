var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reportsRouter= require('./routes/reports');
var apiRouter = require('./routes/api')(router);
var loginRouter = require('./routes/login');


// add all variables here
var app = express();


//body parser for json data
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// getting-started for mongo db
mongoose.connect('mongodb://localhost:27017/test',function (err) {
    if(err){
      console.log("Not connected to MongoDb "+err);
    }
    else {console.log("connected!!!");}
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reports',reportsRouter);
app.use('/login',loginRouter);

// use the api router
app.use('/api',apiRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
