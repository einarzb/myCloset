//require express dependancy for node work
var express = require('express');
var app = express();
//declare port (heroku publication)
var port = /*process.env.PORT ||*/ 3000;

//require mongoose dependancy
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/closetdb");
var Item = require("./public/js/models/ItemModel.js");

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

//start listening
app.listen(port, function () {
	console.log(port + " is broadcasting");
});
