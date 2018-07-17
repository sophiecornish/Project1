$(document).ready(() => {

  // ---------------Get DOM elements-----------------------------------//
  const trumps = $('.trumps');
  const $scoreboardFill = $('.scoreboardFill');
  const $timer = $('.timer');
  const $youLose = $('#youLose');
  const $tryAgain = $('#tryAgain');
  const $congrats = $('#congrats');

  // ---------------Initialise level ----------------------------------//
  let level = 1;
  let numberOfTrumps = 5;
  let trumpsRemaining;

  //----------------Trump variables/styles ---------------------------//
  const images = [ './images/trumpOne.png', './images/trumpTwo.png', './images/trumpThree.png', './images/trumpFour.png', './images/trumpFive.png'];

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
    $('.trump').on('click', trumpClickHandler);
  }

  //--------------- levels --------------------//

  function levelsAndScore() {
    $('#start').on('click', () => {
      trumps.empty();
      $scoreboardFill.width(0);
      level = 1;
      trumpsRemaining = numberOfTrumps;
      console.log('--->',trumpsRemaining);
      addTrumps(numberOfTrumps);
    });


    // $('#level2').on('click', () => {
    //   trumps.empty();
    //   $scoreboardFill.width(0);
    //   level = 2;
    //   numberOfTrumps = 8;
    //   trumpsRemaining = numberOfTrumps;
    //   addTrumps(numberOfTrumps);
    //
    // });
    // $('#level3').on('click', () => {
    //   trumps.empty();
    //   $scoreboardFill.width(0);
    //   level = 3;
    //   numberOfTrumps = 12;
    //   trumpsRemaining = numberOfTrumps;
    //   addTrumps(numberOfTrumps);
    // });


    //-----------------scoreboard -----------------//

  }

  levelsAndScore();


  function trumpClickHandler() {
    $(this).off('click');
    const audio = document.querySelector('audio');
    const noises = ['trumpOne', 'trumpTwo', 'trumpThree', 'trumpFour', 'trumpFive'];
    const randomNoise = noises[Math.floor(Math.random()*noises.length)];
    console.log('randomNoise', randomNoise);
    $(event.target).hide(400);
    audio.src = `./sounds/${randomNoise}.mp3`;
    audio.play();
    trumpsRemaining --;
    console.log(trumpsRemaining);
    $('.scoreboardFill').width(function(n, currentWidth) {
      return currentWidth + ($('.scoreboard').width() / numberOfTrumps);
    });
  }

  //-------------- run audio & disappear on click -------//


  $('.trump').on('click', trumpClickHandler);


  //-------------------TIMER ----------------------//


  let countDownValue = $timer.html();
  let clickDisabled = false;
  let countdown;



  trumps.on('click', '.trump', function() {

    if (clickDisabled) {
      return;

    }  else {

      countdown = setInterval(() => {

        clickDisabled = true;
        countDownValue --;
        $timer.html(countDownValue);
        if (countDownValue ===0) {
          clearInterval(countdown);
          $youLose.show();
        }
      }, 1000);
    }

    const $reset = $('#reset');

    $reset.on('click', function() {
      clearInterval(countdown);
      countDownValue = 10;
      $timer.html(10);
      clickDisabled = false;

    });

  });


  //------------- Try Again ------------------//

  $tryAgain.on('click', function() {
    location.reload();

  });

  //------------------ Trumps Remaining/Level Up ------//
  // 
  // function levelUp(){
  //   if (trumpsRemaining ===0) {
  //     $congrats.show();
  //   }
  //
  // }
  // levelUp();




  //----- Start Game ----------------------------------
  addTrumps(5);

});




// });
