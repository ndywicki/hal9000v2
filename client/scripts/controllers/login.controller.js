'use strict';

angular.module('hal9000').controller('LoginController', ['$scope', '$rootScope', '$location',
    function ($scope, $rootScope, $location) {

        $scope.submit = function() {
            Meteor.loginWithPassword($scope.username, $scope.password, function(error) {
                //$scope.username = '';
                //$scope.password = '';
                if (error) {
                    console.log(error.reason);
                    $scope.error = true;
                } else {
                    $location.path("/home");
                }
            });

        };
    }]);