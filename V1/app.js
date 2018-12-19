var express = require("express");
var app = express();
app.set("view engine", "ejs");



app.listen(8000, function(){
    console.log("Camp Server");
});