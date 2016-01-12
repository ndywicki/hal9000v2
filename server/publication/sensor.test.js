Meteor.publish('sensor.test.last.one', function(topic) {
    return SensorTest.find({topic: topic}, {
        limit: 1,
        sort: {_id: -1}
    });
});