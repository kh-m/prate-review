var mongoose = require("mongoose");
var Camp = require("./models/camp");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.steveandsandyhikes.com%2Fwp-content%2Fuploads%2F2016%2F03%2FIMG_5002.jpg&f=1",
        description: "yeah yeah yeah"
    },
    {
        name: "Cloud's Rest",
        image: "http://cascadeclimbers.com/plab/data/513/clouds07.JPG",
        description: "yeah yeah yeah"
    },
    {
        name: "Cloud's Rest",
        image: "https://www.backpacker.com/.image/t_share/MTQ0OTE0MDA0NzQ4ODA1ODYx/bp0615nps100_ordelheide_cloudsrest_750x400.jpg",
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
                Camp.create(seed, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a camp");
                        //add few comments
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
