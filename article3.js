document.addEventListener('DOMContentLoaded', ()=>{

    var navSetting = false;

    var bars = document.querySelector('#bars');
    bars.addEventListener('click', () => {

        document.documentElement.scrollTop = document.body.scrollTop = 0;

        bars.style.display = "none";
        navSetting = true;
        let cancel = document.querySelector('#cancel');
        cancel.style.display = "block";
        console.log(window.innerWidth);


        let navDisplay = document.querySelector('.navDisplay');
        navDisplay.style.transition = "0.5s ease-in-out all";
        navDisplay.style.width = "100vw";
        navDisplay.style.left = "0";
    })

    var cancel = document.querySelector('#cancel');
    cancel.addEventListener('click', () => {
        cancel.style.display = "none";
        navSetting = true;
        let bars = document.querySelector('#bars');
        bars.style.display = "block";

        let navDisplay = document.querySelector('.navDisplay');
        navDisplay.style.left = "-120%";
        // navDisplay.style.width = "0";
        // navDisplay.style.transition = "0.5s ease-in-out all";
        
    })

    setInterval(checkNav, 100);

    setInterval(checkNav2, 500);

});

function checkNav2(){

    var bars = document.querySelector('#bars');
    var cancel = document.querySelector('#cancel');
    var navDisplay = document.querySelector('.navDisplay');

    if (document.documentElement.scrollTop > 0 && cancel.style.display == "block")
    {
        cancel.style.display = "none";
        navDisplay.style.left = "-120%";
        navDisplay.style.width = "0";
        bars.style.display = "block";
        
    }
}

function checkNav(){
    var winWidth = window.innerWidth;

    var bars = document.querySelector('#bars');
    var cancel = document.querySelector('#cancel');

    if (winWidth > 643){
        bars.style.display = "none";
        cancel.style.display = "none";
        let navDisplay = document.querySelector('.navDisplay');
        navDisplay.style.left = "-100%";
        navDisplay.style.width = "0";
        navDisplay.style.transition = "none";
    }
    else if (winWidth <= 643 && cancel.style.display == "none"){
        bars.style.display = "block";
        // bars.style.width = "0";
    }
    

    // console.log(winWidth);
}
