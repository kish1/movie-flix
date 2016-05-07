/**
 * Created by kishore on 4/26/16.
 */
(function () {
    angular
        .module("MovieFlixApp")
        .controller("HomeController", HomeController);
    function HomeController() {
        var vm = this;

        vm.loginError = null;
        vm.registerError = null;

        vm.login = {};
        vm.register = {};

        vm.loginUser = loginUser;
        vm.registerUser = registerUser;

        var init = function () {

        };
        init();

        function loginUser(user) {

        }

        function registerUser(user) {

        }

    }
})();
