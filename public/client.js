/*
const button = document.getElementById('submit');
button.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/runproblem', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('robot was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});

function setup(){
    var button = select("#submit");
    button.mousePressed(submitSimulation);
}
*/

//const { response } = require("express");

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
//const button = document.getElementById('submit');
//button.addEventListener('submit', postInput);

function postInput(id){
    const input_data = {
        input: document.getElementById(id).value
    } 
    console.log(input_data);
    const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(input_data)
    }
    //console.log(input_data);

fetch('/api', options).then(response =>{
    info = response.json();
    console.log(info);
    //console.log(info.blob);
    //return info.blob;
    //.then(info => {
      //  const TypeErr = info.errorObject;
       // console.log(TypeErr);
    //});
});
}

getData();
async function getData() {
    const response = await fetch('/all');
    const data = await response.json();

    for (item of data){
        const root = document.createElement('div');
        //root.setAttribute(class, "each-expedition");
        root.className ="each-expedition";
        //const iteration = document.createElement('div');
        const input = document.createElement('div');
        const output = document.createElement('div');
        const num_robots = document.createElement('div');
        const num_lost_robots = document.createElement('div');
        const path_robots = document.createElement('div');
        const num_actions_robot = document.createElement('div');
        const explored_surf_robot = document.createElement('div');
        const explored_surf_total = document.createElement('div');

        input.innerText = `input: ${item.input}`;
        output.innerText = `output: ${item.output}`;
        num_robots.textContent = `number of robots : ${item.number_of_robots}`;
        num_lost_robots.textContent = `number of lost robots: ${item.number_of_lost_robots}`;
        path_robots.textContent = `paths of robots: ${item.paths_of_robots}`;
        num_actions_robot.textContent = `number of actions per robot: ${item.number_of_actions_per_robot}`;
        explored_surf_robot.textContent = `explored surface per robot: ${item.explored_surface_by_robot}`;
        explored_surf_total.textContent = `explored surface of planet: ${item.explored_surface_total}`;

        root.append(input, output, num_robots, num_lost_robots, path_robots, num_actions_robot, explored_surf_robot, explored_surf_total);
        
        document.getElementById("previousExpeditions").append(root);

    }
    //console.log(data);
}

window.onhashchange = function(){
    //render function is called every has change
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
/*
function submitSimulation(){
    var txt = select("#textinput").value();
    var data = {
        text:txt
    }
    
    httpPost('run/', data, 'json', dataPosted, postErr);
}

function dataPosted(result){
    console.log(result);
}

function postErr(err){
    console.log(err);
}

s
function setup(){
    loadJSON("/all", gotData);
    console.log("running");

   // const button = document.getElementById("submit");
    //button.mousePressed(submitProblem);
}

function gotData(){
    console.log(data);
}

/*
function submitProblem(){
    var txt = document.getElementById("textinput").value;
    var data = {
        text: txt
    }
    httpPost("newproblem/", data, "json", dataPosted, PostErr);
}

function dataPosted(result){
    console.log(result);
}

function PostErr(err){
    console.log(err);
}
*/