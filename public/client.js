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
    document.execCommand("Copy")
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

*/
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