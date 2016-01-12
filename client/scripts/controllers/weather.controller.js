'use strict';

angular.module('hal9000').controller('WeatherController', ['$scope', '$reactive', '$interval',
    function ($scope, $reactive, $interval) {
        $reactive(this).attach($scope);
        var vm = this;
        vm.subscribe('weather');
        vm.helpers({
            weather: () => {
                return Weather.findOne({});
            }
        });

        var tick = function() {
            vm.clock = Date.now();
        };
        tick();
        $interval(tick, 1000);

    }]);