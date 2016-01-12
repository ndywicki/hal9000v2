Meteor.publish('sensors', function(topic) {
	return Sensors.find({topic: topic}, {limit: 1});
});
