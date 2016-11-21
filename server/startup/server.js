Meteor.startup(function() {
    //SensorTest.mqttConnect('mqtt://test.mosquitto.org', ['revspace/#']);
    //Sensors.mqttConnect('mqtt://'+Meteor.settings.mqttServer+':1883', ['sensors/#']);
    Sensors.mqttConnect(process.env.MQTT_URL, ['sensors/#']);

    AlarmSensors.mqttConnect(process.env.MQTT_URL, ['alarm/sensors/#']);
    AlarmCommands.mqttConnect(process.env.MQTT_URL, ['alarm/commands']);

    LightsCommands.mqttConnect(process.env.MQTT_URL, ['lights/#']);
});

