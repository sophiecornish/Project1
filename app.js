$(document).ready(() => {

// -------------------generate trumps function ---------------------------//

  const trumps = $('.trumps');

  const images = [ './images/trumpOne.png', './images/trumpTwo.png', './images/trumpThree.png', './images/trumpFour.png', './images/trumpFive.png'   ];

  const speeds = ['10', '12', '15'];

  const animations = ['circle', 'rotate', 'bounce'];

  function addTrumps(numberOfTrumps) {
    for(let i = 0; i < numberOfTrumps; i++) {
      const randomImage = images[Math.floor(Math.random()*images.length)];

      const randomAnimation = animations[Math.floor(Math.random()*animations.length)];
      console.log(randomAnimation);

      const randomSpeed =
      speeds[Math.floor(Math.random()*speeds.length)];
      console.log(randomSpeed);



      const newTrump = document.createElement('div');
      newTrump.className = 'trump';
      newTrump.style.backgroundImage = `url("${randomImage}")`;
      newTrump.style.animationName = randomAnimation;
      newTrump.style.animationDuration = randomSpeed;
      trumps.append(newTrump);
    }


  }
  addTrumps(8);

  const audio = document.querySelector('audio');
  const noises = ['trumpOne', 'trumpTwo', 'trumpThree', 'trumpFour', 'trumpFive'];




  trumps.on('click', '.trump', function(){
    const randomNoise = noises[Math.floor(Math.random()*noises.length)];
    console.log(randomNoise);
    $(event.target).hide(400);
    audio.src = `./sounds/${randomNoise}.mp3`;
    audio.play();
  });

});



//------------------- TRUMPS CLICK FUNCTION ----------------------//

// const $trumps = $('.trumps');



// $trumps.on('click', click());



// function click(e) {
//   $(e.target).hide(400);
//   audio.src = `./sounds/${randomNoise}.mp3`;
//   console.log('hi');



// }

//-------------------TIMER ----------------------//


const $timer = $('.timer');
let countDownValue = $timer.html();
const $start = $('#start');
let timerRunning = false;
var clickDisabled = false;



$trumps.on('click', function() {

  if (clickDisabled) {
    return;

  }  else {

    const countdown = setInterval(() => {

      clickDisabled = true;
      countDownValue --;
      $timer.html(countDownValue);
      timerRunning = true;
      if (countDownValue ===0) {
        clearInterval(countdown);
        timerRunning = false;
      }
    }, 1000);
  }




  //------------------------ RESET --------------------------//

  const $reset = $('#reset');

  $reset.on('click', function() {
    clearInterval(countdown);
    countDownValue = 10;
    $timer.html(10);
    timerRunning = false;

  });

















});
