'use strict';

angular.module('hal9000').controller('AlarmSensorsController', ['$scope', '$reactive',
    function ($scope, $reactive) {
        $reactive(this).attach($scope);
        var vm = this;
        vm.subscribe('alarm.sensors');
        vm.helpers({
            alarmSensors() {
                return AlarmSensors.find({}, {sort: {topic: 1}})
            }
        });
    }]);