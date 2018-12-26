var express = require("express"),
    router  = express.Router();
    passport = require("passport");

var User = require("../models/user");

// GET:/
// root route
router.get("/", function(req, res){
    res.render("landing");
})

// GET:/register
// shows register form
router.get("/register", function(req, res) {
    res.render("register");
});

// POST:/register
// handles sign up login
router.post("/register", function(req, res) {
    // .register method provided by passport-local-mongoose
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.redirect("register");
        }
        // telling passport to check/authenticate using 'local' strategy (vs. Google or FB etc.)
        passport.authenticate("local")(req, res, function() {
            res.redirect("/camps");
        });
    });
});

// GET:/login
// shows login for
router.get("/login", function(req, res) {
    res.render("login");
})

// POST:/login
// handles login
// passport.authenticate() is middleware that checks if password is correct etc.
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/camps",
        failureRedirect: "/login"
    }), function(req, res) {
    
});

// GET:/logout
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/camps");
});

// DOES NOT SEEM THIS IS NEEDED HERE
// function isLoggedIn(req, res, next) {
//     if(req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// };

module.exports = router;
