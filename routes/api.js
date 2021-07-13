const express = require("express");
const router = express.Router();
const multer = require("multer");
//Importing the user model
const User = require("../models/User");
const Item = require("../models/Item");

/********* USER AUTHENTICATION and REGISTRATION *****************/
router.post("/register", function (req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });

  user.save(function (err) {
    if (err) {
      const errMsg =
        err.code === 11000
          ? Object.keys(err.keyValue)[0] + " already exists."
          : "please try again";
      res.status(500).json({ error: `Error registering new user, ${errMsg}` });
    } else {
      res.status(200).json({ user: user._id });
    }
  });
});

router.post("/authenticate", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          res.status(200).json({ user: user._id });
        }
      });
    }
  });
});

/***********************ADD NEW ITEM*************************/

router.post("/", (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    file: req.body.file,
    listItems: req.body.listItems,
    location: req.body.location,
    userid: req.body.userid,
  });
  newItem.save().then((item) => res.json(item));
});

/************************GET ITEMS BY EACH USER  **************/

router.get("/:userid", (req, res) => {
  Item.find({ userid: req.params.userid })
    .then((items) => res.json(items))
    .catch(() => res.status(404).json({ sucess: false }));
});

/***********DELETE ITEM ***************/
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) =>
      item.remove().then(() => res.status(200).json({ success: true }))
    )
    .catch(() => res.status(404).json({ sucess: false }));
});

/***********************UPDATE EXISTING ITEM*************************/

router.put("/:id", (req, res) => {
  const newItem = {
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    file: req.body.file,
    listItems: req.body.listItems,
    location: req.body.location,
    userid: req.body.userid,
  };
  Item.findById(req.params.id)
    .then((item) =>
      item.updateOne(newItem).then(() => {
        res.json({ success: true });
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false });
    });
});

/***********Upload Image ************/
const DIR = "./public/images/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/image", upload.single("cardImg"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    listItems: req.body.listItems,
    location: null,
    userid: req.body.userid,
    file: url + "/images/" + req.file.filename,
  });
  item
    .save()
    .then((item) => res.json(item))
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});
module.exports = router;
