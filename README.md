# Application-Security-Vulnerable-App

I have included weak authentication and a vulnerable dependency in this project. The user is allowed to attempt login as many times as possible, there is no password length minimum or special character requirement, and passwords are not hashed within the database. This makes it very easy for an attacker to get into the system. They can simply guess passwords as many times as they would like to brute force login and because there is no complexity requirement with regards to passwords, they are very easy to brute force. The second vulnerability lies within the fact that I used a dependency with a vulnerability. The vulnerability lies within a library I use called react-scripts, and specifically a package called minimalist within react-scripts. From the NPM official website: “ Affected versions of minimist are vulnerable to prototype pollution. Arguments are not properly sanitized, allowing an attacker to modify the prototype of Object, causing the addition or modification of an existing property that will exist on all objects. Parsing the argument --proto.y=Polluted adds a y property with value Polluted to all objects. The argument --proto=Polluted raises and uncaught error and crashes the application.” If exploited, this could be utilized to perform a denial of service attack. A denial of service attack could potentially cause a large loss of income to a company.


# Instructions for Running

### Step 1: Clone this repository. 

### Step 2: Set up the server and database portion of the project

Move into the repository containing the app.py file (Application-Security-Vulnerable-App)
```
cd Application-Security-Vulnerable-App

```
You need to be using python3! First you need to install the virtual environment library that I used.
```
pip3 install pipenv

```
You now need to create the environment. 
```
pipenv shell

```

You are now in the virtual environment, there should be a Pipfile. You now need to install the required libraries for the application to run, they will save to the pipfile. 
```
pipenv install flask flask-sqlalchemy flask-marshmallow marshmallow-sqlalchemy flask-cors flask-jwt-extended

```

You now need to create the database using the models I have made in the app.py file. First you need to invoke the python shell. 
```
python

```
Within the python shell now type 
```
from app import db

db.create_all()

exit()

```

There should now be a db.sqlite file. This is the database. Now you need to start the app.py file.
```
python app.py

```
### Step 3: Set up the frontend

Open a new terminal window 

Move into the Application-Security-Vulnerable-App repository
```
cd Application-Security-Vulnerable-App

```

Install the required dependencies for the frontend
```
npm install

```

Start the application
```
npm start

```
The app will open in the browser. 


One bug that I was not able to fix in time is when you attempt to log in with invalid credentials, an error page will load. The attacker can continue to try login by visting the /login page in the browser.

The same thing will happen when you try to create an account with an email that is already registered to an account in the database.
