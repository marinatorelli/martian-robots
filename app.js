//const http = require('http');
//const express = require('express');
//const bodyParser = require("body-parser");
//pp.use(bodyParser.urlencoded({ extended: true }));
import express from 'express';
//import { initializeApp } from 'firebase/app';
//import { getDatabase, ref, set} from "firebase/database";

const hostname = '127.0.0.1';
const port = 3000;

//const MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(express.static("public"));
app.use(express.json());
/*
//const firebase } = require('firebase/app');
var config = {
  apiKey: "AIzaSyBjH5Xa9XwJq9UiW2ilKLUFxdHR39UKhMU",
  authDomain: "martian-robots-262d1.firebaseapp.com",
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL: "https://martian-robots-262d1-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "martian-robots-262d1.appspot.com"
  };

//const aux = initializeApp(config);
const firebaseApp = initializeApp(config);
const db = getDatabase(firebaseApp);
//const auth = firebaseApp.auth();

function storeIteration() {
  //const db = getDatabase(aux);
  set(ref(db, 'problems/' + iter), problem_iter);
}
*/
// Get a reference to the database service
//const db = getDatabase(aux);

//var reference = db.ref('problems');
//reference.push(problem_iter);
/*
const firebaseConfig = {
  apiKey: "AIzaSyBjH5Xa9XwJq9UiW2ilKLUFxdHR39UKhMU",
  authDomain: "martian-robots-262d1.firebaseapp.com",
  projectId: "martian-robots-262d1",
  storageBucket: "martian-robots-262d1.appspot.com",
  messagingSenderId: "145320875661",
  appId: "1:145320875661:web:85e3e323f7386dde9934c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

var database = firebase.database();
console.log(database);

var ref = database.ref('problems');
ref.push(problem_iter);
//var server = app.listen(3000, listening);
*/
// GET INPUT FROM THE CLIENT
var inputt = "";
app.post('/api', (request, response) => {
  //console.log(request.body);
  const input_data = request.body;

  inputt = input_data.input;
  //console.log(inputt);
  main();
  response.json({
    status: 'success'
  });

  //init();
  //return inputt;
  //console.log(input_data.input);
  //console.log(input);
});
//inputt = input_data.input
//console.log(inputt)

/*
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://marinatorelli:QwtqnFMK5CVjuffe@cluster0.tiell.mongodb.net/martian-robots?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err, client) => {
  if (err) console.log("err");
  else {
    const collection = client.db("martian-robots").collection("robots-info");
  }

  // perform actions on the collection object
 // client.close();
  //return collection;
});
/*
// connect to the db and start the express server
let db;

// Replace the URL below with the URL for your database
const url =  'mongodb+srv://marinatorelli:1YmPoq1g6INMISBG@cluster0.tiell.mongodb.net/martian-robots';

MongoClient.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  db = database;
  // start the express web server listening on 8080
  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

*/
function listening(){
 console.log("listening...");
}


//app.post('/run', startFromInput);
/*
function startFromInput(request, response){
  console.log(request);
  reply = {
    msg: "Thank you."
  }
  
  response.send(reply);
}*/
// MONGO DB
/*
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://marinatorelli:1YmPoq1g6INMISBG@cluster0.tiell.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('martian-robots');
    const robotsDB = database.collection('robots-info');
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    client.close();
  }
}
run().catch(console.dir);
*/
/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo');
});
*/

// READ THE INPUT FILE
//const fs = require('fs');
//const { finished } = require('stream');
//const { json, request } = require('express');
//const { ppid, mainModule } = require('process');
//const path = require('path');
//var data = fs.readFileSync("data.json");
//var runs = JSON.parse(data);
//console.log(runs);

var map_x = 0;
var map_y = 0;
var array = [];
var robots = [];
var len = 0;
var num_robots = 0;
var grid = [];
var grid_squares = 0;
var paths_robots = [];
var iteration = 0; // initialize from the db getting the current iteration number
var final_robots = "";
var problem_iter = "";
//const data = inputt;
//array = data.split("\n");
//console.log(data);
/*
// read input.txt file from the command line
try {
  const data = fs.readFileSync('input.txt', 'utf8')
  //data = inputt;
  console.log(data);
  array = data.split("\n");
} catch (err) {
  console.error(err)
}
*/
function main(){
  init();
  initialiseGrid();
  createRobots();
  initialiseRobots();
  movement();
  printOutput();
  storeIteration();
}

function storeIteration(){
  problem_iter = {
    input: inputt,
    output: final_robots
  } 
  console.log(problem_iter);
}

//initialize the problem and get all the initial data from the input file
function init(){
  const data = inputt;
  array = data.split("\n");
  console.log(data);
  map_x = parseInt(array[0][0]);
  map_y = parseInt(array[0][2]);
  if (map_x > 50 && map_y > 50){
    console.error("The maximum value for any coordenate is 50");
    process.exit();
  }
  iteration += 1;
  len = array.length;
  num_robots = (len-1)/2;
  robots = new Array(num_robots);
  paths_robots = new Array(num_robots);
  console.log("initializing problem");
}
//init();

// create and initialise map grid
function initialiseGrid(){
  grid = new Array(map_y+1);
  for (var i=0; i < map_y+1; ++i){
    grid[i] = new Array(map_x+1);
  }

  for (var i=0; i < map_y+1; ++i){
    for(var ii=0; ii < map_x+1; ++ii){
      grid[i][ii] = -1;
    }
  }
  grid_squares = (map_x+1)*(map_y+1);
}
//initialiseGrid();


// create Robot object
  function Robot(){
    this.init_x = 0;
    this.init_y = 0;
    this.init_direction = "N";
    this.outOfBounds = false;
  }

  // create array of the given number of robots
  function createRobots() {
    for (var i = 0; i < num_robots; ++i) {
      robots[i] = new Robot();
    }
  }
  //createRobots();

  // fill in the robots array with the initial positions and directions
  function initialiseRobots(){
    for (var i = 0; i < num_robots; ++i) {
        robots[i].init_x = parseInt(array[i+i+1][0]);
        robots[i].init_y = parseInt(array[i+i+1][2]);
        robots[i].init_direction = array[i+i+1][4];

        robots[i].curr_x = robots[i].init_x;
        robots[i].curr_y = robots[i].init_y;
        robots[i].curr_direction = robots[i].init_direction;

        // if any robot is spawn outside of the map bounds it gives an error and the program execution finishes
        if (robots[i].init_x > array[0][0] | robots[i].init_x < 0 | robots[i].init_y > array[0][2] | robots[i].init_y < 0){
          console.error("The robots must spawn within the map grid.");
          iteration -=1;
          process.exit();
        }
    }
  }
  //initialiseRobots();

// control of the movement of robots given by the instructions line
  function movement(){
    for (var i = 0; i < num_robots; ++i){
      paths_robots[i] = [];
      // max number of structions allowed per robot
      if(array[i+i+2].length > 99){
        console.error("A robot can only take less than 100 instructions.");
        iteration -=1;
        process.exit();
      }

    Array.from(array[i+i+2]).forEach(element => {
      var new_x = "";
      var new_y = "";
      var new_direction = "";
      // the robot stays on the same grid point and turns 90 degrees to the left
      if (element == "L"){
        switch (robots[i].curr_direction) {
            case "N":
                new_direction = "W";
                break;
            case "E":
                new_direction = "N";
                break;
            case "S":
                new_direction = "E";
                break;
            case "W":
                new_direction = "S";
               break;
            }
        robots[i].curr_direction = new_direction;
        paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
      }
  
      // the robot stays on the same grid point and turns 90 degrees to the right
      if (element == "R"){
          switch (robots[i].curr_direction) {
              case "N":
                  new_direction = "E";
                  break;
              case "E":
                  new_direction = "S";
                  break;
              case "S":
                  new_direction = "W";
                  break;
              case "W":
                  new_direction = "N";
                break;
              }
          robots[i].curr_direction = new_direction;
          paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
      }
  
      // the robot moves forward one grid point in the current direction and maintains the same orientation
      if (element == "F"){
          switch (robots[i].curr_direction) {
              case "N":
                  new_x = robots[i].curr_x;
                  new_y = robots[i].curr_y +1;
                  new_direction = "N";
                  if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                    if(grid[robots[i].curr_x][robots[i].curr_y] == -1){
                      grid[robots[i].curr_x][robots[i].curr_y] = i;
                      robots[i].outOfBounds = true;
                      robots[i].final_x = robots[i].curr_x;
                      robots[i].final_y = robots[i].curr_y;
                      robots[i].final_direction = robots[i].curr_direction;
                    }
                    else{
                      break;
                    }
                  }
                  robots[i].curr_x = new_x;
                  robots[i].curr_y = new_y;
                  robots[i].curr_direction = new_direction;
                  paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
                  break;
              case "E":
                  new_x = robots[i].curr_x+1;
                  new_y = robots[i].curr_y;
                  new_direction = "E";
                  if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                    if(grid[robots[i].curr_x][robots[i].curr_y] == -1){
                      grid[robots[i].curr_x][robots[i].curr_y] = i;
                      robots[i].outOfBounds = true;
                      robots[i].final_x = robots[i].curr_x;
                      robots[i].final_y = robots[i].curr_y;
                      robots[i].final_direction = robots[i].curr_direction;
                    }
                    else{
                      break;
                    }
                  }
                  robots[i].curr_x = new_x;
                  robots[i].curr_y = new_y;
                  robots[i].curr_direction = new_direction;
                  paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
                  break;
              case "S":
                  new_x = robots[i].curr_x;
                  new_y = robots[i].curr_y-1;
                  new_direction = "S";
                  if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                    if(grid[robots[i].curr_x][robots[i].curr_y] == -1){
                      grid[robots[i].curr_x][robots[i].curr_y] = i;
                      robots[i].outOfBounds = true;
                      robots[i].final_x = robots[i].curr_x;
                      robots[i].final_y = robots[i].curr_y;
                      robots[i].final_direction = robots[i].curr_direction;
                    }
                    else{
                      break;
                    }
                  }
                  robots[i].curr_x = new_x;
                  robots[i].curr_y = new_y;
                  robots[i].curr_direction = new_direction;
                  paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
                  break;
              case "W":
                  new_x = robots[i].curr_x-1;
                  new_y = robots[i].curr_y;
                  new_direction = "W";
                  if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                    if(grid[robots[i].curr_x][robots[i].curr_y] == -1){
                      grid[robots[i].curr_x][robots[i].curr_y] = i;
                      robots[i].outOfBounds = true;
                      robots[i].final_x = robots[i].curr_x;
                      robots[i].final_y = robots[i].curr_y;
                      robots[i].final_direction = robots[i].curr_direction;
                    }
                    else{
                      break;
                    }
                  }
                  robots[i].curr_x = new_x;
                  robots[i].curr_y = new_y;
                  robots[i].curr_direction = new_direction;
                  paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
                break;
              }
      }
    }); // end of forEach()
    paths_robots[i].unshift([robots[i].init_x, robots[i].init_y, robots[i].init_direction]);
  } // end of for loop
  } // end of function movement
 // movement();
  //console.log(iteration);
  //console.log(paths_robots);

  // add a document to the DB collection recording the click event
 /* function logRobot(client, doc_robots){
    const result = client.db("martian-robots").collection("robots-info").insertOne(doc_robots);
    console.log(`New robot logged with the following id: ${result.insertedId}`);
  }
  
  for (var i = 0; i < num_robots; ++i){
    const doc_robots = { 
      "iteration": iteration ,
      "robot_id": i,
      "init_x": robots[i].init_x,
      "init_y": robots[i].init_y,
      "init_direction": robots[i].init_direction,
      //"path": paths_robots[i],
      // number_of_squares: paths_robots[i].length,
      // of_those_unique:
      "final_x": robots[i].final_x,
      "final_y": robots[i].final_y,
      "final_direction": robots[i].final_direction,
      "out_of_bounds": robots[i].outOfBounds,
      //out_of_bounds_path(or number of squares)
      }

      //logRobot(client, doc_robots);
  }
  */




/*
      app.post('/runproblem', (req, res) => {
        //const click = {clickTime: new Date()};
        console.log(doc_robots);
        console.log(db);
      
        db.collection('robots-info').save(doc_robots, (err, result) => {
          if (err) {
            return console.log(err);
          }
          console.log('robot added to db');
          res.sendStatus(201);
        });
      });
  }
*/

  // MONGO DB
/*
  const doc_iteration = {
    //"iteration_id": ,
    //"input": ,
    //"output": 
  }

  for (var i = 0; i < num_robots; ++i){
  const doc_robots = { 
    "iteration": iteration ,
    "robot_id": i,
    "init_x": robots[i].init_x,
    "init_y": robots[i].init_y,
    "init_direction": robots[i].init_direction,
    //"path": paths_robots[i],
    // number_of_squares: paths_robots[i].length,
    // of_those_unique:
    "final_x": robots[i].final_x,
    "final_y": robots[i].final_y,
    "final_direction": robots[i].final_direction,
    "out_of_bounds": robots[i].outOfBounds,
    //out_of_bounds_path(or number of squares)
    }
  }

    const result = robotsDB.insertOne(doc_robots);
    console.log(
   'A document was inserted with the _id: ${result.insertedId}',
    );
    */
  // print output with the correct format
  function printOutput(){
    final_robots = "";
    for (var i = 0; i < num_robots; ++i){
      var out_x = robots[i].curr_x;
      var out_y = robots[i].curr_y;
      var out_direction = robots[i].curr_direction;
      if(robots[i].outOfBounds == true){
        var out_bounds = "LOST";
      }
      else{
        var out_bounds = "";
      }
      var out_robot = out_x + " " + out_y + " " + out_direction + " " + out_bounds + "\n";
      final_robots += out_robot;
    }
    console.log(final_robots);
  }
 // printOutput();

  // api for input and output
  //app.get("/runproblem", runProblem);


/*
function runProblem(request, response){
  var input_data = request.params; // this is empty
  console.log(input_data);
  var reply_data = JSON.stringify([input_data, final_robots]);
  fs.writeFileSync('data.json', reply_data, finished);
  function finshed(err){
  console.log("all set");
}
  reply = {
    msg: "New problem starting"
  }
//var reply = final_robots;
//response.send(input_data);
}
*/

/*
app.get("/all", sendAll);

function sendAll(request, response){
  var data = runs;
  response.send(data);
}

app.post("/newproblem", newProblem);

function newProblem(request, response){
  console.log(request);
  reply = {
    msg: "Thank you."
  }
  response.send(reply);
}

app.post("/link", (req,res) => {
  res.send('You sent the name "' + req.body.name + '".');
  console.log(req.body.textinput);

  // body came with body-parser
  // numbers is name of textarea
});
*/
app.listen(3000, function() {
  console.log('Server running at http://127.0.0.1:3000/');
});

  /*
// INITIALIZE THE SERVER
server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});
*/