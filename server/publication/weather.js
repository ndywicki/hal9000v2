Meteor.publish('weather', function () {
    return Weather.find();
});