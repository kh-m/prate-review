var mongoose = require("mongoose");
var Camp = require("./models/camp");
var Comment = require("./models/comment");

var seeds = [
    {
        name: "Cloud's Rest",
        img: "http://s3.amazonaws.com/virginiablog/wp-content/uploads/2016/03/16115458/North-Bend-Park-Campground.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sit maxime obcaecati facilis inventore repudiandae voluptas suscipit, repellendus corporis, dolorum quis adipisci eligendi nihil laboriosam! Cum iusto deserunt suscipit recusandae sed impedit eum, placeat accusantium commodi expedita non error tempora incidunt odit atque harum unde illum distinctio aliquam provident quia!"

    },
    {
        name: "2",
        img: "http://s3.amazonaws.com/virginiablog/wp-content/uploads/2016/03/16115458/Mount-Rogers-and-Whitetop-Mountain.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sit maxime obcaecati facilis inventore repudiandae voluptas suscipit, repellendus corporis, dolorum quis adipisci eligendi nihil laboriosam! Cum iusto deserunt suscipit recusandae sed impedit eum, placeat accusantium commodi expedita non error tempora incidunt odit atque harum unde illum distinctio aliquam provident quia!"
    },
    {
        name: "Three",
        img: "https://blazepress.com/.image/t_share/MTI4OTg4NzQwODc3MDM2MTYz/amazing-camping-tent-view-25.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sit maxime obcaecati facilis inventore repudiandae voluptas suscipit, repellendus corporis, dolorum quis adipisci eligendi nihil laboriosam! Cum iusto deserunt suscipit recusandae sed impedit eum, placeat accusantium commodi expedita non error tempora incidunt odit atque harum unde illum distinctio aliquam provident quia!"
    }
];

async function seedDB() {
    try {
        await Camp.deleteMany({});
        console.log("Camps removed");
        await Comment.deleteMany({});
        console.log("Comments removed");

        for (const seed of seeds) {
            let camp = await Camp.create(seed);
            console.log("Camp created");
            let comment = await Comment.create(
                {
                    text: "Nice place.",
                    author: "Me"
                }
            )
            console.log("Comment created");
            camp.comments.push(comment);
            camp.save();
            console.log("Comment added to camp");
        }
    } catch (err) {
        console.log("Error while seeding:", err);
    }
};

module.exports = seedDB;
