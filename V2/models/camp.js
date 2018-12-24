var mongoose = require("mongoose");

// Schema setup, Camp
var campSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    comments: [
        {
            // 'referencing' the data (vs. embedding it)
            type: mongoose.Schema.Types.ObjectId,
            // "Comment" is the name of the model we are referencing
            ref: "Comment"
        }
    ]
});

// Makes a model using above schema with methods in it like Campground.find() etc.
// ... or 'complies schema into a model'
// and exports it
module.exports = mongoose.model("Camp", campSchema);