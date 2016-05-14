/**
 * Created by kishore on 5/12/16.
 */
"use strict";
module.exports = function (mongoose) {
    var commentSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId, required: true},
    name: String,
    titleId: {type: mongoose.Schema.ObjectId, required: true},
    timestamp: Date,
    content: String
    }, {collection: "comment"});

    return commentSchema;
};
