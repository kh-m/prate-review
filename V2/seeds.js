var mongoose = require("mongoose");
var Camp = require("./models/camp");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "http://s3.amazonaws.com/virginiablog/wp-content/uploads/2016/03/16115458/North-Bend-Park-Campground.jpg",
        description: "yeah yeah yeah"
    },
    {
        name: "2",
        image: "http://s3.amazonaws.com/virginiablog/wp-content/uploads/2016/03/16115458/Mount-Rogers-and-Whitetop-Mountain.jpg",
        description: "yeah yeah yeah"
    },
    {
        name: "Three",
        image: "https://blazepress.com/.image/t_share/MTI4OTg4NzQwODc3MDM2MTYz/amazing-camping-tent-view-25.jpg",
        description: "yeah yeah yeah"
    }
]

function seedDB() {
    // removes all camps
    Camp.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("remove campgrounds!");
            // loop through each camp in var data
            data.forEach(function (seed) {
                // then create a camp from each one of the data
                Camp.create(seed, function (err, camp) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a camp");
                        // creates a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was Internet",
                                author: "Sam"
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    // pushes the comment into comment field in array of camps
                                    camp.comments.push(comment);
                                    // saves the camp, with the new added comment
                                    camp.save();
                                    console.log("created new comment.");
                                }
                            }
                        );
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
