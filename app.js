var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    flash          = require("connect-flash");

var Camp       = require("./models/camp"),
    User       = require("./models/user"),
    Comment    = require("./models/comment"),
    seedDB     = require("./seeds");
    
var indexRoutes     = require("./routes/index"),
    campRoutes      = require("./routes/camps"),
    commentsRoutes  = require("./routes/comments");

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
// "mongodb://localhost:27017/camp"
// mongodb://khaled:meswer-wozhig-1voSce@ds159204.mlab.com:59204/prate
mongoose.connect("mongodb://khaled:meswer-wozhig-1voSce@ds159204.mlab.com:59204/prate", { useNewUrlParser: true });
// __dirname refers to the directory the current file (app.js) lives in;
// redundant saftey measure in case directory changes:
app.use(express.static(__dirname + "/public"))
// to connect method-override to app (express) & listen at _method:
app.use(methodOverride("_method"));
// tells express to ues connect-flash:
app.use(flash());
// // seeds the db with the data (camps, users, comments etc)
// seedDB();

// --PASSPORT CONFIGURATION--
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

// passes currentUser (req.user) + message (res.locals.message) to all templates
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.successMessage = req.flash("success");
    res.locals.errorMessage = req.flash("error");
    next();
});

// tells app to use the routes declared
app.use(indexRoutes);
app.use("/camps", campRoutes);
app.use("/camps/:id/comments", commentsRoutes);


// app.listen(8000, function(){
//     console.log("Prate server running.");
// });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Prate server running.");
});
