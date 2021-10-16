const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo');
});

// READ THE INPUT FILE
const fs = require('fs')

var map_x = 0;
var map_y = 0;
var array = [];
var robots = [];
var len = 0;
var num_robots = 0;
var grid = [];

// read input.txt file from the command line
try {
  const data = fs.readFileSync('input.txt', 'utf8')
  array = data.split("\n");
} catch (err) {
  console.error(err)
}

//initialize the problem and get all the initial data from the input file
function init(){
  map_x = parseInt(array[0][0]);
  map_y = parseInt(array[0][2]);
  if (map_x > 50 && map_y > 50){
    console.error("The maximum value for any coordenate is 50");
    process.exit();
  }
  len = array.length;
  num_robots = (len-1)/2;
  robots = new Array(num_robots);
}
init();

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
}
initialiseGrid();

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
      robots[i] = new Robot()
    }
  }
  createRobots();

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
          process.exit();
        }
    }
  
  }
  initialiseRobots();

// control of the movement of robots given by the instructions line
  function movement(){
    for (var i = 0; i < num_robots; ++i){

      // max number of structions allowed per robot
      if(array[i+i+2].length > 99){
        console.error("A robot can only take less than 100 instructions.");
        process.exit();
      }

    Array.from(array[i+i+2]).forEach(element => {

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
                break;
              }
      }
    }); // end of forEach()
  } // end of for loop
  } // end of function movement
  movement();

  // print output with the correct format
  function printOutput(){
    final_robots ="";
    for (var i = 0; i < num_robots; ++i){
      out_x = robots[i].curr_x;
      out_y = robots[i].curr_y;
      out_direction = robots[i].curr_direction;
      if(robots[i].outOfBounds == true){
        out_bounds = "LOST";
      }
      else{
        out_bounds = "";
      }
      out_robot = out_x + " " + out_y + " " + out_direction + " " + out_bounds + "\n";
      final_robots += out_robot;
    }
    console.log(final_robots)
  }
  printOutput();

// INITIALIZE THE SERVER
server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});