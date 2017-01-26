var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
// var authHelpers = require('../helpers/auth.js')
var mongoose = require('mongoose');
var Feedback = require('../models/feedback.js');

// TODO: http://localhost:4000/feedback
router.get('/', function(req, res) {
  //Feedback.find()
  //db.feedback.find()
  res.render('feedback/allfeedback.hbs', {feedback: feedback});
});

// // Feedback post TODO: http://localhost:4000/feedback/newpost
// router.get('/newpost', function(req, res) {
//   res.render('feedback/newpost.hbs');
// })

// router.post('/', authHelpers.authorized, function(req, res){

 //this route will do 2 things at once:
  //1 .Create and save Feedback to feedback collection
  //2. Find the user this feedback belongs to and push it in that users' feedback array
      //why would we also do option 1? this will save time to access Feedback without the user
      // why would we do option 2? So that we can access feedback via the user

//   var newFeedback = new Feedback ({
//     subject: req.body.subject,
//     detail: req.body.detail,
//     resolve: false,
//     type: req.body.type,
//     // views:
//   });
//
//   Feedback.save(function(err, feedback){
//     if (err) console.log(err);
//
//     console.log(user);
//     console.log(Feedback.subject);

//   });

  //User.findById(req.session.currentUser._id)
  //access User.feedback
  //User.feedback.push(newFeedback)
  //.exec() <-- res.redirect back out

// });

// // Feedback Edit Route
// router.get('NEED TO DETERMINE ROUTE', function(req, res) {
//   // FIXME: need to detrmine what will be edited
// });

// // Feedback UPDATE ROUTE
// router.patch('/:id', function(req, res){
// // FIXME: after determine create determine how to fix
// });

// // Feedback DESTROY
// router.delete('/:id', function(req, res){
//   user.feedback.splice(req.params.id, 1); //remove the item from the array
//
//   res.redirect('/');
// });


module.exports = router;
