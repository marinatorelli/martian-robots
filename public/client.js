function setup(){
    var button = select("#submit");
    button.mousePressed(submitSimulation);
}

//copy example to clipboard
function copyEvent(id)
{
    var str = document.getElementById(id);
    window.getSelection().selectAllChildren(str);
    document.execCommand("Copy")
}

function submitSimulation(){
    var txt = select("#textinput").value();

    httpPost();
}