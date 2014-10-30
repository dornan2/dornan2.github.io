/**
 * Created by Adrian on 22/10/2014.
 */

(function() {

    var app = angular.module("githubViewer", []);

    var MainController = function ($scope, $http) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        var onRepos = function(response){
            $scope.repos = response.data;
        }

        var onError = function (reason) {
            $scope.error = "Could not fetch user";
        };

        $scope.search = function(username){
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete);

        };

        $scope.upvote = function(){
            $scope.count = $scope.count + 10000;
        }

        $scope.downvote = function(){
            $scope.count = $scope.count - 10000;
        }

        $scope.count = 999;
        $scope.username = "angular";
        $scope.message = "GitHub viewer";
        $scope.repoSortOrder = "-stargazers_count";

    };

    app.controller("MainController", MainController);

}());