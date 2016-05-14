/**
 * Created by kishore on 5/11/16.
 */
"use strict";
module.exports = function (mongoose) {
    var titleSchema = mongoose.Schema({
      Title: {type: String, index: true},
      Year: {type: String, index: true},
      Rated: String,
      Released: String,
      Runtime: String,
      Genre: {type: String, index: true},
      Director: String,
      Writer: String,
      Actors: String,
      Plot: String,
      Language: String,
      Country: String,
      Awards: String,
      Poster: String,
      Metascore: String,
      imdbRating: {type: String, index: true},
      imdbVotes: {type: String, index: true},
      imdbID: {type: String, index: true},
      Type: {type: String, index: true, enum: ["movie", "series"]},
      movieFlixRating: Number,
      movieFlixVotes: Number
    }, {collection: "title", autoIndex: false});

    return titleSchema;
};
