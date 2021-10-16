X_MAP = 5;
Y_MAP = 3;
MAP(5,3);
x=1;
y=1;
direction ='E';
robot(x,y,direction)

function movement(input){

    if (input == "L"){
        switch (direction) {
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
        robot (x, y, new_direction);
    }

    if (input == "R"){
        switch (direction) {
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
        robot (x, y, new_direction);
    }

    if (input == "F"){
        switch (direction) {
            case "N":
                new_x = x;
                new_y = y+1;
                new_direction = "N";
                if (new_x > x_map | new_y > y_map | new_x < 0 | new_y < 0){
                    scent (x, y);
                    robot_is_lost = true;
                }
                break;
            case "E":
                new_x = x+1;
                new_y = y;
                new_direction = "E";
                if (new_x > x_map | new_y > y_map | new_x < 0 | new_y < 0){
                    scent (x, y);
                    robot_is_lost = true;
                }
                break;
            case "S":
                new_x = x;
                new_y = y-1;
                new_direction = "S";
                if (new_x > x_map | new_y > y_map | new_x < 0 | new_y < 0){
                    scent (x, y);
                    robot_is_lost = true;
                }
                break;
            case "W":
                new_x = x-1;
                new_y = y;
                new_direction = "W";
                if (new_x > x_map | new_y > y_map | new_x < 0 | new_y < 0){
                    scent (x, y);
                    robot_is_lost = true;
                }
               break;
            }
        robot (new_x, new_y, new_direction);
    }
    
}