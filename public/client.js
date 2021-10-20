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