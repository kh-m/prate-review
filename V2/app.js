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

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    Camp.find({}, function(err, allCamps){
        if(err){
            console.log(err);
        } else {
            res.render("camps/index", {camps: allCamps})
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var img = req.body.img;
    var description = req.body.description;
    var newCampGround = {name: name, img: img, description: description};
    Camp.create(newCampGround, function(err, camp){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});

app.get("/campgrounds/new", function(req, res){
    res.render("camps/new");
});

// SHOW more info about specified camp
app.get("/campgrounds/:id", function(req, res){
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

app.get("/campgrounds/:id/comments/new", function(req, res) {
    // find camp by id
    Camp.findById(req.params.id, function(err, camp) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {camp: camp});
        }
    })
});

app.post("/campgrounds/:id/comments", function (req, res) {
    Camp.findById(req.params.id, function(err, camp) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect("/campgrounds/" + camp._id);
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
            res.redirect("/campgrounds");
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
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
    
});


app.listen(8000, function(){
    console.log("Camp Server");
});
