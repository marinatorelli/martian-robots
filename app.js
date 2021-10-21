//const http = require('http');
const express = require('express');
const Datastore = require('nedb');
const bodyParser = require("body-parser");
const { response } = require('express');
//const popup = require('node-popup');
//import {alert} from 'node-popup';

//let alert = require('alert'); 

//app.use(bodyParser.urlencoded({ extended: true }));
//import express from 'express';
//import { initializeApp } from 'firebase/app';
//import { getDatabase, ref, set} from "firebase/database";

const hostname = '127.0.0.1';
const port = 8000;

//const MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(express.static("public"));
app.use(express.json());

//module.exports = app.listen(3000);
if(!module.parent){
  app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
  );
}
const database = new Datastore("database.db");
database.loadDatabase();
//database.insert(problem_iter);
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
var array_info = [];
var robots = [];
var len = 0;
var num_robots = 0;
var grid = [];
var explored_surface_total = 0;
var paths_robots = [];
var iteration = 0; // initialize from the db getting the current iteration number
var final_robots = "";
var expedition = "";
var number_actions_per_robot = [];
var num_lost_robots = 0;
var explored_surface_by_robot = [];
var grid_squares = 0;

//var explored_surface_by_robot_unique = [];
//var explored_surface_total_unique = 0;

var errorType = -1;
var errorMesage = "";
var errorObject = []

/*****************************************************************************************************/
/*****************************************************************************************************/
/***********************************************API***************************************************/
/*****************************************************************************************************/
/*****************************************************************************************************/
// GET INPUT FROM THE CLIENT
var inputt = "";
var timestamp = "";

app.post('/api', (request, response) => {
  //console.log(request.body);
  const input_data = request.body;
  timestamp = Date.now();
  inputt = input_data.input;
  console.log(timestamp);
  //console.log(inputt);
  map_x = 0;
  map_y = 0;
  checkCorrectInput();
  console.log(checkCorrectInput());
  if(checkCorrectInput() != true){
    response.json({
      status: 'input-error',
      errorObject: checkCorrectInput()
    });
  }
  else{
    main();
    response.json({
      status: 'success',
    });
  }
});

// GET ALL THE STORED INFO TO THE CLIENT
app.get('/all', (request, response) => {
  database.find({}, (err, data) => {
    if(err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.get('/expedition/:id', (request, response) => {
  database.find();
});
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
  map_x = 0;
  map_y = 0;
  init();
  initialiseGrid();
  createRobots();
  initialiseRobots();
  movement();
  printOutput();
  calcExploration();
  storeIteration();
}

function storeIteration(){
  expedition = {
    input: inputt,
    output: final_robots,
    number_of_robots : num_robots,
    number_of_lost_robots: num_lost_robots,
    paths_of_robots: paths_robots,
    number_of_actions_per_robot: number_actions_per_robot,
    surface_of_mars: grid_squares,
    explored_surface_by_robot: explored_surface_by_robot,
    explored_surface_total: explored_surface_total
  } 
  database.insert(expedition);
  console.log(expedition);
}
/*
function simpleAnalytics(){
  db.find({ }, function (err, docs) {
    Array.from(docs).forEach(element => {
      all_num_robots +=  "number_of_robots";
    })

  });
  perc_explored_surface = (explored_surface_total/grid_squares)*100;
  perc_explored_surface_by_robot = 
  perc_lost_robots = 
  average_num_robots =
  average_num_instructions_robot = 
}
*/
function checkCorrectInput(){
  errorObject = [];
  const data = inputt;
  array = data.split("\n");
  for (i=0; i < array.length; i++){
    array_info[i] = array[i].split(" ");
  }
  map_x = parseInt(array_info[0][0]);
  map_y = parseInt(array_info[0][1]);

  // check map coordinates are at max 50
  if (map_x > 50 || map_y > 50 || map_x < 0 || map_y < 0){
    //console.error("The maximum value for any coordenate is 50 and the minimum is 0");
    errorType = 1;
    errorMesage = "The maximum value for any coordenate is 50 and the minimum is 0";
    errorObject.push(errorType);
    errorObject.push(errorMesage);
    //console.log(errorObject);
    return errorObject;
  }

  init();
  createRobots();
  //len = array.length;
  //num_robots = (len-1)/2;
  //robots = new Array(num_robots);
  for (var i = 0; i < num_robots; ++i) {

    // check that robots spawn within the map grid
    robots[i].init_x = parseInt(array_info[i+i+1][0]);
    robots[i].init_y = parseInt(array_info[i+i+1][1]);
    if (robots[i].init_x > map_x | robots[i].init_x < 0 | robots[i].init_y > map_y | robots[i].init_y < 0){
      //console.error("The robots must spawn within the map grid.");
      errorType = 2;
      errorMesage = "The robots must spawn within the map grid.";
      errorObject.push(errorType);
      errorObject.push(errorMesage);
      return errorObject;
    }

    //check that the maximum number of instructions for a robot is less than 100
    if(array[i+i+2].length > 99){
      //console.error("A robot can only take less than 100 instructions.");
      errorType = 3;
      errorMesage = "A robot can only take less than 100 instructions.";
      errorObject.push(errorType);
      errorObject.push(errorMesage);
      return errorObject;
    }
  }
  return true;
}

//initialize the problem and get all the initial data from the input file
function init(){
  const data = inputt;
  array = data.split("\n");
  for (i=0; i < array.length; i++){
    array_info[i] = array[i].split(" ");
    //console.log(array_info[i][1]);
  }
  //console.log(data);
  map_x = parseInt(array_info[0][0]);
  map_y = parseInt(array_info[0][1]);
  //console.log(map_y);
  //map_x = parseInt(array[0][0]);
  //map_y = parseInt(array[0][1]);
  //console.log(map_y);
  if (map_x > 50 || map_y > 50 || map_x < 0 || map_y < 0){
    //console.error("The maximum value for any coordenate is 50 and the minimum is 0");
    //alert('The maximum value for any coordenate is 50');
    //process.exit();
    //return("");
  }
  iteration += 1;
  len = array.length;
  num_robots = (len-1)/2;
  robots = new Array(num_robots);
  paths_robots = new Array(num_robots);
  number_actions_per_robot = new Array(num_robots);
  explored_surface_by_robot = new Array(num_robots);
  explored_surface_by_robot_unique = new Array(num_robots);
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
      grid[i][ii] = new Array(num_robots+2);
      for (var iii=0; iii < (num_robots+2); ++iii){
        grid[i][ii][iii] = -1;
      }
    }
  }
  //console.log(grid);
  grid_squares = (map_x+1)*(map_y+1);
}
//initialiseGrid();


// create Robot object
  function Robot(){
    this.init_x = 0;
    this.init_y = 0;
    this.init_direction = "";
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
        robots[i].init_x = parseInt(array_info[i+i+1][0]);
        robots[i].init_y = parseInt(array_info[i+i+1][1]);
        robots[i].init_direction = array_info[i+i+1][2];

        console.log(robots[i].init_direction);
        robots[i].curr_x = robots[i].init_x;
        robots[i].curr_y = robots[i].init_y;
        robots[i].curr_direction = robots[i].init_direction;

        grid[robots[i].init_y][robots[i].init_x][i+2] = i;
        grid[robots[i].init_y][robots[i].init_x][1] = 1;

        num_lost_robots = 0;
        explored_surface_by_robot[i] = 0;
        // if any robot is spawn outside of the map bounds it gives an error and the program execution finishes
        if (robots[i].init_x > map_x | robots[i].init_x < 0 | robots[i].init_y > map_y | robots[i].init_y < 0){
          //console.error("The robots must spawn within the map grid.");
          //iteration -=1;
          //process.exit();
        }
    }
  }
  //initialiseRobots();

// control of the movement of robots given by the instructions line
  function movement(){
    for (var i = 0; i < num_robots; ++i){
      paths_robots[i] = [];
      number_actions_per_robot[i] = 0;
      // max number of structions allowed per robot
      if(array[i+i+2].length > 99){
        //console.error("A robot can only take less than 100 instructions.");
        //iteration -=1;
        //process.exit();
      }

    Array.from(array[i+i+2]).forEach(element => {
      current_position = [];
      //paths_robots[i] = new Array(array[i+i+2].length);
      number_actions_per_robot[i] +=1;
      var new_x = "";
      var new_y = "";
      var new_direction = "";

      if(robots[i].outOfBounds == false){
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
              if(grid[robots[i].curr_y][robots[i].curr_x][0] == -1){
                grid[robots[i].curr_y][robots[i].curr_x][0] = i;
                robots[i].outOfBounds = true;
                //robots[i].final_x = robots[i].curr_x;
                //robots[i].final_y = robots[i].curr_y;
                //robots[i].final_direction = robots[i].curr_direction;
                num_lost_robots += 1;
                break;
              }
              else{
                break;
              }
            }
            robots[i].curr_x = new_x;
            robots[i].curr_y = new_y;
            robots[i].curr_direction = new_direction;
            grid[robots[i].curr_y][robots[i].curr_x][i+2] = i;
            grid[robots[i].curr_y][robots[i].curr_x][1] = 1;
            paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
            break;
        case "E":
            new_x = robots[i].curr_x+1;
            new_y = robots[i].curr_y;
            new_direction = "E";
            if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
              if(grid[robots[i].curr_y][robots[i].curr_x][0] == -1){
                grid[robots[i].curr_y][robots[i].curr_x][0] = i;
                robots[i].outOfBounds = true;
                robots[i].final_x = robots[i].curr_x;
                robots[i].final_y = robots[i].curr_y;
                robots[i].final_direction = robots[i].curr_direction;
                num_lost_robots += 1;
                break;
              }
              else{
                break;
              }
            }
            robots[i].curr_x = new_x;
            robots[i].curr_y = new_y;
            robots[i].curr_direction = new_direction;
            grid[robots[i].curr_y][robots[i].curr_x][i+2] = i;
            grid[robots[i].curr_y][robots[i].curr_x][1] = 1;
            paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
            break;
        case "S":
            new_x = robots[i].curr_x;
            new_y = robots[i].curr_y-1;
            new_direction = "S";
            if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
              if(grid[robots[i].curr_y][robots[i].curr_x][0] == -1){
                grid[robots[i].curr_y][robots[i].curr_x][0] = i;
                robots[i].outOfBounds = true;
                robots[i].final_x = robots[i].curr_x;
                robots[i].final_y = robots[i].curr_y;
                robots[i].final_direction = robots[i].curr_direction;
                num_lost_robots += 1;
                break;
              }
              else{
                break;
              }
            }
            robots[i].curr_x = new_x;
            robots[i].curr_y = new_y;
            robots[i].curr_direction = new_direction;
            grid[robots[i].curr_y][robots[i].curr_x][i+2] = i;
            grid[robots[i].curr_y][robots[i].curr_x][1] = 1;
            paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
            break;
        case "W":
            new_x = robots[i].curr_x-1;
            new_y = robots[i].curr_y;
            new_direction = "W";
            if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
              if(grid[robots[i].curr_y][robots[i].curr_x][0] == -1){
                grid[robots[i].curr_y][robots[i].curr_x][0] = i;
                robots[i].outOfBounds = true;
                robots[i].final_x = robots[i].curr_x;
                robots[i].final_y = robots[i].curr_y;
                robots[i].final_direction = robots[i].curr_direction;
                num_lost_robots += 1;
                break;
              }
              else{
                break;
              }
            }
            robots[i].curr_x = new_x;
            robots[i].curr_y = new_y;
            robots[i].curr_direction = new_direction;
            grid[robots[i].curr_y][robots[i].curr_x][i+2] = i;
            grid[robots[i].curr_y][robots[i].curr_x][1] = 1;
            paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
          break;
        }
    } // end if "F"
      } // end if robot out of bounds is false
      
    }); // end of forEach()
    paths_robots[i].unshift([robots[i].init_x, robots[i].init_y, robots[i].init_direction]);
    console.log(paths_robots[i].length);
  } // end of for loop
  } // end of function movement

  function calcExploration(){
    explored_surface_total = 0;
    for (i=0; i<map_y+1; ++i){
      for (ii=0; ii<map_x+1; ++ii){
        for (iii=2; iii<num_robots+2; ++iii){
          if(grid[i][ii][iii] == iii-2){
            explored_surface_by_robot[iii-2] +=1;
          }
        }
        if(grid[i][ii][1] == 1){
          explored_surface_total +=1;
        }
      }
    }
  }
  
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