/**
 * Created by kishore on 4/26/16.
 */
(function () {
    angular
        .module("MovieFlixApp")
        .config(configuration);
    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/browse", {
                templateUrl: "views/title/browse.view.html",
                controller: "BrowseController",
                controllerAs: "model",
                resolve: {loggedIn: checkLoggedIn}
            })
            .when("/toprated", {
                templateUrl: "views/title/toprated.view.html",
                controller: "TopratedController",
                controllerAs: "model",
                resolve: {loggedIn: checkLoggedIn}
            })
            .when("/details/:imdbID?", {
                templateUrl: "views/title/details.view.html",
                controller: "DetailsController",
                controllerAs: "model",
                resolve: {loggedIn: checkLoggedIn}
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {loggedIn: checkAdmin}
            })
            .when("/admin-edit", {
                templateUrl: "views/admin/admin-edit.view.html",
                controller: "AdminEditController",
                controllerAs: "model",
                resolve: {loggedIn: checkAdmin}
            })
            .otherwise({
                redirectTo: "/home"
            });

        function checkLoggedIn ($q, $timeout, $http, $location, $rootScope, UserService) {
            var deferred = $q.defer();
            $http.get("/api/user/loggedin").success(function(user) {
                //console.log(user);
                $rootScope.errorMessage = null;
                // User is Authenticated

                if (user !== "0") {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                }
                // User is Not Authenticated
                else
                {
                    deferred.reject();
                    $location.url("/home");
                }
            });
            return deferred.promise;
        }

        function checkAdmin ($q, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get("/api/user/loggedin").success(function(user) {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== "0" && user.name === "Admin") {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            });

            return deferred.promise;
        }
    }
})();
