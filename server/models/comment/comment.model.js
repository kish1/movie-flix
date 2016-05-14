/**
 * Created by kishore on 5/12/16.
 */
"use strict";
module.exports = function (mongoose) {
    var CommentSchema = require("./comment.schema.js")(mongoose);
    var CommentModel = mongoose.model("Comment", CommentSchema);

    var api = {
        postComment: postComment,
        findAllCommentsForTitle: findAllCommentsForTitle
    };
    return api;

    function findAllCommentsForTitle(titleId) {
        return CommentModel.find({titleId: titleId});
    }

    function postComment(comment) {
        return CommentModel.create(comment);
    }
};
