window.onhashchange = function(){
    //render function is called every has change
    render(window.location.hash);
};

//** SPA NAVIGATION **/

function render(hashKey){

    //first handle all divs
    let pages = document.querySelectorAll(".page");
    for(let i=0; i < pages.length; i++){
        pages[i].style.display = none;
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
        case "#home":
            pages[0].style.display = "block";
            document.getElementById("li_home").classList.add("active");
            break;   
        case "#problems":
            pages[1].style.display = "block";
            document.getElementById("li_problems").classList.add("active");
            break;
        case "#robots":
            pages[2].style.display = "block";
            document.getElementById("li_robots").classList.add("active");
            break;
    }
}