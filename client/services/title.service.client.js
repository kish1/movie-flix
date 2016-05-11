/**
 * Created by kishore on 5/10/16.
 */
"use strict";
(function () {
    angular
        .module("MovieFlixApp")
        .factory("TitleService", TitleService);
    function TitleService($http) {
        var api = {
            browseTitles: browseTitles,
            topRated: topRated,
            titleDetails: titleDetails,
        };
        return api;

        function titleDetails(imdbID) {
            return $http.get("/api/title/details/" + imdbID);
        }

        function topRated(type) {
            return $http.get("/api/title/top-rated?type=" + type);
        }

        function browseTitles(skip, offset, optionalArgs) {
            var url = "/api/title/browse?skip=" + skip + "&offset=" + offset;
            var keys = Object.keys(optionalArgs);
            for(var i in keys) {
                url += "&" +  keys[i] + "=" + optionalArgs[keys[i]]
            }
            return $http.get(url);
        }
    }
})();
