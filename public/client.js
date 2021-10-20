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
    console.log(input_data);

fetch('/api', options).then(response =>{
    console.log(response);
    });
}

getData();
async function getData() {
    const response = await fetch('/all');
    const data = await response.json();

    for (item of data){
        const root = document.createElement('div');
        //const iteration = document.createElement('div');
        const input = document.createElement('div');
        const output = document.createElement('div');

        input.textContent = `input: ${item.input}`;
        output.textContent = `output: ${item.output}`;

        root.append(input, output);
        document.body.append(root);




    }
    console.log(data);
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
            document.getElementById("li_home").classList.add("active");
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