// set the initial page to "New expedition"
let pages = document.querySelectorAll(".page");
for(let i=0; i < pages.length; i++){
    pages[i].style.display = "none";
}
pages[0].style.display = "block";


//copy example to clipboard
function copyEvent(id)
{
    var str = document.getElementById(id);
    window.getSelection().selectAllChildren(str);
    document.execCommand("Copy");
}

//send input to server
function postInput(id){
    const input_data = {
        input: document.getElementById(id).value
    } 
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input_data)
    }
    fetch('/api', options).then(response =>{
        info = response.json();
        console.log(info);
    });

}
getData();
getAnalytics();

// function to show the data from all expeditions in the "Previous Expeditions" page
async function getData() {
    const response = await fetch('/expeditions');
    const data = await response.json();

    for (item of data){
        const root = document.createElement('div');
        root.className ="each-expedition";
        const input = document.createElement('div');
        const output = document.createElement('div');

        const num_robots = document.createElement('div');
        const num_lost_robots = document.createElement('div');
        const path_robots = document.createElement('div');
        const num_actions_robot = document.createElement('div');

        const surface_of_mars = document.createElement('div');
        const explored_surf_robot = document.createElement('div');
        const explored_surf_total = document.createElement('div');
        const perc_explored_surface = document.createElement('div');

        input.innerText = `input: ${item.input}`;
        output.innerText = `output: ${item.output}`;

        num_robots.textContent = `Number of robots : ${item.number_of_robots}`;
        num_lost_robots.textContent = `Of those lost: ${item.number_of_lost_robots}`;
        path_robots.textContent = `Paths of robots: ${item.paths_of_robots}`;
        num_actions_robot.textContent = `Number of actions per robot: ${item.number_of_actions_per_robot}`;

        surface_of_mars.textContent = `Surface of Mars: ${item.surface_of_mars}`;
        explored_surf_robot.textContent = `Explored surface per robot: ${item.explored_surface_by_robot}`;
        explored_surf_total.textContent = `Explored surface of planet: ${item.explored_surface}`;
        perc_explored_surface.textContent = `Percentage of explored surface: ${item.percentage_explored_surface}`;


        root.append(input, output, num_robots, num_lost_robots, path_robots, num_actions_robot, surface_of_mars, explored_surf_robot, explored_surf_total, perc_explored_surface);
        document.getElementById("previousExpeditions").append(root);
        //document.getElementById("show-output").innerText = `${item.output}`;

    }
}

// function to show the calculated data in the "Data insights" page
async function getAnalytics() {
    const response_analytics = await fetch('/analytics');
    const data_analytics = await response_analytics.json();

    for (item of data_analytics){
        const root_analytics = document.createElement('div');
        root_analytics.className = "each-expedition";

        const total_number_of_robots = document.createElement('div');
        const average_number_of_robots = document.createElement('div');
        const total_number_lost_robots = document.createElement('div');
        const average_number_of_lost_robots = document.createElement('div');
        const percentage_of_lost_robots = document.createElement('div');
        const average_surface_of_mars = document.createElement('div');
        const percentage_of_explored_surface = document.createElement('div');

        total_number_of_robots.innerText = `Total number of robots sent to Mars (all expeditions): ${item.number_robots_analytics}`;
        average_number_of_robots.innerText = `Average number of robots sent to Mars per expedition: ${item.average_number_robots}`;
        total_number_lost_robots.innerText = `Total number of lost robots (all expeditions): ${item.number_lost_robots_analytics}`;
        average_number_of_lost_robots.innerText = `Average number of lost robots per expedition: ${item.average_lost_robots}`;
        percentage_of_lost_robots.innerText = `Percentage of robots lost (all expeditions): ${item.percentage_lost_robots}`;
        average_surface_of_mars.innerText = `Average size of Mars' surface: ${item.average_surface_mars}`;
        percentage_of_explored_surface.innerText = `Percentage of explored surface (all expeditions): ${item.percentage_explored_surface}`;

        root_analytics.append(total_number_of_robots, average_number_of_robots, total_number_lost_robots, average_number_of_lost_robots, percentage_of_lost_robots, average_surface_of_mars, percentage_of_explored_surface);
        document.getElementById("insights").append(root_analytics);
    }
}

window.onhashchange = function(){
    //render function is called every hash change
    render(window.location.hash);
};


//** SPA NAVIGATION **/

function render(hashKey){

    //first handle all divs
    let pages = document.querySelectorAll(".page");
    for(let i=0; i < pages.length; i++){
        pages[i].style.display = "none";
    }

    //now do the same with lis
    let navLis = document.querySelectorAll(".navLi");
    for(let i=0; i<navLis.length; i++){
        navLis[i].classList.remove("active");
    }

    //then unhide the one that the user selected
    //console.log(hashKey)
    switch(hashKey){
        case "":
            pages[0].style.display = "block";
            document.getElementById("li_new").classList.add("active");
            break;
        case "#new":
            pages[0].style.display = "block";
            document.getElementById("li_new").classList.add("active");
            break;   
        case "#previous":
            pages[1].style.display = "block";
            document.getElementById("li_previous").classList.add("active");
            //getData();
            break;
        case "#insights":
            pages[2].style.display = "block";
            document.getElementById("li_insights").classList.add("active");
            break;
        default:
            pages[0].style.display = "block";
            document.getElementById("li_new").classList.add("active");
            break;
    }
}
