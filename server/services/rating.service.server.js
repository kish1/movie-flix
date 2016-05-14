/**
 * Created by kishore on 5/13/16.
 */
"use strict";
module.exports = function (app, userModel, titleModel) {
    var auth = authorized;
    app.post("/api/rating/post", auth, postRating);
    app.get("/api/rating/:userId/has-rated/:titleId", hasRated);

    function hasRated(req, res) {
        var userId = req.params.userId;
        var titleId = req.params.titleId;

        userModel
            .hasRated(userId, titleId)
            .then(function (response) {
                var value = (!response[0])? "0" : "1";
                res.json(value);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function postRating(req, res) {
        var userId = req.body.userId;
        var titleId = req.body.titleId;
        var rating = parseInt(req.body.rating);
        console.log(titleId);

        titleModel
            .addRating(titleId, rating)
            .then(function (response) {
                userModel
                    .addRating(userId, titleId, rating)
                    .then(function(response){});
                res.json(response);
            });
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};
