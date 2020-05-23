$(window).on('load',function(){
    $('#myModal').modal('show');
});
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 15;
const TURNS=5;
let score=0;
let turn=0;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let radius=20;
document.getElementById("countdown").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="${radius}"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -${radius}, 0
          a ${radius},${radius} 0 1,0 ${2*radius},0
          a ${radius},${radius} 0 1,0 -${2*radius},0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;
function setTarget(){
    document.getElementById("input").innerText=parseInt(Math.random()*10);
}
function checkdata(data){
    if(document.getElementById("input").innerText==data){
        score+=timeLeft;
        document.getElementById("score").innerText=score;
        
        setTarget();
        onTimesUp();
        if(turn!=TURNS){
        startTimer();}
        
    }
        $("#clear-button").click();
        document.getElementById("output").innerText=data;
    
}
function startGame(){
    score=0;
    document.getElementById("score").innerText=score;
    $("#clear-button").click();
    document.getElementById("output").innerText="";
    turn=0;
    setTarget();
    resetTimer();
    startTimer();

}

function resetTimer(){
    timePassed=0;
    timeLeft=TIME_LIMIT;
    document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
      );
    }
      
function makeRestartModal(){
    document.getElementById("start").innerText="Restart";
    document.getElementById('prevScorecard').removeAttribute('hidden');
    document.getElementById("prevscore").innerText=score;
}
function onTimesUp() {
  clearInterval(timerInterval);
  timerInterval=null;
  resetTimer();
  turn+=1;
  if(turn==TURNS){
    $('#myModal').modal('show');
      makeRestartModal();
   
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
  else{
    document
    .getElementById("base-timer-path-remaining")
    .classList.remove(warning.color);
    document
    .getElementById("base-timer-path-remaining")
    .classList.remove(alert.color);
  document
    .getElementById("base-timer-path-remaining")
    .classList.add(info.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
  }
