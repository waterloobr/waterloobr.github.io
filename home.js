document.addEventListener('DOMContentLoaded', () => {

    //make article slider height = height of article
    // var a = document.querySelector('#first').clientHeight;
    // console.log(a);
    // var b = document.querySelector('.articleSlider');
    // console.log(b.clientHeight);
    // b.clientHeight = a;

    // alert('pageLoaded');
    //console.log('dwdwd');

    checkLabels();

    var boxes = document.querySelectorAll('.main input');

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', checkLabels)
    }

    //var myTimer = setInterval(changeSlide, 3000);

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
        // navDisplay.style.transition = "0.5s ease-in-out all";

    })

    var subBtn = document.querySelector('.subscribe-btn');
    var subInput = document.querySelector('.subscribe-email');

    subBtn.addEventListener('click', () =>{
        subInput.nodeValue = "";
    })


    setInterval(checkNav, 100);

    setInterval(checkNav2, 500);



});

function printPos() {
    console.log(document.documentElement.scrollTop);
}

function checkNav2() {

    var bars = document.querySelector('#bars');
    var cancel = document.querySelector('#cancel');
    var navDisplay = document.querySelector('.navDisplay');

    if (document.documentElement.scrollTop > 0 && cancel.style.display == "block") {
        cancel.style.display = "none";
        navDisplay.style.left = "-120%";
        navDisplay.style.width = "0";
        bars.style.display = "block";
    }
}

function checkNav() {
    var winWidth = window.innerWidth;

    var bars = document.querySelector('#bars');
    var cancel = document.querySelector('#cancel');

    if (winWidth > 625) {
        bars.style.display = "none";
        cancel.style.display = "none";
        let navDisplay = document.querySelector('.navDisplay');
        navDisplay.style.left = "-100%";
        navDisplay.style.width = "0";
        navDisplay.style.transition = "none";
    }
    else if (winWidth <= 625 && cancel.style.display == "none") {
        bars.style.display = "block";
    }


    // console.log(winWidth);
}

var myTimer = setInterval(changeSlide, 8000);


function changeSlide() {
    // console.log('hello');
    //clearInterval(myTimer);
    //myTimer = setInterval(changeSlide, 3000);

    var boxes = document.querySelectorAll('.main input');
    // console.log(boxes.length);
    var curSlide = 0;

    var slider = document.querySelector('.articleSlider');
    var articles = document.querySelectorAll('.catchArticle');

    var catchContainer = document.querySelector('.articleSlider .catchContainer');
    // catchContainer.style.backgroundColor = 'yellow';

    // console.log("Height:" + articles[0].clientHeight);

    var isListening = false;

    var slideHeight = articles[0].clientHeight;

    for (var i = 0; i < boxes.length; i++) {

        if (boxes[i].checked == true) {
            curSlide = i;
            //console.log(curSlide);
        }
    }

    if (curSlide === 0) {
        boxes[0].checked = false;
        boxes[1].checked = true;
        checkLabels();

        // console.log('1 button');
        isListening = false;

        catchContainer.style.transition = '0.8s all ease-in-out';
        catchContainer.style.transform = "translateY(" + (slideHeight * -1) + "px)";
        // articles[0].style.top = '-350px';
        // articles[1].style.top = '-100%';
        // articles[2].style.top = '-100%';
        // // articles[0].style.opacity = '0';
        // articles[0].style.transition = '2s all ease-in-out';
        // articles[1].style.transition = '2s all ease-in-out';
        // articles[2].style.transition = '2s all ease-in-out';
        // catchContainer.style.top = '-25%';
    }
    else if (curSlide === 1) {
        boxes[1].checked = false;
        boxes[2].checked = true;
        checkLabels();

        // console.log('2 button');
        isListening = false;

        catchContainer.style.transition = '0.8s all ease-in-out';
        catchContainer.style.transform = "translateY(" + (slideHeight * -2) + "px)";

        // catchContainer.style.transform = "translateY(-900px)";
        // catchContainer.style.top = '-50%';
    }
    else if (curSlide === 2) {
        boxes[2].checked = false;
        boxes[0].checked = true;
        checkLabels();

        // console.log('3 button');

        // catchContainer.addEventListener('transitionend', ()=>{
        // console.log('event handler triggered');
        // catchContainer.style.transition = 'none';
        // catchContainer.style.transform = "translateY(0)";
        // });
        isListening = true;
        // console.log(isListening);
        catchContainer.style.transform = "translateY(" + (slideHeight * -3) + "px)";
        catchContainer.style.transition = '0.8s all ease-in-out';
        catchContainer.addEventListener('transitionend', function _sick() {
            //refSlider(catchContainer, isListening, curSlide);
            catchContainer.removeEventListener('transitionend', _sick);
        });
        // catchContainer.style.top = '-75%';
        // isListening = false;
    }
    else {
        console.log('error');
    }
    catchContainer.style.transition = '0.8s all ease-in-out';
}

function refSlider(catchContainer, isListening, curSlide) {

    console.log("------------------------");
    console.log('Current Slide: ' + curSlide);
    var currentSlide = curSlide;
    console.log('Current Slide New: ' + currentSlide);


    if (currentSlide === 2) {
        console.log('event handler triggered');
        catchContainer.style.transition = 'none';
        catchContainer.style.transform = "translateY(0)";
        isListening = false;
    }
    else {
        console.log('nothing');
    }

    console.log('-------------------------');
}


function checkLabels() {

    //console.log('radio clicked');
    clearInterval(myTimer);
    myTimer = setInterval(changeSlide, 8000);

    var boxes = document.querySelectorAll('.main input');
    var label = document.querySelectorAll('.main label');
    var span = document.querySelectorAll('.main label span');
    var slider = document.querySelector('.articleSlider');
    var articles = document.querySelectorAll('.catchArticle');
    var catchContainer = document.querySelector('.articleSlider .catchContainer');
    var slideHeight = articles[0].clientHeight;
    var backgroundImages = ["images/disneyDark.png", "images/svfDark.png", "images/5gDark.png"]
    var main = document.querySelector('.main');

    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked == true) {
            label[i].style.border = "1px solid white";
            span[i].style.width = '8px';
            span[i].style.height = '8px';
            catchContainer.style.transform = "translateY(" + (slideHeight * -i) + "px)";
            catchContainer.style.transition = '0.8s ease-in-out all';
            main.style.backgroundImage = "url(" + backgroundImages[i] + ")";
            main.style.backgroundSize = "cover";
        }
        else {
            label[i].style.border = "none";
            span[i].style.width = '11px';
            span[i].style.height = '11px';
        }
    }

}