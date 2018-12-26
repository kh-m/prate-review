var express = require("express"),
    // mergeParams allows us to pass parameters so that simplifing the routes (e.g. "/new" vs. "/comments/:id/new") works
    router  = express.Router({mergeParams: true});

var Camp   = require("../models/camp");
var Comment   = require("../models/comment");

// GET:/camps/:id/comments/new
// form to add a new comment
// isLoggedIn middleware
router.get("/new", isLoggedIn, function(req, res) {
    // find camp by id
    Camp.findById(req.params.id, function(err, camp) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {camp: camp});
        }
    });
});

// POST:/camps/:id/comments
router.post("/", isLoggedIn, function (req, res) {
    Camp.findById(req.params.id, function(err, camp) {
        if(err) {
            console.log(err);
            res.redirect("/camps");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    // add username & id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    console.log(req.user.username);
                    // save comment
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect("/camps/" + camp._id);
                }
            });
        }
    });
});

// middleware to verify that user is logged in
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};


module.exports = router;
