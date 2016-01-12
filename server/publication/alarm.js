Meteor.publish('alarm', function () {
    return Alarm.find();
});
Meteor.publish('alarm.sensors', function () {
    return AlarmSensors.find();
});
Meteor.publish('alarm.events', function (options, searchString) {
    if (!searchString || searchString == null) {
        searchString = '';
    }

    let selector = { msg: { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' } };
    Counts.publish(this, 'numberOfParties', AlarmEvents.find(selector), {noReady: true});
    return AlarmEvents.find(selector, options);
});