/**
 * Created by kishore on 5/9/16.
 */
"use strict";
(function () {
    angular
        .module("MovieFlixApp")
        .controller("DetailsController", DetailsController);

    function DetailsController(TitleService, UserService, RatingService, CommentService, $routeParams, $location) {
        var vm = this;
        vm.hasRated = null;
        vm.rateMessage = null;
        vm.ratingButton = {};

        vm.rate = rate;

        var init = function () {
            vm.hasRated = false;
            vm.rateMessage = "Rate";
            vm.rating = null;
            vm.ratingButton = {
                "btn": true,
                "btn-default": true,
                "btn-primary": false
            };
            vm.imdbID = $routeParams.imdbID;
            if(!vm.imdbID) {
                $location.path("/browse");
                return;
            }
            TitleService
                .titleDetails(vm.imdbID)
                .then(function (response) {
                    vm.title = response.data;

                    UserService
                        .getCurrentUser()
                        .then(function (response) {
                            vm.currentUser = response.data;
                            RatingService
                                .checkRated(vm.currentUser._id, vm.title._id)
                                .then(function (response) {
                                    if (response.data === "0") {
                                        vm.hasRated = false;
                                        vm.rateMessage = "Rate";
                                    } else {
                                        vm.hasRated = true;
                                        vm.rating = response.data;
                                        vm.rateMessage = "Rated (" + vm.rating + ")";
                                    }
                                });
                        });
                    CommentService
                        .getCommentsForTitle(vm.title._id)
                        .then(function (response) {
                           if(response.data) {
                               vm.comments = response.data;
                           }
                        });
                });
        };
        init();

        function rate(rating) {
            RatingService
                .postRating(vm.currentUser._id, vm.title._id, rating)
                .then(function (response) {
                    if (response.data) {
                        vm.title.movieFlixRating = response.data.movieFlixRating;
                        vm.title.movieFlixVotes = response.data.movieFlixVotes;
                    }
                });
        }

        function addComment(comment) {
            comment.timestamp = new Date();
            comment.userId = vm.currentUser._id;
            comment.name = vm.currentUser.name;
            comment.titleId = vm.title._id;
            CommentService
                .addComment(comment)
                .then(function () {});
        }
    }
})();
