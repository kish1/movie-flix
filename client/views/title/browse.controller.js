/**
 * Created by kishore on 5/5/16.
 */
"use strict";
(function () {
    angular
        .module("MovieFlixApp")
        .controller("BrowseController", BrowseController);

    function BrowseController(TitleService, $location) {
        var vm = this;

        vm.filters = {};
        vm.sortBy = null;
        vm.sortDesc = false;
        vm.results = [];
        vm.totalResults = null;
        vm.pageList = [];
        vm.skip = 0;
        vm.offset = 10;

        vm.browse = browse;
        vm.isActivePage = isActivePage;
        vm.details = details;


        var init = function () {
        };
        init();

        function browse(skip) {
            console.log("Skip " + skip);
            var optionalArgs = {};
            if (vm.filters.type) {
                optionalArgs.type = vm.filters.type;
            }
            if (vm.filters.year) {
                optionalArgs.year = vm.filters.year;
            }
            if (vm.filters.genre) {
                optionalArgs.genre = vm.filters.genre;
            }
            if (vm.filters.title) {
                optionalArgs.title = vm.filters.title;
            }
            if (vm.sortBy) {
                optionalArgs.sortBy = vm.sortBy;
                optionalArgs.sortDesc = vm.sortDesc;
            }
            console.log(optionalArgs);
            //console.log(vm.filters);

            vm.skip = skip;
            TitleService
                .browseTitles(vm.skip, vm.offset, optionalArgs)
                .then(function (resp) {
                    if (resp.data) {
                        vm.results = resp.data.results;
                        vm.totalResults = resp.data.totalResults;

                        vm.pageList = [];
                        for(var i=1; i<=Math.ceil(vm.totalResults/vm.offset); i++) {
                            vm.pageList.push(i);
                        }
                    }
                    console.log(resp);
                    //console.log(vm.results);
                });

        }

        function isActivePage($index) {
            return vm.skip == $index*10;
        }

        function details(imdbID) {
            $location.path("/details/" + imdbID);
        }
    }
})();
