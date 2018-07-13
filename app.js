$(document).ready(() => {


  ////TRUMPS CLICK FUNCTION ////

  const $trumps = $('.trump');
  console.log($trumps);


  $trumps.on('click', click);

  function click (e) {
    $(e.target).hide(500);

  }

  // ////TIMER//////


  const $timer = $('.timer');
  let countDownValue = $timer.html();
  const $start = $('#start');

  $start.on('click', function() {
    const countdown = setInterval(() => {
      countDownValue --;
      $timer.html(countDownValue);
      if (countDownValue ===0) {
        clearInterval(countdown);
      }
    }, 1000);


    ////    RESET     ////

    const $reset = $('#reset');

    $reset.on('click', function (){
      clearInterval(countdown);
      $timer.html = 10;


    });


  });
















});
