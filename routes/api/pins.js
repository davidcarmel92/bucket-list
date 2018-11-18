const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const fs = require('fs');

const Pin = require('../../models/Pin');
const validatePinInput = require('../../validation/pin');
const validatePostInput = require('../../validation/post');

const app = express();

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
   destination: "./public/uploads/",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage
}).single("myImage");


const User = require('../../models/User');

// @route  GET api/pins/profile/profile_id
// @desc   Get pins by profile id
// @access Public
router.get('/profile/:profile_id', async (req,res) => {
  const profileId = req.params.profile_id;

  try{
    const profile = await Profile.findById(profileId)
    const pins = await Pin.where('user', profile.user).sort({date: -1})
    res.json(pins)
  }
  catch(e) {
    res.status(404).json({nopinsfound: 'No pins found.'})
  }
});

// @route  GET api/pins/
// @desc   Get posts
// @access Public
router.get('/user/:user_id', async (req,res) => {
  const user = req.params.user_id;

  try {
    const pins = await Pin.where('user', user).sort({date: -1})
    res.json(pins)
  }
  catch(e) {
    res.status(404).json({nopinsfound: 'No pins found.'})
  }


});

// @route  POST api/pins/
// @desc   Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req,res) => {

  const { errors, isValid } = validatePinInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors)
  }


  const newPin = new Pin({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    img: {data: null, contentType: 'image/png'},
    user: req.user.id
  })


  newPin.save().then(pin => res.json(pin))
});
router.post('/photo', upload, passport.authenticate('jwt', { session: false }), (req,res) => {

  // const { errors, isValid } = validatePinInput(req.body);
  //
  // if(!isValid) {
  //   return res.status(400).json(errors)
  // }

  console.log(req.file)

  const newPin = new Pin({
    title: 'oh',
    description: 'oh',
    status: 'todo',
    img: {data: fs.readFileSync(req.file.path), contentType: 'image/png'},
    user: req.user.id
  })


  newPin.save().then(pin => res.json(pin))
});


// @route  POST api/pins/update/:pin_id
// @desc   Update post
// @access Private
router.post('/update/:pin_id', passport.authenticate('jwt', { session: false }), (req,res) => {

  // const { errors, isValid } = validatePostInput(req.body);
  //
  // if(!isValid) {
  //   return res.status(400).json(errors)
  // }

  const user_id = req.user.id;
  const pin_id = req.params.pin_id;
  const value = req.body.value;
  const edit = req.body.edit;

  if(edit === 'rating' && value > 5){
    res.status(404).json({rating: 'Rating must be between 0 and 5'})
  }

  var update = {}
  update[edit] = value;

  Pin.findById(pin_id)
    .then(pin => {
      if(user_id == pin.user){
        Pin.findByIdAndUpdate(pin_id, { $set: update }, { new: true })
          .then(pin => res.json(pin))
          .catch(err => res.status(404).json({nopostfound: 'No pin found.'}));
      }
      else {
        res.status(404).json({notauthorized: 'User not authorized'})
      }
    })
    .catch(err => res.status(404).json({nopinfound: 'No pin found with that id.'}))

});

// @route  GET api/pins/pin/:pin_id
// @desc   Update post
// @access Private
router.get('/pin/:pin_id', passport.authenticate('jwt', { session: false }), (req,res) => {

  // const { errors, isValid } = validatePostInput(req.body);
  //
  // if(!isValid) {
  //   return res.status(400).json(errors)
  // }

  const user_id = req.user.id;
  const pin_id = req.params.pin_id;

  Pin.findById(pin_id)
    .then(pin => res.json(pin))
    .catch(err => res.status(404).json({nopinfound: 'No pin found with that id.'}))

});

// @route  DELETE api/pins/:pin_id
// @desc   Get posts by id
// @access Private
router.delete('/:pin_id', passport.authenticate('jwt', { session: false }), (req,res) => {

  const user_id = req.user.id;
  const pin_id = req.params.pin_id;

  Pin.findById(pin_id)
    .then(pin => {
      if(user_id == pin.user){
        pin.remove().then(() => res.json(pin))
      }
      else {
        res.status(404).json({notauthorized: 'User not authorized'})
      }
    })
    .catch(err => res.status(404).json({nopostfound: 'No pin found.'}));
});

// @route  POST api/pins/like/:id
// @desc   Like pin
// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req,res) => {

    Pin.findById(req.params.id)
      .then(pin => {
        if(pin.likes.filter(like => like.user.toString() === req.user.id).length > 0){
          return res.status(400).json({alreadylike: 'User already liked this pin.'})
        }
        pin.likes.unshift({ user: req.user.id });

        pin.save().then(pin => res.json(pin));
      })
      .catch(err => res.status(404).json({nopinfound: 'No pin found.'}))
});

// @route  POST api/pins/unlike/:id
// @desc   Like pin
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }),  (req,res) => {

    Pin.findById(req.params.id)
      .then(pin => {
        if(pin.likes.filter(like => like.user.toString() === req.user.id).length === 0){
          return res.status(400).json({alreadylike: 'User hasn\'t liked this pin.'})
        }
        const removeIndex = pin.likes.map(item => item.user.toString()).indexOf(req.user.id);
        pin.likes.splice(removeIndex, 1);
        pin.save().then(pin => res.json(pin))
      })
      .catch(err => res.status(404).json({nopinfound: 'No pin found.'}))
});

// @route  POST api/pins/comment/:id
// @desc   Add comment to pin
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req,res) => {

  const { errors, isValid } = validatePostInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors)
  }

  Pin.findById(req.params.id)
    .then(pin => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        user: req.user.id
      }

      pin.comments.unshift(newComment);
      pin.save().then(pin => res.json(pin))
    })
    .catch(err => res.status(404).json({nopostfound: 'No post found.'}))
});

// @route  DELETE api/pins/comment/:id/:comment_id
// @desc   remove comment from pin
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req,res) => {
  Pin.findById(req.params.id)
    .then(pin => {
      if(pin.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentdoesnnotexist: 'Comment does not exist.'})
      }
      const removeIndex = pin.comments
      .map(item => item._id.toString()).indexOf(req.params.comment_id);

      pin.comments.splice(removeIndex, 1);
      pin.save().then(pin => res.json(pin))
    })
    .catch(err => res.status(404).json({nopostfound: 'No pin or comment found.'}))
});

// @route  DELETE api/pins/edit-comment/:comment_id
// @desc   remove comment from pin
// @access Private
router.post('/edit-comment/:comment_id', passport.authenticate('jwt', { session: false }), (req,res) => {

  const { errors, isValid } = validatePostInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors)
  }

  const comment_id = req.params.comment_id;

  Pin.update({'comments._id': comment_id}, { $set: { 'comments.$.text': req.body.text} }, { new: true })
    .then(pin => res.json(pin))
    .catch(err => res.status(404).json({nopostfound: 'No pin found.'}));
});

module.exports = router;
