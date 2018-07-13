$(document).ready(() => {

  const $trumps = $('.trump');
  console.log($trumps);


  $trumps.on('click', click);

  function click (e) {
    $(e.target).hide(e);

  }




  // const trumps = document.querySelectorAll('.trump');
  // console.log(trumps);
  // trumps.forEach(trump => trump.addEventListener('click', toggleHide));
  //
  // function toggleHide() {
  //   console.log('click');
  // }





});
