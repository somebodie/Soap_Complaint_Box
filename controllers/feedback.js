var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
// var authHelpers = require('../helpers/auth.js')
var mongoose = require('mongoose');
var Fb = require('../models/feedback.js');

router.get('/', function(req, res) {
  res.render('feedback/allfeedback.hbs');
});

module.exports = router;
