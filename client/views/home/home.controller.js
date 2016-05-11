/**
 * Created by kishore on 4/26/16.
 */
(function () {
    angular
        .module("MovieFlixApp")
        .controller("HomeController", HomeController);
    function HomeController(UserService, $location) {
        var vm = this;

        vm.loginError = null;
        vm.registerError = null;

        vm.login = {};
        vm.register = {};

        vm.loginUser = loginUser;
        vm.registerUser = registerUser;

        var init = function() {
            UserService.setCurrentUser("0");
            UserService
                .getCurrentUser()
                .then(function (response) {
                    vm.currentUser = response.data;
                      if (vm.currentUser != "0") {
                        $location.path("/browse");
                    }
                });
        };
        init();

        function loginUser(user) {
            if(!user) {
                vm.loginError = "Invalid credentials";
                return;
            }
            vm.loginError = null;
            UserService
                .login(user.email, user.password)
                .then(function (response) {
                    if(response.data) {
                        console.log(response);
                        UserService.setCurrentUser((response.data));
                        $location.path("/browse");
                    } else {
                        vm.loginError = "User not found";
                    }
                });
        }

        function registerUser(user) {
            vm.registerError = null;
            if (!user) {
                vm.registerError = "Please fill in the fields";
                return;
            }
            if (!user.email) {
                vm.registerError = "Please enter your email";
                return;
            }
            if (!user.password || !user.confirm) {
                vm.registerError = "Please enter a password and confirm it";
                return;
            }
            if (user.password !== user.confirm) {
                vm.registerError = "The passwords do not match";
                return;
            }

            UserService.
                findUserByCredentials(user.email, user.password)
                .then(function(response) {
                    if (response.data) {
                        vm.message = "'" + user.email + "'" + " is already in use. Choose a different handle.";
                    } else {
                        UserService.
                            register(user)
                            .then(function(response) {
                                UserService.setCurrentUser(response.data);
                                $location.url("/browse");
                            });
                    }
                });
        }

    }
})();
