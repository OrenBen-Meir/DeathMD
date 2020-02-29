# New API Notes 

This folder will contain code for a rework of DeathMD's backend api.
It is currently in development so 

The following Taskswill need to be done:

1.  Develop a new doctor AI using actual real data instead of dummy data.
2.  Create a new database mechanism (preferaby using SQL) to store our training data and to access such information through an ORM.
    Such a mechanism must be able to parse a CSV file.
3.  Create a mechanism to serialize our AI using a cloud hosted database (preferably using No-SQL).
4.  Use python flask as the main back-end framework to create a Restful API.
    The purpose of this new framework is to prevent file pipelinging from node.js to a python program as done before as heroku 
    has a tendency to crash due to inproper handling of the communication between our node server and the python program that is executed.
