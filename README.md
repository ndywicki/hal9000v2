# How I modernize alarm home version 2.0

After deploy a first solution to modernize my old wired home alarm, I've discovered new technical stack more easily extensible.

## Hardware

No change on existing alarm hardware base on existing sensors and sirens. All managed via an Arduino.
But I've added some IOT module like temperature, humidity sensors based on the cheap wifi chip [ESP8266](http://www.esp8266.com/).


## Software

The new stack is base on :
    - [MQTT](http://mqtt.org/) protocole for communication between all IOT objects,
    - [Node-RED](http://nodered.org/) application to orchestrate and build scenario easily
    - [Meteor](]https://www.meteor.com/) framework with Angular [Meteor-angular](http://www.angular-meteor.com/) for the front-end solution.


### MQTT

I've used the [Mosquitto](http://mosquitto.org/)

### Node-red

I used Node-red to store all MQTT events in the MongoDB database
You can also used Node-Red to build domotic scenarios.

### Meteor

Meteor it's a great framework to build quickly a real-time application.
Server can subscribed to MQTT broker and update in real-time all connected client view
Used packages:
	- Package 1
	- Package 2
	- Package 3
	- Package 4

Meteor application is deployed on Amazon EC2 cloud free instance (it's enough for my requirement).
For Meteor deployment I'm used the [Meteor Up X](https://github.com/arunoda/meteor-up/tree/mupx) tool

### ESP8266 development

To use ESP82666 like an arduino you can find many resources on the net (ex https://hackaday.io/project/5150-arduino-ide-for-esp8266-quickstart-guide)

You can plug any sensor

TODO