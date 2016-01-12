angular.module('hal9000').directive('ndAlarmEventsList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/scripts/directives/alarm/alarm.events.ng.html',
        controllerAs: 'alarmEventsList',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            this.perPage = 10;
            this.page = 1;
            this.sort = {
                createdAt: -1
            };
            this.orderProperty = '-1';
            this.searchEvent = '';

            this.subscribe('alarm.events', () => {
                return [
                    {
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                        sort: this.getReactively('sort')
                    },
                    this.getReactively('searchEvent')
                ]
            });

            this.updateSort = () => {
                this.orderProperty = -this.orderProperty;
                this.sort = {
                    createdAt: parseInt(this.orderProperty)
                }
            };

            this.helpers({
                events: () => {
                    return AlarmEvents.find({}, { sort : this.getReactively('sort') });
                },
                eventsCount: () => {
                    return Counts.get('numberOfParties');
                }
            });

            this.pageChanged = (newPage) => {
                this.page = newPage;
            };
        }
    }
});