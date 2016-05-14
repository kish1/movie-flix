/**
 * Created by kishore on 5/11/16.
 */
"use strict";
module.exports = function (mongoose) {
    var TitleSchema = require("./title.schema.js")(mongoose);
    var TitleModel = mongoose.model("Title", TitleSchema);

    var api = {
        addTitle: addTitle,
        editTitle: editTitle,
        deleteTitle: deleteTitle,

        browseTitles: browseTitles,
        topRatedTitles: topRatedTitles,
        details: details,

        addRating: addRating
    };
    return api;

    function addRating(titleId, rating) {
        TitleModel.findById(titleId, "movieFlixRating movieFlixVotes", function (err, values) {
            if (!err) {
                var currentRating = values.movieFlixRating;
                var votes = values.movieFlixVotes;

                var newRating = (currentRating * votes + rating)/(votes + 1);
                votes += 1;
                return TitleModel.findOneAndUpdate(titleId, {movieFlixRating: newRating, movieFlixVotes: votes}, "movieFlixRating movieFlixVotes", {new: true});
            }
        });
    }


    function editTitle(titleId, newTitle) {
        return TitleModel.findByIdAndUpdate(titleId, newTitle, {new: true});
    }

    function deleteTitle(titleId) {
        return TitleModel.findByIdAndRemove(titleId);
    }

    function addTitle(title) {
        return TitleModel.create(title);
    }

    function details(imdbID) {
        return TitleModel.find({imdbID: imdbID});
    }

    function topRatedTitles(type) {
        return TitleModel.find({"Type": type}, "Title Year imdbRating imdbVotes Genre Poster").sort({imdbRating: -1});
    }

    function browseTitles(skipValue, limitValue, optionalArgs) {
        var search = {};
        var sortBy = {};
        if ("sortBy" in optionalArgs) {
            if (optionalArgs.sortBy === "year") {
                optionalArgs.sortBy = "Year";
            }
            sortBy[optionalArgs.sortBy] = optionalArgs.sortDesc === "true"? -1: 1;
        }
        if ("type" in optionalArgs) {
            search["Type"] = new RegExp(optionalArgs["type"], "i");
        }
        if ("year" in optionalArgs) {
            search["Year"] = new RegExp(optionalArgs["year"], "i");
        }
        if ("genre" in optionalArgs) {
            search["Genre"] = new RegExp(optionalArgs["genre"], "i");
        }
        if ("name" in optionalArgs) {
            search["Title"] = new RegExp(optionalArgs["name"], "i");
        }
        console.log(sortBy);
        return TitleModel.find(search, "Title Year imdbRating imdbVotes Genre Poster").sort(sortBy).skip(skipValue).limit(limitValue);
    }
};