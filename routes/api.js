const express=require('express');
const router=express.Router();

//Importing the user model
const User=require('../models/User');


/********* USER AUTHENTICATION and REGISTRATION *****************/
router.post('/register', function(req, res) {
    const { email, password } = req.body;
    const user = new User({ email, password });
    user.save(function(err) {
      if (err) {
        res.status(500)
          .send("Error registering new user please try again.");
      } else {
        res.status(200).send("Welcome to the all in one Notes app");
      }
    });
  });

router.post('/authenticate', function(req, res) {
const { email, password } = req.body;
User.findOne({ email }, function(err, user) {
    if (err) {
    console.error(err);
    res.status(500)
        .json({
        error: 'Internal error please try again'
    });
    } else if (!user) {
    res.status(401)
        .json({
        error: 'Incorrect email or password1'
        });
    } else {
    user.isCorrectPassword(password, function(err, same) {
        if (err) {
        res.status(500)
            .json({
            error: 'Internal error please try again'
        });
        } else if (!same) {
        res.status(401)
            .json({
            error: 'Incorrect email or password2'
        });
        } else {
        res.status(200).send("Welcome to the all in one Notes app");
        }
    });
    }
});
});


module.exports=router;