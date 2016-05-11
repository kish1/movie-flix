/**
 * Created by kishore on 5/10/16.
 */
"use strict";
(function () {
    angular
        .module("MovieFlixApp")
        .controller("AdminEditController", AdminEditController);

    function AdminEditController(AdminService, $location) {
        var vm = this;

        vm.updateTitle = updateTitle;

        var init = function () {
            vm.titleId = $location.search().titleId;
            AdminService
                .findTitle(vm.titleId)
                .then(function (response) {
                    vm.title = response.data;
                    var text = "";
                    var keys = Object.keys(vm.title);
                    for(var i in keys) {
                        text += keys[i] + ":" + vm.title[keys[i]];
                    }
                    vm.titleText = text;
                });
        };
        init();

        function updateTitle(text) {
            var obj = {};
            var lines = text.split("\n");
            for(var i in lines) {
                var parts = lines[i].split(":");
                obj[parts[0]] = parts[1];
            }
            AdminService
                .editTitle(vm.titleId, obj)
                .then(function(response) {})
        }
    }
})();
