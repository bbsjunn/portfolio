$(function(){
  const $gnb = $('#wrap > header > nav > .gnb');
  const $lnb = $gnb.find('.lnb');
  const $bg_lnb = $('header > nav > .bg-lnb');

  const $btnMenu = $('header > nav > .btn-menu');
  const $btnGnb = $('header > nav > .btn-gnb');
  const $listOn = $('header > nav > .btn-gnb > .gnb-list > .list > li');
  const $listSub = $('header > nav > .btn-gnb > .gnb-sub-list > .sub-list');

  let listIdx = 0;

  $gnb.on('mouseover', function(){
    $bg_lnb.stop().fadeIn(200);
    $lnb.stop().fadeIn(200);
  });

  $gnb.on('mouseout', function(){
    $bg_lnb.stop().fadeOut(200);
    $lnb.stop().fadeOut(200);
  });

  $bg_lnb.on('mouseover', function(){
    $gnb.trigger('mouseover');
  });

  $bg_lnb.on('mouseout', function(){
    $gnb.trigger('mouseout');
  });

  $btnMenu.on('click', function(evt){
    evt.preventDefault();

    $btnGnb.stop().slideToggle(500);
    $btnMenu.toggleClass('toggleBgp');
  });

  $listOn.hover(function(){
    listIdx = $listOn.index(this);
    $listOn.eq(listIdx).addClass('on').siblings().removeClass('on');
    $listSub.eq(listIdx).stop().fadeIn(200).siblings().stop().fadeOut(200);
  });
});