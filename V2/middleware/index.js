var Camp    = require("../models/camp"),
    Comment = require("../models/comment");

var middlewareObj = {};

// middleware to verify that user is logged in
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

// middleware to check if user is owner of camp post
middlewareObj.checkCampOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Camp.findById(req.params.id, function (err, foundCamp) {
            if (err) {
                /// this sends the user back to the previous page they were on
                res.redirect("back");
            } else {
                /// cannot use foundCamp.author.id === req.user._id because first one is actually a Mongoose object that gets printed out as a string
                /// so .equals method provided by Mongoose turns it into a string
                if (foundCamp.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

// middleware to check if user is owner of post
middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                /// this sends the user back to the previous page they were on
                res.redirect("back");
            } else {
                /// cannot use foundCamp.author.id === req.user._id because first one is actually a Mongoose object that gets printed out as a string
                /// so .equals method provided by Mongoose turns it into a string
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

module.exports = middlewareObj
