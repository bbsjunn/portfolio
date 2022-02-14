$(function(){
  
  const $home = $('header > h1 > a');
  const $gnb = $('header > .gnb > ul > li');
  const $btn = $('header > .language > .select-btn');
  const $lang = $('header > .language > .lang-container');
  const $visual = $('#visual > .visual-bg > ul > li');
  const $visualSub = $('#visual > .visual-bg');
  const $textBox = $('#visual > .visual-bg > .text-container');
  const $scrollDown = $('#visual > .visual-bg > .scroll-down');
  const $mainText = $('#visual > .visual-bg > .main-text');
  const $serv = $('#Service > .service-container > .list-of-list > li');

  let servIdx = 0;
  let gnbIdx = 0;
  let arrTopVal = [];

  $(window).on('scroll load resize', function(){
    let scrollTop = $(this).scrollTop();
    let visualWidth = $(this).width();
    
    if(visualWidth > 850) {
      if(scrollTop < 1){
        $visual.height($(window).height());
        $visualSub.height($(window).height());
      }
    }else {
      
      if(scrollTop > 1) {
        $home.stop().fadeOut(200);
        $btn.stop().fadeOut(200);
      }else {
        $visual.css({ height: 500 });
        $home.stop().fadeIn(200);
        $btn.stop().fadeIn(200);
      }

      if(scrollTop > 550){
        $('header > .gnb').css({
          position: 'fixed',
          top: 0
        });
      }else{
        $('header > .gnb').css({
          position: 'absolute',
          top: 545
        });
      }
    }

    for(let i=0; i<$gnb.size(); i++){
      arrTopVal[i] = $('header~section').eq(i).offset().top;

      if(scrollTop >= arrTopVal[i]){
        $gnb.eq(i).addClass('on').siblings().removeClass('on');
      }
    }

  });
  
  $(window).on('scroll', function () {
    let visualWidth = $(this).width();
    let scrollTop = $(this).scrollTop();
    
    if(visualWidth > 850){
      if(scrollTop > 1){
        $visual.css({ height: 360 });
      }
    }else{
      if(scrollTop > 1){
        $visual.css({ height: 120 });
      }
    }
    
    if(scrollTop > 1){
      $visual.removeClass('sizeOrig');
      $visual.addClass('sizetrans');
      $textBox.fadeOut(200);
      $scrollDown.fadeOut(200);
      $mainText.fadeIn(200);
    }else{
      $visual.removeClass('sizetrans');
      $visual.addClass('sizeOrig');
      $textBox.fadeIn(200);
      $scrollDown.fadeIn(200);
      $mainText.fadeOut(200);
    }
      
  });

  $home.on('click', function (evt) {
    evt.preventDefault();
    $('html, body').stop().animate({scrollTop: 0});
  });

  $gnb.on('click', function(evt){
    evt.preventDefault();
    gnbIdx = $gnb.index(this);
    $('html, body').stop().animate({scrollTop:arrTopVal[gnbIdx]});

    $gnb.eq(gnbIdx).addClass('on').siblings().removeClass('on');
  });
  
  $btn.on('click', function (evt) {
    evt.preventDefault();
    $lang.stop().fadeToggle(100);
  });

  $serv.on('mouseover', function(){
    servIdx = $serv.index(this);
    // console.log(servIdx);
    let visualWidth = $(window).width();

    if(visualWidth > 850){
      $serv.eq(servIdx).children('.shadow').stop().fadeIn(300);
    }
  });

  $serv.on('mouseout', function(){
    servIdx = $serv.index(this);
    let visualWidth = $(window).width();

    if(visualWidth > 850){
      $serv.eq(servIdx).children('.shadow').stop().fadeOut(300);
    }
  });

});