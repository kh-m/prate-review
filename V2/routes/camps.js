var express = require("express"),
    router  = express.Router();

var Camp = require("../models/camp")

// GET:/camps
// Displays all campgrounds
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
router.post("/", function(req, res){
    var name = req.body.name;
    var img = req.body.img;
    var description = req.body.description;
    var newCamp = {name: name, img: img, description: description};
    Camp.create(newCamp, function(err, camp){
        if(err){
            console.log(err);
        } else {
            res.redirect("/camps");
        }
    })
});

// GET:/camps/new
router.get("/new", function(req, res){
    res.render("camps/new");
});

// GET:/camps/:id
// SHOW more info about specified camp
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

module.exports = router;
