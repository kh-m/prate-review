var Camp    = require("../models/camp"),
    Comment = require("../models/comment");

var middlewareObj = {};

// middleware to verify that user is logged in
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // adding this line will not display anything; it will only give ability to display when it's passed to redirected page
    req.flash("error", "You must be logged in");
    res.redirect("/login");
};

// middleware to check if user is owner of camp post
middlewareObj.checkCampOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Camp.findById(req.params.id, function (err, foundCamp) {
            if (err || !foundCamp) {
                req.flash("error", "camp not found");
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
        req.flash("error", "you need to be logged in");
        res.redirect("back");
    }
};

// middleware to check if user is owner of post
middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err || !foundComment) {
                /// this sends the user back to the previous page they were on
                res.redirect("back");
                req.flash("error", "comment not found");
            } else {
                /// cannot use foundCamp.author.id === req.user._id because first one is actually a Mongoose object that gets printed out as a string
                /// so .equals method provided by Mongoose turns it into a string
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "you don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "you need to be logged in to do that");
        res.redirect("back");
    }
};

module.exports = middlewareObj
