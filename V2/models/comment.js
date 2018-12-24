var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

// creates and exports model
module.exports = mongoose.model("Comment", commentSchema);
