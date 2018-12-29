var mongoose = require("mongoose");

// Schema setup, Camp
var campSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    comments: [
        {
            // 'referencing' the data (vs. embedding it)
            type: mongoose.Schema.Types.ObjectId,
            // "Comment" is the name of the model we are referencing
            ref: "Comment"
        }
    ],
    price: String
});

// Makes a model using above schema with methods in it like Camps.find() etc.
// ... or 'complies schema into a model'
// and exports it
module.exports = mongoose.model("Camp", campSchema);