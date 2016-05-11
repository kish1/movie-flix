/**
 * Created by kishore on 5/8/16.
 */
"use strict";
(function () {
    angular
        .module("MovieFlixApp")
        .controller("TopratedController", TopratedController);

    function TopratedController(TitleService, $location) {
        var vm = this;

        vm.type = null;
        vm.results = null;

        vm.topRated = topRated;
        vm.details = details;

        var init = function () {
            vm.type = "movie";
        };
        init();

        function topRated(type) {
            TitleService
                .topRated(type)
                .then(function (response) {
                    vm.results = response.data;
                    console.log(response);
                });
        }

        function details(imdbID) {
            $location.path("/details/" + imdbID);
        }
    }
})();
