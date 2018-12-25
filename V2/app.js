var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local");

var Camp       = require("./models/camp"),
    User       = require("./models/user"),
    Comment    = require("./models/comment"),
    seedDB     = require("./seeds");
    

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/camp", { useNewUrlParser: true });
// __dirname refers to the directory the current file (app.js) lives in;
// redundant saftey measure in case directory changes
app.use(express.static(__dirname + "/public"))
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Shikoba is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// this method comes from localPassportMongoose (next 3 lines):
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Camp.create(
//     {
//         name: "Everest",
//         img: "http://res.cloudinary.com/holiday-india/image/upload/Camping-Everest-Base-Camp_1439798320.jpg",
//         description: "The ultimate."
    
//     }, function(err, camp){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("New camp added!");
//             console.log(camp);
//         }
//     }
// );

// =====================================
//              MAIN ROUTES
// =====================================

// GET:/
app.get("/", function(req, res){
    res.render("landing");
})

// GET:/camps
app.get("/camps", function(req, res){
    Camp.find({}, function(err, allCamps){
        if(err){
            console.log(err);
        } else {
            res.render("camps/index", {camps: allCamps})
        }
    });
});

// POST:/camps
app.post("/camps", function(req, res){
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
app.get("/camps/new", function(req, res){
    res.render("camps/new");
});

// GET:/camps/:id
// SHOW more info about specified camp
app.get("/camps/:id", function(req, res){
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
})

// =====================================
//          COMMENTS ROUTES
// =====================================

// GET:/camps/:id/comments/new
// form to add a new comment
// isLoggedIn middleware NOT WORKING WHEN USER LOGGED IN!!!
app.get("/camps/:id/comments/new", isLoggedIn, function(req, res) {
    console.log("test1");
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
app.post("/camps/:id/comments", isLoggedIn, function (req, res) {
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

// =====================================
//             AUTH ROUTES
// =====================================

// GET:/register
// shows register form
app.get("/register", function(req, res) {
    res.render("register");
});

// POST:/register
// handles sign up login
app.post("/register", function(req, res) {
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
app.get("/login", function(req, res) {
    res.render("login");
})

// POST:/login
// handles login
// passport.authenticate() is middleware that checks if password is correct etc.
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/camps",
        failureRedirect: "/login"
    }), function(req, res) {
    
});

// GET:/logout
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/camps");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next;
    }
    res.redirect("/login");
};

app.listen(8000, function(){
    console.log("Camp Server");
});
