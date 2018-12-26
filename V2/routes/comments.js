var express = require("express"),
    // mergeParams allows us to pass parameters so that simplifing the routes (e.g. "/new" vs. "/comments/:id/new") works
    router  = express.Router({mergeParams: true});

var Camp   = require("../models/camp");
var Comment   = require("../models/comment");

// GET:/camps/:id/comments/new
// form to add a new comment
// isLoggedIn middleware NOT WORKING WHEN USER LOGGED IN!!!
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
