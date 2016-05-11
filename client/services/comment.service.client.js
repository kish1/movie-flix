/**
 * Created by kishore on 5/10/16.
 */
"use strict";
(function () {
    angular
        .module("MovieFlixApp")
        .factory("CommentService", CommentService);

    function CommentService($http) {
        var api = {
            addComment: addComment,
            getCommentsForTitle: getCommentsForTitle
        };

        function addComment(comment) {
            return $http.post("/api/comment/add", comment);
        }

        function getCommentsForTitle(titleId) {
            return $http.get("/api/comment/title/" + titleId);
        }
    }
})();
