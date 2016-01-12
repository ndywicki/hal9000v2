'use strict';

angular.module('hal9000').controller('AlarmController', ['$scope', '$reactive',
    function ($scope, $reactive) {
        $reactive(this).attach($scope);
        var vm = this;
        vm.AlarmStatusEnum = Object.freeze({
            'off': 'off',
            'armed': 'armed',
            'siren': 'siren'
        });
        vm.AlarmModeEnum = Object.freeze({
            'perimetric': 'perimetric',
            'full': 'full'
        });

        vm.subscribe('alarm');
        vm.helpers({
            alarm() {
                return Alarm.findOne({})
            }
        });

        //init alarm command object
        Meteor.call('getCurrentAlarm', function(error, alarm){
            vm.alarmCmd = alarm;
            if(vm.alarmCmd.status === 'siren') {
                vm.alarmCmd.status = 'armed';
            }
        });

        vm.sendCommand = function(command){
            // control tempo value
            if(vm.alarmCmd.tempo < 0) {
                vm.alarmCmd.tempo = 0;
                return;
            }
            if(vm.alarmCmd.tempo > 10) {
                vm.alarmCmd.tempo = 10;
                return;
            }
            ////Build command object with the related input command
            var cmd = only(vm.alarmCmd, command);
            //Sent to MQTT new values
            console.log('AlarmController send alarm command:'+angular.toJson(cmd));
            AlarmCommands.insert({topic : "alarm/commands", message: angular.toJson(cmd), broadcast: true });
        };

        vm.isOff = function() {
            return vm.alarm && vm.alarm.status === vm.AlarmStatusEnum.off;
        };
        vm.isSiren = function() {
            return vm.alarm && vm.alarm.status === vm.AlarmStatusEnum.siren;
        };
        vm.isArmed = function() {
            return vm.alarm
                && vm.alarm.status === vm.AlarmStatusEnum.armed
                && vm.alarm.mode === vm.AlarmModeEnum.full;
        };
        vm.isPerimetric = function() {
            return vm.alarm
                && vm.alarm.status === vm.AlarmStatusEnum.armed
                && vm.alarm.mode === vm.AlarmModeEnum.perimetric;
        };

        //private functions
        //-----------------
        // create new object with filtering properties in keys argument
        var only = function(obj, keys){
            obj = obj || {};
            if ('string' == typeof keys) keys = keys.split(/ +/);
            return keys.reduce(function(ret, key){
                if (null == obj[key]) return ret;
                ret[key] = obj[key];
                return ret;
            }, {});
        };

    }]);