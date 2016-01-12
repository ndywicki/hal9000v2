angular.module('hal9000').directive('ndChartPie', function() {
    return {
        templateUrl: 'client/scripts/directives/chart/pie/pie.ng.html',
        restrict: 'EA',
        scope: true,
        bindToController: {
            topic: '@',
            title: '@',
            color: '@'
        },
        controllerAs: 'chartPie',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            var vm = this;
            //subscribe to sensor of mqtt topic
            vm.subscribe('sensors', () => {
                return [vm.topic]
            });
            vm.helpers({
                sensor: () => {
                    return Sensors.findOne({topic: vm.topic});
                }
            });

            //update chart if new value
            vm.autorun(() => {
                let value = this.getReactively('sensor.message');
                if (value && vm.pieChartConfig) {
                    vm.pieChartConfig.series[0].data[0].y = value;
                    vm.pieChartConfig.series[0].data[1].y = 100 - value;
                }

            });
            //chart config with data by default
            vm.pieChartConfig = {

                options: {
                    chart: {
                        margin: [0, 0, 0, 0],
                        backgroundColor: null,
                        plotBackgroundColor: 'none'

                    },

                    credits: {
                        enabled: false
                    },

                    title: {
                        text: null
                    },

                    tooltip: {
                        formatter: function () {
                            return this.point.name + ': ' + this.y + ' %';

                        }
                    }
                },

                series: [
                    {
                        borderWidth: 2,
                        borderColor: '#F1F3EB',
                        shadow: false,
                        type: 'pie',
                        name: 'Income',
                        innerSize: '65%',
                        data: [
                            {name: 'load percentage', y: 10, color: vm.color},
                            {name: 'rest', y: (100 - 10), color: '#3d3d3d'}
                        ],
                        dataLabels: {
                            enabled: false,
                            color: '#000000',
                            connectorColor: '#000000'
                        }
                    }]
            };
        }
    }
});