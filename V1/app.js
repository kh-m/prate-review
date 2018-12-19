var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    var campGrounds = [
        {name: "Kamloops", img: "https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
        {name: "Whistler", img: "http://iluvesports.com/wp-content/uploads/2014/08/camping-outdoors.jpg"},
        {name: "Squamish", img: "http://s3.amazonaws.com/digitaltrends-uploads-prod/2017/06/camping-tent-1500x1000.png"}
    ]

    res.render("campgrounds", {campGrounds: campGrounds});
})

app.listen(8000, function(){
    console.log("Camp Server");
});
