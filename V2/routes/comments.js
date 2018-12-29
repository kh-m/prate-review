var express = require("express"),
    // mergeParams allows us to pass parameters so that simplifing the routes (e.g. "/new" vs. "/comments/:id/new") works
    router  = express.Router({mergeParams: true});

var Camp      = require("../models/camp"),
    Comment   = require("../models/comment"),
    // we don't have to write "../middleware/index.js" because when the file is named index.js, it is the automatic file express will use
    middleware = require("../middleware");

// GET:/camps/:id/comments/new
/// form to add a new comment
/// isLoggedIn middleware
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
router.post("/", middleware.isLoggedIn, function (req, res) {
    Camp.findById(req.params.id, function(err, camp) {
        if(err) {
            req.flash("error", "sorry, something went wrong");
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
                    req.flash("success", "successfully added comment");
                    res.redirect("/camps/" + camp._id);
                }
            });
        }
    });
});

//  GET:/camps/:id/comments/:comment_id/edit
/// displays form to edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
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
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
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
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err, deletedComment) {
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/camps/" + req.params.id);
        }
    });
});


module.exports = router;
