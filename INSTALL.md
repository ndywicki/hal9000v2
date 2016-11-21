* Checkout code from git:

* Install dependencies:
meteor npm install

* Run app:
run.bat

* Add user:
Accounts.createUser({
    username: myname,
    email: myemail,
    password: mypassword,
    profile: {
     name: myname,
     createdOn: new Date()
    }
});

* Deploy:
cd .deploy
npm install -g mup
mup.cmd setup
mup.cmd deploy