# Setting up our project for development

## Necessary Technologies

This app will use python 3.7, a virtual environment is recommended
for this project.

You also need to have pip and depending on your OS, you need to 
have it such that the command 'python' corresponds to python3.7 (a 
virtual environment is helpful here).

In addition you need to have node.js installed as well as
mariadb or mysql. Try to get the later versions of mariadb/mysql 
and the recommended node version is 10.16.0

Be sure your path variables are set for all of these technologies.

## Installing dependencies

We will assume we are in the DeathMD directory.
If you write ls or dir and your output lists:
"api, client, node_modules, package.json, README.md, requirements.txt, etc", then you are in the correct folder location

### node.js dependencies
To install node dependencies, write the following command:

    npm install

### react.js dependencies
To install react dependencies, write the following commands:

    cd client

    npm install

### python3.7 Dependencies
If you are using a virtual environment, please activate it before 
you install your python dependencies. It is needed if your
dependencies are local to your project.

To install python3.7 dependencies, write the following command:

    pip install -r requirements.txt

## Environment variables
You will need a **.env** file to store your mysql/mariadb database name,
user, and password. That .env file needs to be in the DeathMD directory.

In our .env template, anything in quotes describes 
the content of our environment variable. Otherwise it is 
a value you must write into the file.

Your .env file needs to follow this template:

DB_NAME="database name"

DB_USERNAME="the username for the database (often by default your database will use root)"

DB_PASSWORD="the username for the database (often by default your database will use root)"

PORT=8000

NODE_ENV=production

## Running our app

1. If you are using a virtual environment, activate it in your terminal.
2. Write the following command: npm run dev

To see any changes made to our database, just use SQL to query and
show the needed information you want to check