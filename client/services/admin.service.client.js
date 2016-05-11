/**
 * Created by kishore on 5/10/16.
 */
"use strict";
(function () {
    angular
        .module("MovieFlixApp")
        .factory("AdminService", AdminService);

    function AdminService($http) {
        var api = {
            findTitle: findTitle,
            findAllTitles: findAllTitles,
            addTitle: addTitle,
            editTitle: editTitle,
            deleteTitle: deleteTitle
        };
        return api;

        function findAllTitles() {
            return $http.get("/api/admin/title/all");
        }

        function findTitle(titleId) {
            return $http.get("/api/admin/title/" + titleId);
        }

        function addTitle(title) {
            return $http.post("/api/admin/title", title);
        }

        function editTitle(titleId, title) {
            return $http.put("/api/admin/title/" + titleId, title);
        }

        function deleteTitle(titleId, title) {
            return $http.delete("/api/admin/title/" + titleId, title);
        }
    }
})();
