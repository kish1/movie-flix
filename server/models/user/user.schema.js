/**
 * Created by kishore on 5/12/16.
 */
"use strict";
module.exports = function (mongoose) {
    var ratingSchema = mongoose.Schema({
        titleId: mongoose.Schema.ObjectId,
        rating: Number
    });

    var userSchema = mongoose.Schema({
        name: String,
        email: {type: String, required: true, index: {unique: true}},
        dob: Date,
        password: {type: String, required: true},
        ratings: [ratingSchema]
    }, {collection: "user"});

    return userSchema;
};
