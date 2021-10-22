# martian-robots

## Problem definition

This is a programme that simulates the movements of robots in the surface of Mars.
The problem is defined by the coordinates of the map of Mars as well as the information about the robots being sent there.

The goal of the programme is to report the final position of all robots once they have completed their instructions.

The robots are defined by a pair of coordenates (that is, x and y on the map) and an orientation (N, S, E, W).
The robots instructions are defined in a string which can only cointain the characters "L", "R" and "F", which represent, respectively, the instructions:

- Left: the robot turns left 90 degrees and remains on the current grid point.

- Right: the robot turns right 90 degrees and remains on the current grid point.

- Forward: the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.

Robots can fall off the planet and in that case they are lost forever. However, these robots leave a 'scent' on their last occupied position on the grid before falling. These scent alerts future robots and prohibits them from falling off the planet from the same position. If a robot's instructions order them to fall the planet where a previous robot has left its 'scent', this new robot must simply ignore that instruction.

Each robot is processed sequentially, i.e., finishes executing the robot instructions before the next robot begins execution.

---

## Input
The first line of input is the upper-right coordinates of the rectangular world, the lower-left coordinates are assumed to be 0, 0.

The remaining input consists of a sequence of robot positions and instructions (two lines per robot). A position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a string of the letters "L", "R", and "F" on one line.

The input has some basic rules:
- The maximum value for any coordinate is 50 and the minimum is 0.
- All robots must spawn within the map grid.
- All instruction strings will be less than 100 characters in length.
- Only accepted instructions are the ones that have been previously defined.

---

### Sample input

5 3

1 1 E

RFRFRFRF

3 2 N

FRRFLLFFRRFLL

0 3 W

LLFFFRFLFL



### Sample output

1 1 E

3 3 N LOST

4 2 N

--- 

## Running the problem

The problem can run with a CLI or a REST API approach.
### CLI approach: 
The command written in the command line must be of the form `node app.js input.txt`,
where the file `input.txt` contains the input of the problem in the correct format.

In this case, the output of the problem will be printed in the terminal.

### REST API approach: 
You can access the problem by going to the deployed website "" or by typing the following `node app.js` in the command line (notice how no other argument should be passed).

In this case, the user must refer to said web server and enter the input there.
If the server was initialized from the command line the user will also be able to see the problem output in the terminal.
Otherwise, it will only be visible on the web.

The website is a SPA with the following structure:
- **New expedition:** It is the main page.  Here, the user is presented with the instructions for running the programme and a textbox in which they can introduce the problem input.
- **Previous expeditions:** Where `GET '/expedition'` is called. It shows the data gathered from each problem.
- **Data insights:** Where `GET '/analytics` is called. It shows the data insights calculated from all the expeditions that are in the database.