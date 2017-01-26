var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')
var mongoose = require('mongoose');
var Feedback = require('../models/feedback.js');

// TODO: http://localhost:4000/feedback
router.get('/', function(req, res) {
  res.render('feedback/allfeedback.hbs', { feedback: feedback });
});

// // Feedback post TODO: http://localhost:4000/feedback/newpost
// router.get('/newpost', function(req, res) {
//   res.render('feedback/newpost.hbs');
// })

// router.post('/', authHelpers.authorized, function(req, res){
//   var FeedbackSchema= new Schema ({
//     subject: req.body.subject,
//     detail: req.body.detail,
//     // resolve:
//     // sort: {
//     //   postive: ,
//     //   negative:
//     // },
//     // views:
//     // created_at:
//     // updated_at:
//   });
//
//   Feedback.save(function(err, user){
//     if (err) console.log(err);
//
//     console.log(user);
//     console.log(Feedback.subject);
    // res.redirect('/users/allfeedback');
//   });
// });

// Feedback UPDATE ROUTE
router.patch('/:id', function(req, res){

});

// Feedback DESTROY
router.delete('/:id', function(req, res){

});


module.exports = router;
