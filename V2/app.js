var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");

var campGrounds = [
    {name: "Kamloops", img: "https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
    {name: "Whistler", img: "http://iluvesports.com/wp-content/uploads/2014/08/camping-outdoors.jpg"},
    {name: "Squamish", img: "http://s3.amazonaws.com/digitaltrends-uploads-prod/2017/06/camping-tent-1500x1000.png"}
]

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campGrounds: campGrounds});
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var img = req.body.img;
    var newCampGround = {name: name, img: img};
    campGrounds.push(newCampGround);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.listen(8000, function(){
    console.log("Camp Server");
});
