/**
 * Created by kishore on 5/10/16.
 */
"use strict";
(function () {
    angular
        .module("MovieFlixApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var api = {
            login: login,
            logout: logout,
            register: register,

            findUserByEmail: findUserByEmail,
            findUserByCredentials: findUserByCredentials,

            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return api;

        function findUserByEmail(email) {
            return $http.get("/api/user/email/" + email);
        }

        function findUserByCredentials(email, password) {
            return $http.post("/api/user/find", {"email": email, "password": password});
        }

        function login(email, password) {
            return $http.post("/api/user/login", {"email": email, "password": password});
        }

        function logout() {
            return $http.post("/api/user/logout", {});
        }

        function register(user) {
            return $http.post("/api/user/register", user);
        }

        function getCurrentUser() {
            return $http.get("/api/user/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }
    }
})();
