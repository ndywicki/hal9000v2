Meteor.methods({
    getCurrentAlarm: function() {
        var alarm = Alarm.findOne();
        return alarm;
    }
});