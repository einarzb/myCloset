//require express dependancy for node work
var express = require('express');
var app = express();

//require mongoose dependancy
var mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING || "mongodb://localhost/closetdb");
var Item = require("./models/ItemModel.js");
var Look = require("./models/lookModel.js");

//body parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup directories for server access
app.use(express.static('public'));
app.use(express.static('node_modules'));

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
app.post('/look', function(req, res, next) {
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
    look.find(function (error, looks) { //beers is db name
          if (error) {
            console.error(error)
            return next(error); //express next function. middleware
          } else {
            res.send(looks);
            // console.log(cloestdb);
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
app.delete('/closetdb/:id', function (req, res, next) {
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
app.put('/closetdb/:id', function(req, res, next){
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
