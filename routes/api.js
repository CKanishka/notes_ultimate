const express=require('express');
const router=express.Router();

//Importing the user model
const User = require('../models/User');
const Item = require('../models/Item');

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
        res.status(200).json({user:user._id});
        }
    });
    }
});
});
/***********************ADD NEW ITEM*************************/

router.post('/additem',(req,res)=>{
    const newItem = new Item({
        title:req.body.title,               
        description:req.body.description,     
        link:req.body.link,
        file:req.body.file,
        listItems:req.body.listItems,
        location:req.body.location,
        userid:req.body.userid
    });
    newItem.save().then((item)=>res.json(item));
})

/************************GET ITEMS BY EACH USER  **************/

router.get('/getitems/:userid',(req,res)=>{
    Item.find({userid:req.params.userid})    
        .then((items)=>res.json(items)) 
        .catch(()=>res.status(404).json({sucess:false}));   
})
module.exports=router;