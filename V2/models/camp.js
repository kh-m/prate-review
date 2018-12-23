var mongoose = require("mongoose");

// Schema setup, Camp
var campSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String
});

// Makes a model using above schema with methods in it like Campground.find() etc.
// ... or 'complies schema into a model'
// and exports it
module.exports = mongoose.model("Camp", campSchema);