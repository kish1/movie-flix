/**
 * Created by kishore on 5/10/16.
 */
"use strict";
(function () {
    angular
        .module("MovieFlixApp")
        .contorller("AdminController", AdminController);

    function AdminController(AdminService, $location) {
        var vm = this;

        vm.title = null;

        vm.addTitle = addTitle;
        vm.editTitle = editTitle;
        vm.deleteTitle = deleteTitle;

        var init = function() {
            vm.title = {};
            AdminService
                .findAllTitles()
                .then(function (response) {
                    vm.titles = response.data;
                });
        };
        init();


        function addtitle(title) {
            AdminService
                .addTtile(title)
                .then(function (response) {
                    vm.titles.push(response.data);
                    vm.title = {};
                });
        }

        function editTitle($index) {
            $location.search("titleId", vm.titles[$index]._id).path("/admin-edit");
        }

        function deleteTitle($index) {
            AdminService
                .deleteTitle(vm.titles[$index]._id)
                .then(function (response) {
                    vm.titles.splice($index, 1);
                });
        }
    }
})();
