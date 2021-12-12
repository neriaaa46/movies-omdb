var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var moviesRouter = require('./routes/movies');

var app = express();
const cors = require("cors");
require("dotenv").config()

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))

app.use(express.static(path.join(__dirname, 'views')));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/movies', moviesRouter);


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
})


module.exports = app;
