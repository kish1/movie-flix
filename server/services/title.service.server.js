/**
 * Created by kishore on 5/11/16.
 */
"use strict";
module.exports = function (app, titleModel) {
    app.get("/api/title/browse", browseTitles);
    app.get("/api/title/toprated", topRatedTitles);
    app.get("/api/title/details/:imdbID", details);

    function details(req, res) {
        var imdbID = req.params.imdbID;
        titleModel
            .details(imdbID)
            .then(function (title) {
                res.json(title);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function topRatedTitles(req, res) {
        var type = req.query.type;
        titleModel
            .topRatedTitles(type)
            .then(function (titles) {
                res.json(titles);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function browseTitles(req, res) {
        var skipValue = req.query.skip;
        var limitValue = req.query.offset;
        var possibleArgs = ["type", "year", "genre", "name", "sortBy", "sortDesc"];
        var optionalArgs = {};
        for(var i in possibleArgs) {
            if (possibleArgs[i] in req.query) {
                optionalArgs[possibleArgs[i]] = req.query[possibleArgs[i]];
            }
        }
        titleModel
            .browseTitles(parseInt(skipValue), parseInt(limitValue), optionalArgs)
            .then(function (titles) {
                    res.json(titles);
            },
                function (err) {
                    res.status(400).send(err);
                });

    }
};