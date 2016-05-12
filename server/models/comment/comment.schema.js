/**
 * Created by kishore on 5/12/16.
 */
"use strict";
module.exports = function (mongoose) {
    var commentSchema = mongoose.Schema({
    userId: mongoose.Schema.ObjectId,
    name: String,
    titleId: mongoose.Schema.ObjectId,
    timestamp: Date,
    content: String
    }, {collection: "comment"});

    return commentSchema;
};
