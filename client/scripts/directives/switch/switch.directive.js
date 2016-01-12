angular.module('hal9000').directive('ndSwitch', function() {
    return {
        templateUrl: 'client/scripts/directives/switch/switch.ng.html',
        restrict: 'EA',
        scope: true,
        bindToController: {
            id: '@',
            topic: '@',
            title: '@'
        },
        controllerAs: 'switchController',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            var vm = this;

            /**
             * Send command to the topic
             * on : {state: 1}
             * off: {state: 0}
             * @param value
             */
            vm.sendCommand = function (value) {
                var state = { state: value};
                //console.log('switchController send switch value:' + angular.toJson(state) + ' on the topic:' + vm.topic);
                LightsCommands.insert({topic : vm.topic, message: angular.toJson(state), broadcast: true });
            };

        }
    }
});