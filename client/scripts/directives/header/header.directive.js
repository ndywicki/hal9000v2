//angular.module('hal9000').directive('ndHeader', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
angular.module('hal9000').directive('ndHeader', function ()  {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/directives/header/header-menu.ng.html',
        controllerAs: 'headerController',
        controller: function ($scope, $reactive, $location, $rootScope) {
            $reactive(this).attach($scope);
            var vm = this;
            vm.active = 'home';
            vm.isCollapsed = false;

            vm.toggleCollapsibleMenu = function() {
                vm.isCollapsed = !vm.isCollapsed;
            };

            // Collapsing the menu after navigation
            $scope.$on('$stateChangeSuccess', function() {
                vm.isCollapsed = false;

                //Apply body class depending path
                var path = $location.path();
                if(path === '/login') {
                    $rootScope.bodyClass = 'login';
                } else {
                    $rootScope.bodyClass = '';
                }
            });
            vm.isActive = function (path) {
                return $location.path() == path;
            };
            vm.logout = function() {
                Meteor.logout();
                $location.path("/home");
            };
        }
    };
});