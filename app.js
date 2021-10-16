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

try {
  const data = fs.readFileSync('input.txt', 'utf8')
  array = data.split("\n");
  map_x = parseInt(array[0][0]);
  map_y = parseInt(array[0][2]);
  len = array.length;
  num_robots = (len-1)/2;
  robots = new Array(num_robots);
  //console.log(data)
} catch (err) {
  console.error(err)
}

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

console.log(grid)

  function Robot(){
    this.init_x = 0;
    this.init_y = 0;
    this.init_direction = "N";
    this.outOfBounds = false;
  }

  function createRobots() {

    for (var i = 0; i < num_robots; ++i) {
      robots[i] = new Robot()
    }
  }

  createRobots();

  function initialiseRobots(){
    for (var i = 0; i < num_robots; ++i) {
        robots[i].init_x = parseInt(array[i+i+1][0]);
        robots[i].init_y = parseInt(array[i+i+1][2]);
        robots[i].init_direction = array[i+i+1][4];

        robots[i].curr_x = robots[i].init_x;
        robots[i].curr_y = robots[i].init_y;
        robots[i].curr_direction = robots[i].init_direction;

        if (robots[i].init_x > array[0][0] | robots[i].init_x < 0 | robots[i].init_y > array[0][2] | robots[i].init_y < 0){
          console.error("The robots must spawn within the map grid.");
          process.exit();
        }
    }
  
  }

  initialiseRobots();


  function movement(){
    for (var i = 0; i < num_robots; ++i){
    //var mov_array = array[i+i+2];
    Array.from(array[i+i+2]).forEach(element => {
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
  
      if (element == "F"){
          switch (robots[i].curr_direction) {
              case "N":
                  new_x = robots[i].curr_x;
                  new_y = robots[i].curr_y+1;
                  new_direction = "N";
                  if ((new_x > array[0][0] | new_y > array[0][2] | new_x < 0 | new_y < 0) && grid[robots[i].curr_x][robots[i].curr_y] == -1){
                      grid[robots[i].curr_x][robots[i].curr_y] = i;
                      robots[i].outOfBounds = true;
                  }
                  break;
              case "E":
                  new_x = robots[i].curr_x+1;
                  new_y = robots[i].curr_y;
                  new_direction = "E";
                  if ((new_x > array[0][0] | new_y > array[0][2] | new_x < 0 | new_y < 0) && grid[robots[i].curr_x][robots[i].curr_y] == -1){
                    grid[robots[i].curr_x][robots[i].curr_y] = i;
                    robots[i].outOfBounds = true;

                  }
                  break;
              case "S":
                  new_x = robots[i].curr_x;
                  new_y = robots[i].curr_y-1;
                  new_direction = "S";
                  if ((new_x > array[0][0] | new_y > array[0][2] | new_x < 0 | new_y < 0) && grid[robots[i].curr_x][robots[i].curr_y] == -1){
                    grid[robots[i].curr_x][robots[i].curr_y] = i;
                    robots[i].outOfBounds = true;

                  }
                  break;
              case "W":
                  new_x = robots[i].curr_x-1;
                  new_y = robots[i].curr_y;
                  new_direction = "W";
                  if ((new_x > array[0][0] | new_y > array[0][2] | new_x < 0 | new_y < 0) && grid[robots[i].curr_x][robots[i].curr_y] == -1){
                    grid[robots[i].curr_x][robots[i].curr_y] = i;
                    robots[i].outOfBounds = true;
                  }
                break;
              }
          robots[i].curr_x = new_x;
          robots[i].curr_y = new_y;
          robots[i].curr_direction = new_direction;
      }
  
    }); // end of forEach()

  } // end of for loop
  
  } // end of function movement
  
  movement();

  console.log(robots)
  console.log(grid)

// INITIALIZE THE SERVER
server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});