/**
 * Created by kishore on 5/12/16.
 */
"use strict";

module.exports = function (app, titleModel) {
    app.post("/api/admin/title", addTitle);
    app.put("/api/admin/title/:titleId", editTitle);
    app.delete("/api/admin/title/:titleId", deleteTitle);

    function deleteTitle(req, res) {
        if (isAdmin(req.user)) {
            var titleId = req.params.titleId;
            titleModel
                .deleteTitle(titleId)
                .then(function (response) {
                        res.json(response);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        } else {
            res.status(403);
        }

    }

    function editTitle(req, res) {
        if (isAdmin(req.user)) {
            var titleId = req.params.titleId;
            var newTitle = req.body;
            titleModel
                .editTitle(titleId, newTitle)
                .then(function (title) {
                        res.json(title);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        } else {
            res.status(403);
        }
    }

    function addTitle(req, res) {
        if(isAdmin(req.user)) {
            var title = req.body;
            titleModel
                .addTitle(title)
                .then(function (response) {
                        res.json(response);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        if(user.name === "Admin") {
            return true
        }
        return false;
    }
};
