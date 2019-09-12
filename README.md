# XYZ Construction and Consulting 
Welcome to the XYZ Construction Team employee management portal. This page will let admin user to add, update their construction employee and working sites details and their active status. This is a simiple Angular CRUD applicaton with simple login and json-server as a data storage!

## Development Environment 

* [Express](https://expressjs.com/)
* [Angular CLI](https://cli.angular.io/)
* [json-server](https://github.com/typicode/json-server)
  * A full fake REST API

## Running the Application

1. Open the console and navigate to project folder
2. Install node_module: `npm install`
3. Open second console for json-server
4. Run the json server: `json-server --watch db.json` 
5. Go back to previous console and Run the project: `ng s –o` 
If you are getting some error while running json-server or if you didn't see any data try installing the josn server with  command `npm install -g json-server`

Review the available scripts in the [package.json](package.json)   

## Run in Production Mode

Application will run on [localhost:8000](http://localhost:8000)

Enter the admin username and password to login

`npm start`

## Run in Development Mode

Application will run on [localhost:4200](http://localhost:4200)

Enter admin username and password to login

`npm run start-dev`
