//require express dependancy for node work
const express = require('express');
const expressSession = require('express-session'); //enable sessions
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;//most common & traditional strategy to authenticates a person using username & password.
const mongoose = require('mongoose');

//routing requirements
const authRoutes = require('./routes/authRoutes');

//mongoose models
const User = require('./models/userModel');
const Item = require("./models/ItemModel.js");
const Look = require("./models/lookModel.js");

const app = express();
mongoose.connect(process.env.CONNECTION_STRING || "mongodb://localhost/closetdb", function(err){
  if (err) throw err;
});

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup directories for server access
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(expressSession({
  secret:"thisIsAClosetSecret",
  resave: false,
  saveUninitialized: false
}));

// initializes passport and tells Express we want to use it as middleware
app.use(passport.initialize());
//makes sure our app is using passport's-session middleware!
app.use(passport.session());

// Configure passport-local to use User Model for authentication
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//serve routings
app.use('/users', authRoutes);

//ensure authenticated user to remove and edit items
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.send(401, { message: "Unauthorized" });
  }
};

//adding items
app.post('/closetdb', function(req, res, next) {
  Item.create(req.body, function(err, item) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send(item);
    }
  });
});

//adding looks
app.post('/looks', function(req, res, next) {
  Look.create(req.body, function(err, item) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      console.log("look server, item saved");
      console.log("item", item);
      res.send(item);
    }
  });
});

//populating looks from db
app.get('/looks', function (req, res, next) {
    Look.find(function (error, looks) { //beers is db name
          if (error) {
            console.error(error)
            return next(error); //express next function. middleware
          } else {
            res.send(looks);
            // console.log(cloestdb);
          }
     });
});

//removing look from db
app.delete('/looks/:id', ensureAuthenticated, function (req, res, next) {
    Look.remove({_id: req.params.id},function (err) {
          if (err) {
            console.error(err)
            return next(err); //express next function. middleware
          } else {
            res.send("look is gone");
          }
     });
});

//populating items from db
app.get('/closetdb', function (req, res, next) {
    Item.find(function (error, cloestdb) { //beers is db name
          if (error) {
            console.error(error)
            return next(error); //express next function. middleware
          } else {
            res.send(cloestdb);
            // console.log(cloestdb);
          }
     });
});

//removing item from db
app.delete('/closetdb/:id', ensureAuthenticated, function (req, res, next) {
    Item.remove({_id: req.params.id},function (err) {
          if (err) {
            console.error(err)
            return next(err); //express next function. middleware
          } else {
            res.send("item is gone");
          }
     });
});

//update
app.put('/closetdb/:id', ensureAuthenticated, function(req, res, next){
  //item before change
  Item.find({_id: req.params.id}).exec(function(err, item){
  });
  //item after edit
  Item.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}).exec(function( err, item){ //pass 3 things: id, req.body, boolean and func
     if(err){
      console.error(err);
      return next (err);
    }else{
      res.send(item);
    }
  });
});

//importent!
app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
});

//404 error
app.use(function(req, res, next){
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// main error handler -  warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

//start listening
app.listen(process.env.PORT || '2020', function() {
	console.log("CLUESET EVERY GIRLS DREAM");
});
