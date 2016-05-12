/**
 * Created by kishore on 5/12/16.
 */
"use strict";
module.exports = function (mongoose) {
    var commentSchema = require("./comment/comment.model.js")(mongoose);
};
