pry = require('pryjs');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var logger = require('morgan');
var hbs = require('hbs')
var mongoose = require('mongoose');
var async = require("async");

var usersController = require('./controllers/users.js');
var sessionsController = require('./controllers/sessions.js');
var feedbackController = require('./controllers/feedback.js');

var app = express();

// ADD THE NAME OF YOUR DATABASE
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/sbc';
mongoose.connect(mongoURI);

app.set('view engine', 'hbs')
app.set('public')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger('dev'));
app.use(methodOverride('_method'));

app.use(session({
    secret: "derpderpderpcats",
    resave: false,
    saveUninitialized: false
}));

app.use('/users', usersController);
app.use('/sessions', sessionsController);
app.use('/feedback', feedbackController);

app.get('/', function(req, res) {
    res.redirect('/users')
});

app.listen(process.env.PORT || 4000, function() {
    console.log("AHOY! Your on port!");
});
