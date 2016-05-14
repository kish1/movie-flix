/**
 * Created by kishore on 5/14/16.
 */
"use strict";
module.exports = function (app, commentModel) {
    var auth = authorized;
    app.post("/api/comment/add", auth, postComment);
    app.get("/api/comment/title/:titleId", auth, findAllCommentsForTitle);

    function findAllCommentsForTitle(req, res) {
        var titleId = req.params.titleId;
        commentModel
            .findAllCommentsForTitle(titleId)
            .then(function (comments) {
                res.json(comments);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function postComment(req, res) {
        var comment = req.body;
        commentModel
            .postComment(comment)
            .then(function (response) {
                res.json(response);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
}
