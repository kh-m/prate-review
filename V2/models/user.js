var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// this will add methods from passport-local-mongoose to userSchema
userSchema.plugin(passportLocalMongoose);

module.export = mongoose.model("User", userSchema);