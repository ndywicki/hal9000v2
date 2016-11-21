'use strict';

angular.module('hal9000').controller('CameraController', ['$scope', '$sce',
    function ($scope, $sce) {
        $scope.dataSrc = "TODO";
        $scope.src = $sce.trustAsResourceUrl($scope.dataSrc);


        $scope.$watch('src', function() {
            //$("img").attr("src",$scope.src):
            console.log('Image loaded');
        });

    }]);

