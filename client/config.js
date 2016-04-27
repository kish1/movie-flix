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
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
