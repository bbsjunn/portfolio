$(function(){
    const $gnb = $('header > .nav-container > .gnb > li');
    const $slides = $('#main-banner > .slides-container > .slides > li');
    const $slidesNav = $('#main-banner > .slides-container > .slides-pagination > li > a');
    const $banner = $('#contents-banner > .contents > li');
    const $item = $('#slides-item > .slides > .slides-container > li > .item > li');
    const $itemSlides = $('#slides-item > .slides > .slides-container');
    const $itemNav = $('#slides-item > .slides-pagination > li > a');
    const $itemPrev = $('#slides-item > .prev');
    const $itemNext = $('#slides-item > .next');
    const $pick = $('#slides-daily > .slides-box > .slides > .slides-container > li > .pick > li');
    const $pickNav = $('#slides-daily > .slides-box > .slides-pagination > li > a');
    const $pickContainer = $('#slides-daily > .slides-box > .slides > .slides-container');
    const $pickPrev = $('#slides-daily > .slides-box > .prev');
    const $pickNext = $('#slides-daily > .slides-box > .next');


    let gnbIdx = 0;
    let slideNowIdx = 0;
    let slideOldIdx = slideNowIdx;
    let interValKey = '';
    let bannerIdx = 0;
    let itemIdx = 0;
    let itemNowIdx = 0;
    let pickIdx = 0;
    let pickNowIdx = 0;


    // scroll시 사이드 up/down 버튼 hover
    $(window).on('scroll', function () {
        let scrollTop = $(this).scrollTop();
        // console.log(scrollTop);

        if(scrollTop > 450){
            $('.updown').stop().fadeIn(50);
        }else{
            $('.updown').stop().fadeOut(50);
        }
    });


    // up/down 버튼 클릭시 홈페이지 상단/하단으로 이동
    $('.updown > .up').on('click', function (evt) {
        evt.preventDefault();
        $('html, body').stop().animate({ scrollTop: 0 });
    });
    $('.updown > .down').on('click', function (evt) {
        evt.preventDefault();
        $('html, body').stop().animate({ scrollTop: 4000 }, 500);
    });


    // 메뉴 hover시 서브메뉴 fadeIn/Out
    $gnb.on('mouseover', function () {
        gnbIdx = $gnb.index(this);

        $gnb.eq(gnbIdx).children('.lnb').stop().fadeIn(200);
    });
    $gnb.on('mouseout', function () {
        gnbIdx = $gnb.index(this);

        $gnb.eq(gnbIdx).children('.lnb').stop().fadeOut(200);
    });


    // 슬라이드 버튼 클릭시 해당 메인 배너로 이동
    $slidesNav.on('click', function(evt){
        evt.preventDefault();

        slideOldIdx = slideNowIdx;
        slideNowIdx = $slidesNav.index(this);
        // console.log(slideIdx);

        $slides.eq(slideOldIdx).stop().fadeOut(700);
        $slides.eq(slideNowIdx).stop().fadeIn(700);
        $slidesNav.eq(slideNowIdx).parent().addClass('on').siblings().removeClass('on');
    });


    // 슬라이드 자동 재생
    interValKey = setInterval(function(){
        slideOldIdx = slideNowIdx;

        if(slideNowIdx < 4){
            slideNowIdx++;
        }else{
            slideNowIdx = 0;
        }

        $slides.eq(slideOldIdx).stop().fadeOut(700);
        $slides.eq(slideNowIdx).stop().fadeIn(700);
        $slidesNav.eq(slideNowIdx).parent().addClass('on').siblings().removeClass('on');
    }, 7000);


    // contents-banner hover시 그림자 fadeIn/Out
    $banner.on('mouseover', function () {
        bannerIdx = $banner.index(this);

        $banner.eq(bannerIdx).find('.shadow').stop().fadeIn(300);
    });
    $banner.on('mouseout', function () {
        bannerIdx = $banner.index(this);

        $banner.eq(bannerIdx).find('.shadow').stop().fadeOut(300);
    });


    // item hover시 icon fadeIn/Out
    $item.on('mouseover', function () {
        itemIdx = $item.index(this);
        $item.eq(itemIdx).find('.icon').stop().fadeIn(200);
    });
    $item.on('mouseout', function () {
        itemIdx = $item.index(this);
        $item.eq(itemIdx).find('.icon').stop().fadeOut(200);
    });


    // item 이전/다음/nav 버튼 클릭시 item-container 슬라이드 이동
    $itemNav.on('click', function (evt) {
        evt.preventDefault();

        itemNowIdx = $itemNav.index(this);

        $itemNav.eq(itemNowIdx).parent().addClass('on').siblings().removeClass('on');
        $itemSlides.stop().animate({ left: -1140*itemNowIdx }, 500);
    });
    $itemPrev.on('click', function (evt) {
        evt.preventDefault();

        if(itemNowIdx > 0){
            itemNowIdx--;
        }else{
            itemNowIdx = 4;
        }

        const $itemMove = $('#slides-item > .slides > .slides-container > li');
        
        $itemMove.last().prependTo($itemSlides);
        $itemSlides.css({ left: -1140 });
        $itemSlides.stop().animate({ left: 0 }, 500);

        $itemNav.eq(itemNowIdx).parent().addClass('on').siblings().removeClass('on');
    });
    $itemNext.on('click', function (evt) {
        evt.preventDefault();
        
        if(itemNowIdx < 4){
            itemNowIdx++;
        }else{
            itemNowIdx = 0;
        }
        
        const $itemMove = $('#slides-item > .slides > .slides-container > li');

        $itemSlides.stop().animate({ left: -1140 }, 500, function () {
            $itemMove.first().appendTo($itemSlides);
            $itemSlides.css({ left: 0 });
        });
        
        $itemNav.eq(itemNowIdx).parent().addClass('on').siblings().removeClass('on');
    });


    // pick hover시 icon fadeIn/Out
    $pick.on('mouseover', function () {
        pickIdx = $pick.index(this);
        $pick.eq(pickIdx).find('.icon').stop().fadeIn(200);
    });
    $pick.on('mouseout', function () {
        pickIdx = $pick.index(this);
        $pick.eq(pickIdx).find('.icon').stop().fadeOut(200);
    });


    // pick 이전/다음/nav 버튼 클릭시 pick-container 슬라이드 이동
    $pickNav.on('click', function (evt) {
        evt.preventDefault();

        pickNowIdx = $pickNav.index(this);

        $pickNav.eq(pickNowIdx).parent().addClass('on').siblings().removeClass('on');
        $pickContainer.stop().animate({ left: -1140 * pickNowIdx }, 500);
    });
    $pickPrev.on('click', function (evt) {
        evt.preventDefault();

        if(pickNowIdx > 0){
            pickNowIdx--;
        }else{
            pickNowIdx = 1;
        }

        const $pickMove = $('#slides-daily > .slides-box > .slides > .slides-container > li');

        $pickMove.last().prependTo($pickContainer);
        $pickContainer.css({ left: -1140 });
        $pickContainer.stop().animate({ left: 0 }, 500);
        
        $pickNav.eq(pickNowIdx).parent().addClass('on').siblings().removeClass('on');
    });
    $pickNext.on('click', function (evt) {
        evt.preventDefault();

        if(pickNowIdx < 1){
            pickNowIdx++;
        }else{
            pickNowIdx = 0;
        }

        const $pickMove = $('#slides-daily > .slides-box > .slides > .slides-container > li');

        // $pickMove.first().appendTo($pickContainer);
        $pickContainer.stop().animate({ left: -1140 }, 500, function() {
            $pickContainer.css({ left: 0 });
            $pickMove.first().appendTo($pickContainer);
        });


        $pickNav.eq(pickNowIdx).parent().addClass('on').siblings().removeClass('on');
    });
});