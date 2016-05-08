/**
 * Created by kishore on 5/5/16.
 */
"use strict";
(function () {
    angular
        .module("MovieFlixApp")
        .controller("BrowseController", BrowseController);

    function BrowseController() {
        var vm = this;

        vm.filter = {};
        vm.sort = null;
        vm.results = [];

        vm.start = 0;
        vm.offset = 10;
    }
})();
