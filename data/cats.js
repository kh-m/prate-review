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
var Cat = mongoose.model("Cat", catSchema);

// add a cat to database
var george = new Cat({
    name: "George",
    age: 11,
    temperament: "Grouchy"
});

// callback function added to make sure that the method can take time
// and this ensures that the code is run after saving is done
george.save(function (err, cat) {
    if(err) {
        console.log("SOMETHING WENT WRONG!")
    } else {
        console.log("WE SAVED A CAT TO THE DB");
        console.log(cat);
    }
});

// retrieve cats from database
