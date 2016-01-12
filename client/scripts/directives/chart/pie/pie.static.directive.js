angular.module('hal9000').directive('ndChartPieStatic', function() {
    return {
        templateUrl: 'client/scripts/directives/chart/pie/pie.ng.html',
        restrict: 'EA',
        scope: true,
        bindToController: {
            value: '=',
            title: '@',
            color: '@'
        },
        controllerAs: 'chartPie',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            var vm = this;

            vm.pieChartConfig = {

                options: {
                    chart: {
                        margin: [0, 0, 0, 0],
                        backgroundColor: null,
                        plotBackgroundColor: 'none',

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
                            {name: 'load percentage', y: vm.value, color: vm.color},
                            {name: 'rest', y: (100 - vm.value), color: '#3d3d3d'}
                        ],
                        dataLabels: {
                            enabled: false,
                            color: '#000000',
                            connectorColor: '#000000'
                        }
                    }]
            }

        }
    }
});