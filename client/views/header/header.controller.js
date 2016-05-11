/**
 * Created by kishore on 5/10/16.
 */
"use strict";
(function () {
    angular
        .module("MovieFlixApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location) {
        var vm = this;
        vm.logOut = logOut;

        function logOut() {
            UserService.logout()
                .then(function (res) {
                        UserService.setCurrentUser(null);
                        $location.url("/home");
                    },
                    function (err) {
                        vm.error = err;
                    });
        }
    }
})();
