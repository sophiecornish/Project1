$(document).ready(() => {


  ///////// generate random animation ///////////////

  const animations = ['circle', 'rotate', 'bounce'];
  const animation = animations[Math.floor(Math.random()*animations.length)];
  console.log(animation);

  const trumps = ['trumpOne', 'trumpTwo', 'trumpThree', 'trumpFour', 'trumpFive'];

  const trump = trumps[Math.floor(Math.random()*trumps.length)];
  console.log(trump);

  function animate() {
    console.log($('.trump').style);
    $('.trump').css({animationName: animation});
  }

  animate();






  ////   TRUMPS CLICK FUNCTION   ////

  const $trumps = $('.trump');
  console.log($trumps);
  const audio = document.querySelector('audio');


  $trumps.on('click', click);


  function click (e) {
    $(e.target).hide(400);
    audio.src = `./sounds/${e.target.id}.mp3`;


    audio.play();
  }

  // ////   TIMER   //////


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




    ////    RESET     ////

    const $reset = $('#reset');

    $reset.on('click', function() {
      clearInterval(countdown);
      countDownValue = 10;
      $timer.html(10);
      timerRunning = false;

    });


  });
















});
