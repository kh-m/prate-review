var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            // 'referencing' the data (vs. embedding it)
            type: mongoose.Schema.Types.ObjectId,
            // refers to the modle User that will be used
            ref: "User"
        },
        username: String
    }
});

// creates and exports model
module.exports = mongoose.model("Comment", commentSchema);
