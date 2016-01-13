# How I modernize alarm home version 2.0

After deploy a first solution to modernize my old wired home alarm, I discovered a new technical stack more easily extensible for connected objects.

## Hardware

No change on existing alarm hardware base on existing sensors and sirens. All managed via an Arduino.
But I added some IOT module like temperature, humidity sensors based on the cheap wifi chip [ESP8266](http://www.esp8266.com/).
I also added module to support domotic module like [Chacon](http://www.chacon.be/index.php/faqs/domotique.html) or [Blyss](http://www.castorama.fr/store/pages/blyss-domotique-blyssbox.html). Finally in the futur add a zwave protocole support


## Software

The new stack is base on :
  - [MQTT](http://mqtt.org/) protocole for communication between all IOT objects,
  - [Node-RED](http://nodered.org/) application to orchestrate and build scenario easily
  - [Meteor](https://www.meteor.com/) framework with Angular [Meteor-angular](http://www.angular-meteor.com/) for the front-end solution.
  - [Motion] (http://www.lavrsen.dk/foswiki/bin/view/Motion/WebHome) for camera streaming and motion detection

 
I also rewrote the NodeJS alarm module to make it standalone

  
### MQTT

I've used the [Mosquitto](http://mosquitto.org/) broker deployed on the Rapsberry Pi 2

### Node-red

I used Node-red to store all MQTT events in the MongoDB database both deployed on the Rapsberry Pi 2
Node-Red can be used to build domotic scenarios easily.

### Meteor

Meteor it's a great framework to build quickly a real-time application.
Server can subscribed to MQTT broker and update in real-time all connected client's view
Used package for MQTT is [perak:mqtt-collection](https://github.com/perak/meteor-mqtt-collection/)


Meteor application is deployed on Amazon EC2 cloud free instance (it's enough for my requirement).
For deployment thanks to the [Meteor Up X](https://github.com/arunoda/meteor-up/tree/mupx) tool who deploy all on Docker container

### Motion

Motion is used for security cam feature
When a motion is detected I use 'on_event_start' and 'on_movie_end' events with script to sent email with captured video only if alarm is armed.
The alarm status value is retreived from the mongoDB database.

### ESP8266 development

To use ESP82666 like an arduino you can find many resources on the net (ex https://hackaday.io/project/5150-arduino-ide-for-esp8266-quickstart-guide)

You can plug any sensor

TODO
