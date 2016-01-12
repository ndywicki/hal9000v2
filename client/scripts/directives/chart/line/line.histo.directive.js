angular.module('hal9000').directive('ndChartLineHisto', function () {
    return {
        templateUrl: 'client/scripts/directives/chart/line/line.ng.html',
        restrict: 'E',
        scope: true,
        bindToController: {
            id: '@',
            topic: '@'
        },
        controllerAs: 'chartLine',
        controller: function($scope, $reactive) {
            $reactive(this).attach($scope);

            var vm = this;

            vm.subscribe('sensor.test.last.one', () => {
                return [vm.topic]
            });
            vm.helpers({
                sensor: () => {
                    return SensorTest.find({topic: vm.topic});
                }
            });

            vm.modes = ['minute', 'hour', 'day', 'month', 'year'];
            vm.mode = vm.modes[1]; // hour

            function updateChart(topic, mode) {
                //console.log('updateChart01 this.mode: '+mode+' this.topic:'+topic);
                Meteor.call('getLastSensorData', mode, topic, 10, function (error, sensor) {
                    //console.log('getLastSensorData sensor:' + angular.toJson(sensor) +' topic:'+topic+ ' mode:'+angular.toJson(mode));
                    vm.labels = [];
                    vm.data = [];
                    var values = [];
                    sensor.forEach(function (data) {
                        //console.log('getLastSensorData data:' + angular.toJson(data));
                        //console.log('Foramt date:'+moment({hour: data._id.hour, minute:data._id.minute}).format('HH\hmm'));
                        if(mode === 'minute' || mode === 'hour') {
                            vm.labels.unshift(moment({hour: data._id.hour, minute:data._id.minute}).format('HH:mm'));
                            //$scope.labels.unshift();
                        } else if (mode === 'hour') {
                            vm.labels.unshift(data._id.hour + 'h00');
                        } else if (mode === 'day') {
                            vm.labels.unshift(data._id.day + '/' + data._id.month);
                        } else if (mode === 'month') {
                            vm.labels.unshift(data._id.month + '/' + data._id.year);
                        } else if (mode === 'year') {
                            vm.labels.unshift(data._id.year);
                        }
                        values.unshift(Math.round(data.avgValue * 10) / 10);
                    });
                    vm.data.push(values);
                    $scope.$apply();
                });
            }
            //init chart sensor values
            updateChart(this.topic, this.mode);

            this.updateMode = function() {
                console.log('LineController updateMode mode:'+ angular.toJson(vm.mode));
                updateChart(vm.topic, vm.mode);
            };

            vm.options = { pointDot : false };
            vm.enableModeSelection = true;
            vm.onClick = function (points, evt) {
                console.log(points, evt);
            };
        }
    }

});