/**
 * Created by kishore on 5/13/16.
 */
"use strict";
var passport = require("passport");
var LocalStrategy = require("passport-local");
module.exports = function (app, userModel) {
    var auth = authorized;
    app.post("/api/user/register", register, passport.authenticate("local"), login);
    app.post("/api/user/login", passport.authenticate("local"), login);
    app.post("/api/user/logout", logout);
    app.get("/api/user/loggedin", loggedin);

    app.get("/api/user/email/:email", findUserByEmail);
    app.post("/api/user/find", findUserByCredentials);

    passport.use("local", new LocalStrategy({usernameField: "email", passwordField: "password"}, localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(email, password, done) {
        userModel
            .findUserByCredentials(email, password)
            .then(function (user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            });
    }

    function findUserByCredentials(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        userModel
            .findUserByCredentials(email, password)
            .then(function (user) {
                res.json(user);
            },
            function (err) {
               res.status(400).send(err);
            });
    }

    function findUserByEmail(req, res) {
        var email = req.params.email;
        userModel
            .findUserByEmail(email)
            .then(function (user) {
               res.json(user);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function register(req, res, next) {
        var user = req.body;
        userModel
            .findUserByEmail(user.email)
            .then(function (response) {
                if (response) {
                    res.json(null);
                } else {
                    return userModel.createUser(user);
                }
            },
            function (err) {
                res.status(400).send(err);
            })
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                       if (err) {
                           res.status(400).send(err);
                       } else {
                           next();
                       }
                    });
                }
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
