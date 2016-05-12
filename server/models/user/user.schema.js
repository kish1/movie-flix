/**
 * Created by kishore on 5/12/16.
 */
"use strict";
module.exports = function (mongoose) {
    var ratingSchema = mongoose({
        titleId: mongoose.Schema.ObjectId
    });

    var userSchema = mongoose.Schema({
        name: String,
        email: String,
        dob: Date,
        password: String,
        ratings: [ratingSchema]
    }, {collection: "user"});

    return userSchema;
};
