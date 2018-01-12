var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('./auth');

router.param('username', function(req, res, next, username) {
  User.findOne({ username: username})
    .then(function (user) {
      if (!user) { return res.sendStatus(404); }

      req.guestUser = user;

      return next();
    }).catch(next);
});

router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.get('/users', auth.required, function(req, res, next){
  User.find().then(function(users){
    user_json = { users: []}
    var i = 0;
    for (user of users) {
      user_json.users[i] = user.toProfileJSONFor();
      i++;
    }
    return res.json(user_json);
  }).catch(next);
});

router.put('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.username !== 'undefined'){
      user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.firstname !== 'undefined'){
      user.firstname = req.body.user.firstname;
    }
    if(typeof req.body.user.lastname !== 'undefined'){
      user.lastname = req.body.user.lastname;
    }
    if(typeof req.body.user.password !== 'undefined' && req.body.user.password !== ""){
      user.setPassword(req.body.user.password);
    }
    if(typeof req.body.user.role !== 'undefined'){
      user.role = req.body.user.role;
    }
    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

router.post('/users/login', function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users', function(req, res, next){
  User.find().then(function(users){
    var user = new User();
    if(users.length == 0){ user.role = 'admin' }
    else { user.role = 'guest' }
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.firstname = req.body.user.firstname;
    user.lastname = req.body.user.lastname;
    user.setPassword(req.body.user.password);

    user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  }).catch(next);
});

router.get('/user/makeadmin/:username', auth.required, function(req, res, next) {
  console.log(req.payload);
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401);}
    if(user.role !== 'admin'){ return res.sendStatus(401);}
    req.guestUser.role = 'admin';
    req.guestUser.save().then(function() {
      return res.json({user: req.guestUser});
    }) 
  }).catch(next);
});

module.exports = router;
