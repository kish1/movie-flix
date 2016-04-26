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
            .when("/admin-home", {
                templateUrl: "views/admin/admin-home.view.html",
                controller: "AdminHomeController",
                controllerAs: "model"
            })
            .when("/admin-edit", {
                templateUrl: "views/admin/admin-edit.view.html",
                controller: "AdminEditController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
