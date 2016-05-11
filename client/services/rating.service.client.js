/**
 * Created by kishore on 5/10/16.
 */
"use strict";
(function () {
    angular
        .module("MovieFlixApp")
        .factory("RatingService", RatingService);

    function RatingService($http) {

        var api = {
            postRating: postRating,
            checkRated: checkRated
        };
        return api;

        function postRating(userId, titleId, rating) {
            return $http.post("/api/rating/post?userId=" + userId + "&titleId=" + titleId, {"rating": rating});
        }

        function checkRated(userId, titleId) {
            return $http.get("/api/rating/" + userId + "/has-rated/" + titleId);
        }
    }
})();
