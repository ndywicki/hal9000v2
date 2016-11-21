* Checkout code from git

* Install dependencies:

`meteor npm install`

* Run app:

```shell
set MONGO_URL=mongodb://mongoserver:27017/hal9000
set MQTT_URL=mqtt://mqttserver:1883
meteor --settings .deploy/settings.json
```

* Add user:

```javascript
Accounts.createUser({
    username: myname,
    email: myemail,
    password: mypassword,
    profile: {
     name: myname,
     createdOn: new Date()
    }
});
```

* Deploy:

```shell
cd .deploy
npm install -g mup
mup.cmd setup
mup.cmd deploy
```
