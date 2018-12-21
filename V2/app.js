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
    img: String
});

// Makes a model using above schema with methods in it like Campground.find() etc.
var Camp = mongoose.model("Camp", campSchema);

// Camp.create(
//     {
//         name: "Whistler",
//         img: "http://iluvesports.com/wp-content/uploads/2014/08/camping-outdoors.jpg"
    
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
            res.render("campgrounds", {camps: allCamps})
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var img = req.body.img;
    var newCampGround = {name: name, img: img};
    campGrounds.push(newCampGround);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(8000, function(){
    console.log("Camp Server");
});
