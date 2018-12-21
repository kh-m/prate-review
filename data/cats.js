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

// // add a cat to database
// // note that variable name does not matter here, ie if used again but to add other
// // cats, the george.save method only take in the data inside of it to save to DB, so
// // george is just how we refer to it insude our code, but not DB
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// // callback function added to make sure that the method can take time
// // and this ensures that the code is run after saving is done
// // Note: cat in function is what is being sent back from db
// george.save(function (err, cat) {
//     if(err) {
//         console.log("SOMETHING WENT WRONG!")
//     } else {
//         console.log("WE SAVED A CAT TO THE DB");
//         console.log(cat);
//     }
// });

// retrieve cats from database


// Searches for cats in the database
Cat.find({}, function (err, cats) {
    if (err) {
        console.log("SOMETHING WENT WRONG!")
        console.log(err);
    } else {
        console.log("WE FOUND (A) CAT(S) IN THE DB");
        console.log(cats);
    }
})
