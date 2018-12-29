var express = require("express"),
    router  = express.Router();

var Camp       = require("../models/camp"),
    // we don't have to write "../middleware/index.js" because when the file is named index.js, it is the automatic file express will use
    middleware = require("../middleware");

// GET:/camps
/// displays all campgrounds
router.get("/", function(req, res){
    Camp.find({}, function(err, allCamps){
        if(err){
            console.log(err);
        } else {
            res.render("camps/index", {camps: allCamps})
        }
    });
});

// POST:/camps
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var img = req.body.img;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name: name, img: img, description: description, author: author};
    
    Camp.create(newCamp, function(err, newCamp){
        if(err){
            console.log(err);
        } else {
            console.log(newCamp);
            res.redirect("/camps");
        }
    })
});

// GET:/camps/new
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("camps/new");
});

// GET:/camps/:id
/// shows more info about specified camp
router.get("/:id", function(req, res){
    // finds camp with provided ID
    // populate("comments") will fill the comment fields (vs. only display the id of their arrays)
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        } else {
            console.log(foundCamp);
            res.render("camps/show", {camp: foundCamp});
        }
    });
});

// GET:/camps/:id/edit
/// edits given camp
router.get("/:id/edit", middleware.checkCampOwnership, function (req, res) {
    Camp.findById(req.params.id, function (err, foundCamp) {
        if(err) {
            req.flash("error", "you do not have authority to edit this");
            res.redirect("back");
        } else {
            res.render("camps/edit", { camp: foundCamp });
        }
    });
});

// PUT:/camp/:id
/// submits updated camp to db
router.put("/:id", middleware.checkCampOwnership, function(req, res) {
    /// finds and update the correct camp in one method (vs. doing findByID() then updating)
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCamp) {
        if(err) {
            res.redirect("/:id/edit");
        } else {
            /// only redirecting at this point since the method already updated the Camp values
            res.redirect("/camps/" + req.params.id);
        }
    });
});

// DELETE:/camp/:id
/// deletes given camp
router.delete("/:id", middleware.checkCampOwnership, function(req, res) {
    Camp.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/camps");
        } else {
            res.redirect("/camps");
        }
    });
});


module.exports = router;
