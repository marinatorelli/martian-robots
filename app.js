//const http = require('http');
const express = require('express');
const Datastore = require('nedb');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static("public"));
app.use(express.json());

app.listen(port, function() {
  console.log(`Server running at ${port}`);
});

// define and load the DATABASE 
const database = new Datastore("database.db");
database.loadDatabase();


// declare global variables
var map_x = 0;
var map_y = 0;
var len = 0;
var num_robots = 0;
var grid_squares = 0;

var array = [];
var array_info = [];
var robots = [];
var grid = [];
var paths_robots = [];

var final_robots = "";
var expedition = "";


var accepted_commands = ["L", "R", "F"];
var num_accepted_commands = accepted_commands.length;

// for data calculated from expeditions
var number_actions_per_robot = [];
var num_lost_robots = 0;
var explored_surface_by_robot = [];
var explored_surface_total = 0;
var perc_explored_surface = 0;
var perc_lost_robots = 0 ;
var ana_num_robots = 0;
var ana_avg_num_robots = 0;
var ana_avg_lost_robots = 0;
var ana_num_lost_robots = 0;
var average_surf_mars = 0;
var ana_percentage_explored_surface = 0;
var ana_surface_mars = 0;
var ana_explored_surface =0;  

var counter = 0;

var errorType = -1;
var errorMessage = "";
var errorObject = [];

var inputt = "";

// get number of arguments from the command line
var args = process.argv;



// if the node app receives a txt file as a third argument, it takes the input from that file
if (args.length == 3 ){
  console.log("Initializing problem from the command line")
  const data = fs.readFileSync(args[2], 'utf8');
  inputt = data;
  array = data.split("\r\n");
  map_x = 0;
  map_y = 0;
  checkCorrectInput();
  if(checkCorrectInput() != true){
    console.log(errorObject); 
    process.exit();
  }
  else{
    main();
  }
}

// if the node app does not receive a third argument it runs on the web and receives its input from there through an API POST
else{
  console.log("Initializing problem on the web")
  app.post('/api', (request, response) => {

    const input_data = request.body;
    timestamp = Date.now();
    inputt = input_data.input;
    array = inputt.split("\n");

    checkCorrectInput();
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
}

////////////////////////////////
///////////** API **///////////
///////////////////////////////

// GET the expeditions data to the client
app.get('/expeditions', (request, response) => {
  database.find({ reference: "expedition" }, (err, data) => {
    if(err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

// GET the analytics data to the client
app.get('/analytics', (request, response_analytics) => {
  database.find({ reference: "analytics"}, (err, data_analytics) => {
    if (err){
      response_analytics.end();
      return;
    }
    response_analytics.json(data_analytics);
  });
});

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
  simpleAnalytics();
}

// check the input given has the correct format
function checkCorrectInput(){
  errorObject = [];

  for (i=0; i < array.length; i++){
    array_info[i] = array[i].split(" ");
  }
  map_x = parseInt(array_info[0][0]);
  map_y = parseInt(array_info[0][1]);

  // check map coordinates are at max 50
  if (map_x > 50 || map_y > 50 || map_x < 0 || map_y < 0){
    //console.error("The maximum value for any coordenate is 50 and the minimum is 0");
    errorType = 1;
    errorMessage = "The maximum value for any coordenate is 50 and the minimum is 0";
    errorObject.push(errorType);
    errorObject.push(errorMessage);
    return errorObject;
  }

  init();
  createRobots();

  for (var i = 0; i < num_robots; ++i) {

    // check that robots spawn within the map grid
    robots[i].init_x = parseInt(array_info[i+i+1][0]);
    robots[i].init_y = parseInt(array_info[i+i+1][1]);
    if (robots[i].init_x > map_x | robots[i].init_x < 0 | robots[i].init_y > map_y | robots[i].init_y < 0){
      //console.error("The robots must spawn within the map grid.");
      errorType = 2;
      errorMessage = "The robots must spawn within the map grid.";
      errorObject.push(errorType);
      errorObject.push(errorMessage);
      return errorObject;
    }

    //check that the maximum number of instructions for a robot is less than 100
    if(array[i+i+2].length > 99){
      //console.error("A robot can only take less than 100 instructions.");
      errorType = 3;
      errorMessage = "A robot can only take less than 100 instructions.";
      errorObject.push(errorType);
      errorObject.push(errorMessage);
      return errorObject;
    }

    // check the instructions line has only valid instructions
    for (ii=0; ii < array[i+i+2].length; ++ii){
      for(j=0; j < num_accepted_commands; ++j){
        if(!accepted_commands.includes(array[i+i+2][ii])){
          errorType = 4;
          errorMessage = "The command is not a valid instruction.";
          errorObject.push(errorType);
          errorObject.push(errorMessage);
          return errorObject;
        }
      }
    }
    
 
  }
  // if everything is fine
  return true;
}

//initialize the problem and get all the initial data from the input file
function init(){
  for (i=0; i < array.length; i++){
    array_info[i] = array[i].split(" ");
  }
  map_x = parseInt(array_info[0][0]);
  map_y = parseInt(array_info[0][1]);

  if (map_x > 50 || map_y > 50 || map_x < 0 || map_y < 0){
  }
  len = array.length;
  num_robots = (len-1)/2;
  robots = new Array(num_robots);
  paths_robots = new Array(num_robots);
  number_actions_per_robot = new Array(num_robots);
  explored_surface_by_robot = new Array(num_robots);
  explored_surface_by_robot_unique = new Array(num_robots);
}

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
  grid_squares = (map_x+1)*(map_y+1);
}

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

// fill in the robots array with the initial positions and directions
  function initialiseRobots(){
    for (var i = 0; i < num_robots; ++i) {
        //save initial position
        robots[i].init_x = parseInt(array_info[i+i+1][0]);
        robots[i].init_y = parseInt(array_info[i+i+1][1]);
        robots[i].init_direction = array_info[i+i+1][2];

        //set current position as initial position
        robots[i].curr_x = robots[i].init_x;
        robots[i].curr_y = robots[i].init_y;
        robots[i].curr_direction = robots[i].init_direction;

        // mark the initial position of the robot on the grid as "explored"
        grid[robots[i].init_y][robots[i].init_x][1] = 1;
        //specify which robot has explored the position
        grid[robots[i].init_y][robots[i].init_x][i+2] = i;

        //initialize these variables to zero for future use
        num_lost_robots = 0;
        explored_surface_by_robot[i] = 0;

        // if any robot is spawn outside of the map bounds it gives an error and the program execution finishes
        //** THIS IS NO LONGER NEEDED AS THERE'S A FUNCTION CALLED BEFORE THIS THAT CHECKS THE CORRECT INPUT **//
        //if (robots[i].init_x > map_x | robots[i].init_x < 0 | robots[i].init_y > map_y | robots[i].init_y < 0){}
    }
    //console.log(robots);
  }

// FUNCTION that controls the movement of the robots following the instructions line
  function movement(){
    for (var i = 0; i < num_robots; ++i){
      paths_robots[i] = [];
      number_actions_per_robot[i] = 0;

      // max number of structions allowed per robot must be less than 100
      //** THIS IS NO LONGER NEEDED AS THERE'S A FUNCTION CALLED BEFORE THIS THAT CHECKS THE CORRECT INPUT **//
      //if(array[i+i+2].length > 99){}

      // iterates through the instruction line
      Array.from(array[i+i+2]).forEach(element => {
        //console.log(accepted_commands.includes(element));
        current_position = [];
        number_actions_per_robot[i] +=1;
        var new_x = "";
        var new_y = "";
        var new_direction = "";

        if(robots[i].outOfBounds == false){

          // "L" -> the robot stays on the same grid point and turns 90 degrees to the left
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

          // "R" -> the robot stays on the same grid point and turns 90 degrees to the right
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

          // "F" -> the robot moves forward one grid point in the current direction and maintains the same orientation
          if (element == "F"){
              switch (robots[i].curr_direction) {

                  case "N":
                      //calculate the new position
                      new_x = robots[i].curr_x;
                      new_y = robots[i].curr_y +1;
                      new_direction = "N";
                      // check whether the new position will be outside the map
                      if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                        // check if no previous robot has fallen off the planet from that position
                        if(grid[robots[i].curr_y][robots[i].curr_x][0] == -1){
                          // mark this position with the id of the robot that's fallen from it
                          grid[robots[i].curr_y][robots[i].curr_x][0] = i;
                          // set the robot as lost
                          robots[i].outOfBounds = true;
                          //  update the number of lost robots
                          num_lost_robots += 1;
                          break;
                        }
                        else{
                          // if the robot would fall from the current position but another robot has previously fallen from it,
                          // just do nothing and go to the next instruction
                          break;
                        }
                      }
                      //update the position of the robots that are still within the map grid
                      robots[i].curr_x = new_x;
                      robots[i].curr_y = new_y;
                      robots[i].curr_direction = new_direction;

                      //mark the position as visited
                      grid[robots[i].curr_y][robots[i].curr_x][1] = 1;

                      // mark the position as visited with the robot id
                      grid[robots[i].curr_y][robots[i].curr_x][i+2] = i;

                      // update the path of the robot
                      paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
                      break;

                  case "E":
                      //calculate the new position
                      new_x = robots[i].curr_x+1;
                      new_y = robots[i].curr_y;
                      new_direction = "E";
                      // check whether the new position will be outside the map
                      if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                        // check if no previous robot has fallen off the planet from that position
                        if(grid[robots[i].curr_y][robots[i].curr_x][0] == -1){
                          // mark this position with the id of the robot that's fallen from it
                          grid[robots[i].curr_y][robots[i].curr_x][0] = i;
                          // set the robot as lost
                          robots[i].outOfBounds = true;
                          //  update the number of lost robots
                          num_lost_robots += 1;
                          break;
                        }
                        else{
                          // if the robot would fall from the current position but another robot has previously fallen from it,
                          // just do nothing and go to the next instruction
                          break;
                        }
                      }
                      //update the position of the robots that are still within the map grid
                      robots[i].curr_x = new_x;
                      robots[i].curr_y = new_y;
                      robots[i].curr_direction = new_direction;

                      //mark the position as visited
                      grid[robots[i].curr_y][robots[i].curr_x][1] = 1;

                      // mark the position as visited with the robot id
                      grid[robots[i].curr_y][robots[i].curr_x][i+2] = i;

                      // update the path of the robot
                      paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
                      break;

                  case "S":
                      //calculate the new position
                      new_x = robots[i].curr_x;
                      new_y = robots[i].curr_y-1;
                      new_direction = "S";
                      // check whether the new position will be outside the map
                      if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                        // check if no previous robot has fallen off the planet from that position
                        if(grid[robots[i].curr_y][robots[i].curr_x][0] == -1){
                          // mark this position with the id of the robot that's fallen from it
                          grid[robots[i].curr_y][robots[i].curr_x][0] = i;
                          // set the robot as lost
                          robots[i].outOfBounds = true;
                          //  update the number of lost robots
                          num_lost_robots += 1;
                          break;
                        }
                        else{
                          // if the robot would fall from the current position but another robot has previously fallen from it,
                          // just do nothing and go to the next instruction
                          break;
                        }
                      }
                      //update the position of the robots that are still within the map grid
                      robots[i].curr_x = new_x;
                      robots[i].curr_y = new_y;
                      robots[i].curr_direction = new_direction;

                      //mark the position as visited
                      grid[robots[i].curr_y][robots[i].curr_x][1] = 1;

                      // mark the position as visited with the robot id
                      grid[robots[i].curr_y][robots[i].curr_x][i+2] = i;

                      // update the path of the robot
                      paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
                      break;

                  case "W":
                      //calculate the new position
                      new_x = robots[i].curr_x-1;
                      new_y = robots[i].curr_y;
                      new_direction = "W";
                      // check whether the new position will be outside the map
                      if (new_x > map_x | new_y > map_y | new_x < 0 | new_y < 0){
                        // check if no previous robot has fallen off the planet from that position
                        if(grid[robots[i].curr_y][robots[i].curr_x][0] == -1){
                          // mark this position with the id of the robot that's fallen from it
                          grid[robots[i].curr_y][robots[i].curr_x][0] = i;
                          // set the robot as lost
                          robots[i].outOfBounds = true;
                          //  update the number of lost robots
                          num_lost_robots += 1;
                          break;
                        }
                        else{
                          // if the robot would fall from the current position but another robot has previously fallen from it,
                          // just do nothing and go to the next instruction
                          break;
                        }
                      }
                      //update the position of the robots that are still within the map grid
                      robots[i].curr_x = new_x;
                      robots[i].curr_y = new_y;
                      robots[i].curr_direction = new_direction;
                      //mark the position as visited
                      grid[robots[i].curr_y][robots[i].curr_x][1] = 1;

                      // mark the position as visited with the robot id
                      grid[robots[i].curr_y][robots[i].curr_x][i+2] = i;

                      // update the path of the robot
                      paths_robots[i].push([robots[i].curr_x, robots[i].curr_y, robots[i].curr_direction]);
                    break;
                } // end switch
          } // end if "F"
        } // end if robot out of bounds is false
      }); // end of forEach()

      // add the initial position of the robot to its path
      paths_robots[i].unshift([robots[i].init_x, robots[i].init_y, robots[i].init_direction]);

    } // end of for loop
  } // end of function movement

// get output of the problem with the correct format
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
    var out_robot = "\n" + out_x + " " + out_y + " " + out_direction + " " + out_bounds;
    final_robots += out_robot;
  }
  // show in the command line
  console.log(final_robots);
}

  // calculates data related to surface of the planet
  function calcExploration(){
    explored_surface_total = 0;
    for (i=0; i<map_y+1; ++i){
      for (ii=0; ii<map_x+1; ++ii){
        for (iii=2; iii<num_robots+2; ++iii){

          // check if a particular robot has marked that position as visited
          if(grid[i][ii][iii] == iii-2){
            explored_surface_by_robot[iii-2] +=1;
          }
        }
        //check if that position has been explored by any robot
        if(grid[i][ii][1] == 1){
          explored_surface_total +=1;
        }
      }
    }
  }

// store in the database the general data from the current expedition
function storeIteration(){
  expedition = {
    reference: "expedition",
    input: inputt,
    output: final_robots,

    number_of_robots : num_robots,
    number_of_lost_robots: num_lost_robots,
    paths_of_robots: paths_robots,
    number_of_actions_per_robot: number_actions_per_robot,

    surface_of_mars: grid_squares,
    explored_surface_by_robot: explored_surface_by_robot,
    explored_surface: explored_surface_total,
    percentage_explored_surface: perc_explored_surface, 
  } 
  database.insert(expedition);
}

// store in the database the analytics calculated from all the expeditions
function simpleAnalytics(){
  counter += 1;
  ana_num_lost_robots += num_lost_robots;
  ana_num_robots += num_robots;
  ana_surface_mars += grid_squares;
  ana_explored_surface += explored_surface_total;
  perc_lost_robots = (ana_num_lost_robots/ana_num_robots)*100;
  average_surf_mars = ana_surface_mars/counter;
  ana_avg_num_robots = ana_num_robots/counter;
  ana_avg_lost_robots = ana_num_lost_robots/counter;
  ana_percentage_explored_surface = (ana_explored_surface/ana_surface_mars)*100;
  perc_explored_surface = (explored_surface_total/grid_squares)*100;

  analytics = {
    reference: "analytics",
    number_robots_analytics: ana_num_robots,
    average_number_robots: ana_avg_num_robots,
    number_lost_robots_analytics: ana_num_lost_robots,
    average_lost_robots: ana_avg_lost_robots,
    percentage_lost_robots: perc_lost_robots,
    average_surface_mars: average_surf_mars,
    percentage_explored_surface: ana_percentage_explored_surface
    }
    database.insert(analytics);
}