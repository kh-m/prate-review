var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true });

// This is like a struct ... I think
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// Creats a Cat object that allows us to use methods like Cat.find Cat.remove etc.
// "Cat" in model is the singular version of the collection name;
// Mongoose knows how to make it plural ie cat > cats, person > people etc
var Cat = mongoose.model("Cat, catSchema");


// add a cat to database

// retrieve cats from database
