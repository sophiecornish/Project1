$(document).ready(() => {

// -------------------generate trumps function ---------------------------//

  const trumps = $('.trumps');
  //
  // const levels = [{ name: 1, trumps: 8 }, {name: 2, trumps: 12 }]

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


  }
  addTrumps(5);

  //--------------- levels --------------------//

  const levelsDisabled = false;

  $('#level1').on('click', () => {
    if (levelsDisabled) {
      return;
    } else {
    addTrumps(5);
    levelsDisabled = true;
  }
  if (levelsDisabled) {
    return;
  } else {
  $('#level2').on('click', () => {
    addTrumps(10);
    levelsDisabled = true;
  });
  if (levelsDisabled) {
    return;
  } else {
  $('#level3').on('click', () => {
    addTrumps(15);
  });



  //-------------- run audio & disappear on click -------//

  const audio = document.querySelector('audio');
  const noises = ['trumpOne', 'trumpTwo', 'trumpThree', 'trumpFour', 'trumpFive'];

  trumps.on('click', '.trump', function(){
    const randomNoise = noises[Math.floor(Math.random()*noises.length)];
    console.log(randomNoise);
    $(event.target).hide(400);
    audio.src = `./sounds/${randomNoise}.mp3`;
    audio.play();
  });










//-------------------TIMER ----------------------//


  const $timer = $('.timer');
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




});



// bug with TrumpFive //
