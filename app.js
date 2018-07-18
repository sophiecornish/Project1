$(document).ready(() => {

  // ---------------Get DOM elements-----------------------------------//
  const trumps = $('.trumps');
  const $scoreboardFill = $('.scoreboardFill');
  const $timer = $('.timer');
  const $youLose = $('#youLose');
  const $tryAgain = $('#tryAgain');
  const $congrats = $('#congrats');
  const $start = $('#start');
  const $letsBegin = $('#letsBegin');
  const $wrapper = $('.wrapper');


  // ---------------Initialise level ----------------------------------//
  let currentLevel = -1;
  let initialTimer = 10;
  const levels = [
    { name: 1, numberOfTrumps: 5 },
    { name: 2, numberOfTrumps: 8 },
    { name: 3, numberOfTrumps: 12 },
    { name: 4, numberOfTrumps: 20 }
  ];

  let trumpsRemaining;

  //----------------Trump variables/styles ---------------------------//
  const images = [ './images/trumpOne.png', './images/trumpTwo.png', './images/trumpThree.png', './images/trumpFour.png', './images/trumpFive.png'];

  const speeds = ['10', '12', '15'];

  const animations = ['circle', 'rotate', 'bounce'];

  //----------SHOW START MESSAGE------------//

  function runToStart() {

    $letsBegin.show();

  }
  runToStart();

//------------ ADDING NEW TRUMPS --------------------//

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
    $('.trump').on('click', trumpClickHandler);
  }

  //--------------- start Game--------------------//

  $start.on('click', startGame);


  function startGame() {
    currentLevel ++;
    trumps.empty();
    $scoreboardFill.width(0);
    trumpsRemaining = levels[currentLevel].numberOfTrumps;
    console.log('--->',trumpsRemaining);
    addTrumps(levels[currentLevel].numberOfTrumps);
    countDownValue = initialTimer;
    $timer.html('00:' + countDownValue);
    setTimeout(startTimer, 2000);
    $letsBegin.hide(1000);
    $wrapper.show();


  }

  //----------------- start Timer / Reset ----------------------//


  let countDownValue = $timer.html();
  let countdown;
  const $reset = $('#reset');

  function startTimer() {
    countdown = setInterval(() => {
      countDownValue --;
      $timer.html('00:' + countDownValue);
      if (countDownValue === 0) {
        console.log('clearing interval', countdown);
        clearInterval(countdown);
        $youLose.show();
      }
    }, 1000);
  }

  function resetTimer() {
    $reset.on('click', function() {
      clearInterval(countdown);
      countDownValue = 10;
      $timer.html(10);
    });
  }
  //-----------------on click events (noises / hide / scoreboard) -----------------//




  function trumpClickHandler() {
    $(this).off('click');
    const audio = document.querySelector('audio');
    const noises = ['trumpOne', 'trumpTwo', 'trumpThree', 'trumpFour', 'trumpFive'];
    const randomNoise = noises[Math.floor(Math.random() * noises.length)];
    console.log('randomNoise', randomNoise);
    $(event.target).hide(400);
    audio.src = `./sounds/${randomNoise}.mp3`;
    audio.play();
    trumpsRemaining --;
    console.log(trumpsRemaining);
    $('.scoreboardFill').width(function(n, currentWidth) {
      return currentWidth + ($('.scoreboard').width() / levels[currentLevel].numberOfTrumps);
    });
  }

  //-------------- run audio & disappear on click -------//


  $('.trump').on('click', trumpClickHandler);





  //------------ RESET ------------------ //

  trumps.on('click', '.trump', function() {
    if(trumpsRemaining === 0){
      clearInterval(countdown);
      $congrats.show(10);
      $congrats.delay(1000);
      $congrats.hide(10);
      startGame();
    }
  });


  //------------- Try Again ------------------//

  $tryAgain.on('click', function() {
    location.reload();
  });

});
