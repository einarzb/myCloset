//require express dependancy for node work
var express = require('express');
var app = express();

//require mongoose dependancy
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/traveldb");
var Travel = require("./public/js/models/TravelModel.js");

//use body parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//declare port (heroku publication)
var port = /*process.env.PORT ||*/ 3030;

//setup directories for server access
app.use(express.static('public'));
app.use(express.static('node_modules'));

//find all travels in database, used to rendering all
app.get('/travels', function (req, res, next) {
  Travel.find(function (error, travels) {
    if (error) {
      console.error(error)
      return next(error);
    }
    res.send(travels);
  });
});

//find one travel in database
app.get('/travels/:id', function (req, res, next) {
  Travel.findById(req.params.id, function (error, travel) {
    if (error) {
      console.error(error)
      return next(error);
    }
    res.json(travel);
    console.log(travel);
  });
});

//post new travel to database
app.put('/travels', function(req, res, next) {
  Travel.create(req.body, function(err, travel) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
    res.send(travel);
	}
  });
});

//delete travel
app.delete('/travels/:id', function(req, res, next) {
  Travel.findByIdAndRemove(req.params.id, function(err,travel) {
    if (err) {
      console.error(err)
      return next(err);
    }
    res.send(travel._id);
  });
});

//add new rating for a travel to it's rating array
app.put('/travels/:id/rating', function(req, res, next) {
  Travel.findOneAndUpdate({_id: req.params.id }, { $push: req.body },{new:true},function(err,travels) {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.send(req.params.id);
  });
});

//edit existing travels
app.post('/travels/:id/update', function(req, res, next) {
  Travel.findOneAndUpdate({ _id: req.params.id },  {$set: req.body}, { new: true }, function(err) {
    if (err) {
      console.error(err);
      return next(err);
    } else {
      res.send(req.body);
    }
  });
});

//adding new review
app.post('/travels/:id/reviews', function(req, res, next) {
  Travel.findById(req.params.id, function(err, foundTravel) {
    if (err) {
      console.error(err);
      return next(err);
    } else if (!foundTravel) {
      return res.send("Error! No Travel found with that ID");
    } else {
      foundTravel.reviews.push(req.body)
      foundTravel.save(function(err, updatedTravel) {
        if (err) {
          return next(err);
        } else {
          res.send(updatedTravel);
        }
      });
    }
  });
});

//deleting a review
app.delete('/travels/:travelid/reviews/:reviewid', function(req, res, next) {
  Travel.findById(req.params.travelid, function(err, foundTravel) {
    if (err) {
      return next(err);
    } else if (!foundTravel) {
      return res.send("Error! No travel found with that ID");
    } else {
      var reviewToDelete = foundTravel.reviews.id(req.params.reviewid)
      if (reviewToDelete) {
        reviewToDelete.remove()
        foundTravel.save(function(err, updatedTravel) {
          if (err) {
            return next(err);
          } else {
            res.send(updatedTravel);
          }
        });
      } else {
        return res.send("Error! No review found with that ID");
      }
    }
  });
});

app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
});

// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

//start listening
app.listen(port, function () {
	console.log(port + " is listening to 3030");
});
