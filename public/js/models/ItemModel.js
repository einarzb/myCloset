//starting
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema ({
	type: String,
	color: String,
  size: String,
  price: Number,
  brand: String,
  condition: String,
  date: String,
  image: String
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
