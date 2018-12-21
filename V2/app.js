var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/camp", { useNewUrlParser: true });

// Schema setup
var campSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String
});

// Makes a model using above schema with methods in it like Campground.find() etc.
// ... or 'complies schema into a model'
var Camp = mongoose.model("Camp", campSchema);

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
            res.render("index", {camps: allCamps})
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
    res.render("new");
});

// SHOW more info about specified camp
app.get("/campgrounds/:id", function(req, res){
    // finds camp with provided ID
    Camp.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
        } else {
            res.render("show", {camp: foundCamp});
        }
    });
})

app.listen(8000, function(){
    console.log("Camp Server");
});
