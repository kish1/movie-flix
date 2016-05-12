/**
 * Created by kishore on 5/11/16.
 */
"use strict";
module.exports = function (mongoose) {
    var titleSchema = mongoose.Schema({
      Title: String,
      Year: String,
      Rated: String,
      Released: String,
      Runtime: String,
      Genre: String,
      Director: String,
      Writer: String,
      Actors: String,
      Plot: String,
      Language: String,
      Country: String,
      Awards: String,
      Poster: String,
      Metascore: String,
      imdbRating: String,
      imdbVotes: String,
      imdbID: String,
      Type: {type: String, enum: ["movie", "series"]},
      movieFlixRating: Number,
      movieFlixVotes: Number
    }, {collection: "title"});

    return titleSchema;
};
