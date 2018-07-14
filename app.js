$(document).ready(() => {


  ////   TRUMPS CLICK FUNCTION   ////

  const $trumps = $('.trump');
  console.log($trumps);


  $trumps.on('click', click);


  function click (e) {
    $(e.target).hide(400);
  }

  // ////   TIMER   //////


  const $timer = $('.timer');
  let countDownValue = $timer.html();
  const $start = $('#start');
  let timerRunning = false;


  $start.on('click', function() {

    const countdown = setInterval(() => {
      countDownValue --;
      $timer.html(countDownValue);
      timerRunning = true;
      if (countDownValue ===0) {
        clearInterval(countdown);
        timerRunning = false;
      }
    }, 1000);




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
