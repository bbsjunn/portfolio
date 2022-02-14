$(function () {

  const $mnu = $('header > .nav > .frame > .gnb > li > a');
  const $mainScreen = $('section > .list-5 > .slides > .screen > img');
  const $imgClick = $('section > .list-5 > .slides > ul > li > a');

  let mnuIdx = 0;
  let imgIdx = 0;
  let arrTopVal = [0, 770, 1890, 3600, 5470, 6033];
  let imgArr = ['./images/dokdo/gallery_5.jpg', './images/dokdo/gallery_8.jpg', './images/dokdo/gallery_6.jpg', './images/dokdo/gallery_7.jpg', './images/dokdo/gallery_1.jpg', './images/dokdo/gallery_2.jpg', './images/dokdo/gallery_3.jpg', './images/dokdo/gallery_4.jpg'];
  let intervalId = '';

  function pageAni(topVal){
    $('html, body').stop().animate({scrollTop:topVal});
  }

  $mnu.on('click', function(evt){
    mnuIdx = $mnu.index(this);
    $mnu.eq(mnuIdx).parent().addClass('on').siblings().removeClass('on');
    pageAni(arrTopVal[mnuIdx]-70);
    evt.preventDefault();
  });

  $(window).on('scroll', function(){
    let scrollTop = $(this).scrollTop();
    // console.log("scrollTop = ",scrollTop);

    for(let i=0;i<$mnu.size();i++){
      if(scrollTop>=arrTopVal[i]-200){
          $mnu.eq(i).parent().addClass('on').siblings().removeClass('on');
      }else if(scrollTop<arrTopVal[0]-200){
          $mnu.parent().removeClass('on');
      }
    }
  });

  $imgClick.on('click', function (evt) {
    evt.preventDefault();

    imgIdx = $imgClick.index(this);
    // console.log(imgIdx);

    $imgClick.eq(imgIdx).parent().addClass('on').siblings().removeClass('on');

    $mainScreen.attr('src', imgArr[imgIdx]);
  });

  intervalId = setInterval(function () {

    if(imgIdx < 7){
      imgIdx++;
    }else{
      imgIdx = 0;
    }

    $imgClick.eq(imgIdx).parent().addClass('on').siblings().removeClass('on');

    $mainScreen.attr('src', imgArr[imgIdx]);
  }, 5000);

});