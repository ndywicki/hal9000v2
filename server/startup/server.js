Meteor.startup(function() {

    //Sensors.mqttConnect('mqtt://test.mosquitto.org', ['revspace/#']);
    Sensors.mqttConnect('mqtt://'+Meteor.settings.mqttServer+':1883', ['sensors/#']);

    AlarmSensors.mqttConnect('mqtt://'+Meteor.settings.mqttServer+':1883', ['alarm/sensors/#']);
    AlarmCommands.mqttConnect('mqtt://'+Meteor.settings.mqttServer+':1883', ['alarm/commands']);

    LightsCommands.mqttConnect('mqtt://'+Meteor.settings.mqttServer+':1883', ['lights/#']);
});

