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
  let gameOn = false;

  function generateRandomAnimation() {
    return animations[Math.floor(Math.random()*animations.length)];
  }

  function generateRandomSpeed() {
    return speeds[Math.floor(Math.random()*speeds.length)];
  }

  //----------------Trump variables/styles ---------------------------//
  const images = [ './images/trumpOne.png', './images/trumpTwo.png', './images/trumpThree.png', './images/trumpFour.png', './images/trumpFive.png'];

  const speeds = ['10', '12', '15'];

  const animations = ['circle', 'rotate', 'bounce', 'nudge', 'revRotate'];

  const backingAudio = document.querySelector('#backing');

  const hugeAudio = document.querySelector('#huge');

  //----------SHOW START MESSAGE------------//
  function runToStart() {
    $letsBegin.show();
  }

  runToStart();

  // ---------------Initialise level ----------------------------------//
  let currentLevel = -1;
  const initialTimer = 15;
  const levels = [
    { name: 1, numberOfTrumps: 5 },
    { name: 2, numberOfTrumps: 8 },
    { name: 3, numberOfTrumps: 12 },
    { name: 4, numberOfTrumps: 20 }
  ];

  let trumpsRemaining;

  //------------ ADDING NEW TRUMPS --------------------//

  function addTrumps(numberOfTrumps) {
    for(let i = 0; i < numberOfTrumps; i++) {

      const randomImage = images[Math.floor(Math.random()*images.length)];
      const randomAnimation = generateRandomAnimation();
      console.log(randomAnimation);

      const randomSpeed = generateRandomSpeed();
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

    backingAudio.play();
    hugeAudio.play();


    currentLevel ++;
    trumps.empty();
    gameOn = true;
    $scoreboardFill.width(0);
    trumpsRemaining = levels[currentLevel].numberOfTrumps;
    addTrumps(levels[currentLevel].numberOfTrumps);
    countDownValue = initialTimer;
    $timer.html(`00:${countDownValue}`);
    setTimeout(startTimer, 2000);
    $letsBegin.hide(1000);
    $wrapper.show();

    if (currentLevel === 0) {
      addObama(1);
      addPutin(2);
    } else if(currentLevel === 1) {
      addObama(3);
      addPutin(3);
    } else if(currentLevel === 2) {
      addObama(3);
      addPutin(3);
    } else if(currentLevel === 3) {
      addObama(4);
      addPutin(3);
    }
  }



  //--------------add OBAMA ---------------------//

  function addObama(numberOfObamas) {
    for(let i = 0; i < numberOfObamas; i++) {

      const newObama = document.createElement('div');
      newObama.className = 'obama';
      newObama.style.backgroundImage = `url("${'./images/obama.png'}")`;
      newObama.style.animationName = generateRandomAnimation();
      newObama.style.animationDuration = generateRandomSpeed();
      newObama.addEventListener('click', obamaClickHandler);
      trumps.append(newObama);
    }
  }


  //------------- add Putin ---------------- //

  function addPutin(numberofPutins) {
    for(let i = 0; i < numberofPutins; i++) {
      const newPutin = document.createElement('div');
      newPutin.className = 'putin';
      newPutin.style.backgroundImage = `url("${'./images/putin.png'}")`;
      newPutin.style.animationName = generateRandomAnimation();
      newPutin.style.animationDuration = generateRandomSpeed();
      newPutin.addEventListener('click', putinClickHandler);
      trumps.append(newPutin);

    }
  }




  //----------------- start Timer / Reset ----------------------//


  let countDownValue = $timer.html();
  let countdown;


  function startTimer() {
    countdown = setInterval(() => {
      countDownValue --;
      countDownValue < 10 ? $timer.html(`00:0${countDownValue}`) : $timer.html(`00:${countDownValue}`);
      if (countDownValue === 0) {
        console.log('clearing interval', countdown);
        clearInterval(countdown);
        $youLose.show();
        $('.wall').addClass('rise-from-below');
        gameOn = false;


      }
    }, 1000);
  }

  //-----------------on click events (noises / hide / scoreboard) -----------------//

  function trumpClickHandler() {
    if(gameOn===true) {
      $(this).off('click');
      const audio = document.querySelector('#trump');
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
  }

  //-------------- run audio & disappear on click -------//


  $('.trump').on('click', trumpClickHandler);


  //---------------- obama click handler -------------//


  function obamaClickHandler() {
    console.log('Clicked Obama!');
    if(gameOn===true) {
      $(this).off('click');
      const obamaAudio = document.querySelector('#obama');
      $(event.target).hide(400);
      $('.wall').addClass('rise-from-below');
      $youLose.show();

      obamaAudio.play();
    }
  }

  //--------------- Putin click handler ----------------//

  function putinClickHandler() {
    if(gameOn === true) {
      $(this).off('click');
      const putinAudio = document.querySelector('#putin');
      $(event.target).hide(400);
      addTrumps(3);
      putinAudio.play();
    }

  }

  //------------ LEVEL UP ------------------ //

  trumps.on('click', '.trump', function() {
    if(trumpsRemaining === 0){
      clearInterval(countdown);
      $congrats.show(10);
      $congrats.delay(1000);
      $congrats.hide(10);
      hugeAudio.play();
      startGame();
    }
  });


  //------------- Try Again ------------------//

  $tryAgain.on('click', function() {
    location.reload();
  });

});
