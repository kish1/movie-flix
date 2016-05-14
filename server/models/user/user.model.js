/**
 * Created by kishore on 5/12/16.
 */
"use strict";
module.exports = function (mongoose) {
    var UserSchema = require("./user.schema.js")(mongoose);
    var UserModel = mongoose.model("User", UserSchema);

    var api = {
        findUserByEmail: findUserByEmail,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,

        addRating: addRating,
        hasRated: hasRated
    };
    return api;

    function hasRated(userId, titleId) {
        return UserModel.find({_id: userId, "ratings.titleId": titleId}, {"ratings.$": 1});
    }

    function addRating(userId, titleId, rating) {
        return UserModel.findByIdAndUpdate(userId, {$addToSet: {ratings: {titleId: titleId, rating: rating}}});
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserByCredentials(email, password) {
        return UserModel.findOne({email: email, password: password});
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByEmail(email) {
        return UserModel.findOne({email: email});
    }
};
