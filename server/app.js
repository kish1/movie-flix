/**
 * Created by kishore on 5/12/16.
 */
"use strict";
module.exports = function (app, mongoose) {
    var titleModel = require("./models/title/title.model.js")(mongoose);
    var userModel = require("./models/user/user.model.js")(mongoose);
    var commentModel = require("./models/comment/comment.model.js")(mongoose);

    var titleService = require("./services/title.service.server.js")(app, titleModel);
    var adminService = require("./services/admin.service.server.js")(app, titleModel);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var ratingService = require("./services/rating.service.server.js")(app, userModel, titleModel);
    var commentService = require("./services/comment.service.server.js")(app, commentModel);
};
