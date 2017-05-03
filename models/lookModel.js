var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lookSchema = new Schema ({
	top: String,
	bottom: String,
});

var Look = mongoose.model('Look', lookSchema);

module.exports = Look;
