const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
let interval;
let time = [0,0,0,0];

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){

    if(time < 10){
        time = "0"+time
    }
    return time;
}
let timer;
// Run a standard minute/second/hundredths timer:
function runTimer(){

    timer = `${leadingZero(time[0])}:${leadingZero(time[1])}:${leadingZero(time[2])}`;

    theTimer.textContent = timer;
    time[3]++;

    time[0] = Math.floor((time[3]/100)/60);
    time[1] = Math.floor((time[3]/100) - time[0] *60);
    time[2] = Math.floor(time[3] - time[1]*100 - time[0]*6000);
}

// Match the text entered with the provided text on the page:
function checkCorrectness(){
    let originalText = originText;
    let text = testArea.value;
    console.log(text, originalText);
    if(text==originalText){
        testWrapper.style.borderColor = "green";
        clearInterval(interval);

    }

   else if(text == originalText.substr(0, text.length)){
        console.log("inside if")
        testWrapper.style.borderColor = "blue";

    }
    else
    testWrapper.style.borderColor = "orange";

}

// Start the timer:
let bool = true;
function startTimer(){
    let textLength = testArea.value.length;
    if( textLength == 0 && bool){

         interval = setInterval(runTimer, 10);
         bool = false;

    }
}

// Reset everything:
function resetAll(e){
    e.preventDefault();
    testArea.value = "";
    bool = true;
    testWrapper.style.borderColor = "gray";

    time = [0,0,0,0];
    timer = `${leadingZero(time[0])}:${leadingZero(time[1])}:${leadingZero(time[2])}`;
    theTimer.textContent = timer;
    clearInterval(interval);
   
    console.log("Reset Clicked");
}

// Event listeners for keyboard input and the reset button:

testArea.addEventListener('keypress',startTimer);

testArea.addEventListener('keyup', checkCorrectness);

resetButton.addEventListener('click', resetAll);
