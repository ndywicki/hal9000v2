angular.module('hal9000').directive('ndChartLine', function () {
    return {
        templateUrl: 'client/scripts/directives/chart/line/line.ng.html',
        restrict: 'E',
        scope: true,
        bindToController: {
            id: '@',
            topic: '@'
        },
        controllerAs: 'chartLine',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            var vm = this;
            vm.subscribe('sensor.test.last.one', () => {
                return [this.topic]
            });
            vm.helpers({
                sensor: () => {
                    return SensorTest.find();
                }
            });
            vm.autorun(() => {
                let sensor = this.getReactively('sensor');
                if(sensor) {
                    Meteor.call('getLastSensorData', 'minute', vm.topic, 10, function (error, sensor) {
                        //remove old chart values
                        vm.data = [];
                        vm.labels = [];
                        var values = [];
                        //build new chart objects
                        if(sensor) {
                            sensor.forEach(function (data) {
                                vm.labels.unshift(moment({
                                    hour: data._id.hour,
                                    minute: data._id.minute
                                }).format('HH:mm'));
                                //two digit
                                values.unshift(Math.round(data.avgValue * 10) / 10);
                            });
                        }
                        vm.data.push(values);
                    });
                }
            });
            this.options = { pointDot : false };
            this.enableModeSelection = false;
        }
    }
});