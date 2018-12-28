var express = require("express"),
    // mergeParams allows us to pass parameters so that simplifing the routes (e.g. "/new" vs. "/comments/:id/new") works
    router  = express.Router({mergeParams: true});

var Camp   = require("../models/camp");
var Comment   = require("../models/comment");

// GET:/camps/:id/comments/new
/// form to add a new comment
/// isLoggedIn middleware
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
/// submits the new comment to the db
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

//  GET:/camps/:id/comments/:comment_id/edit
/// displays form to edit comment
router.get("/:comment_id/edit", function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back");
            console.log("error!");
        } else {
            res.render("comments/edit", {camp_id: req.params.id, comment: foundComment});
        }
    });
});

// PUT:/camps/:id/comments/:comment_id
/// submits edited comment
router.put("/:comment_id", function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/camps/" + req.params.id);
        }
    });
});

// DELETE:/camps/:id/comments/:comment_id
/// deletes given comment
router.delete("/:comment_id", function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err, deletedComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/camps/" + req.params.id);
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
