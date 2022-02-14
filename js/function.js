$(document).ready(function(){

    const $introWelc = $('#visual > .intro > .welcome');
    const $introCont = $('#visual > .intro > .cont');
    const $introName = $('#visual > .intro > .name');
    const $introTit = $('#visual > .intro > .tit');
    const $aside = $("aside");
    const $header = $("header");
    const headerH = $header.outerHeight();
    const $aboutme = $("#aboutme");
    const $mnu = $('header>.container>nav>.gnb>li>a');


    let idx = 0;
    let arrTopVal = [];


    function pageAni(topVal){
        $('html, body').stop().animate({scrollTop:topVal});
    }



    $(window).on('load resize', function(){

        $("#visual").height($(window).height());

        $introWelc.animate({ top: 50, opacity: 1 }, 1100);
        $introCont.animate({ top: 345, opacity: 1 }, 800);
        $introName.animate({ bottom: 100, opacity: 1 }, 800);
        $introTit.animate({ bottom: 30, opacity: 1 }, 1100);

        // 반복문을 이용한 처리
        for(let i=0;i<$mnu.size();i++){
            arrTopVal[i] = $("#visual~section").eq(i).offset().top;
        }
        
    });
    
    // console.log(arrTopVal); // [508, 1208, 2108, 2808, 3708]

    $mnu.on('click', function(evt){
        //이번에 클릭한 요소의 index번호
        idx = $mnu.index(this);//0~5
        pageAni(arrTopVal[idx]-headerH+1);//fixed한 헤더의 높이값
        evt.preventDefault();
    });


    $(window).on('scroll', function(){

        let scrollTop = $(this).scrollTop();


        //오른쪽 하단 top 화살표
        if(scrollTop>150){
            //$aside.css({display:"block"});
            //$aside.show();
            $aside.fadeIn();
        }else{
            //$aside.css({display:"none"});
            //$aside.hide();
            $aside.fadeOut();
        }

        //헤더고정
        if(scrollTop>$(this).height()){
            $header.addClass('h-fixed');
            $aboutme.css({marginTop:headerH})
        }else{
            $header.removeClass('h-fixed');
            $aboutme.css({marginTop:0})
        }

        //메뉴 활성화 표시
        for(let i=0;i<$mnu.size();i++){
            if(scrollTop>=arrTopVal[i]-headerH-200){
                $mnu.eq(i).parent().addClass('on');
                $mnu.eq(i).parent().siblings().removeClass('on');
            }else if(scrollTop<arrTopVal[0]-headerH-200){
                $mnu.parent().removeClass('on');
            }
        }

    });

    //로고에 대한 클릭이벤트 구문
    $(".logo>a, aside").on('click', function(evt){
        evt.preventDefault();
        pageAni(0);
    });


    $(window).on('load', function(){
        pageAni(0);
    });

});

//portfolio
$(function(){

    //페이드 슬라이드
    const $shadow = $('#portfolio > .slides > .shadow');
    const $procEvt = $shadow.children('img');
    const $btnProcLine = $('#portfolio .slides-container>.line>figcaption>.btn>.proc');
    const $btnProcNam = $('#portfolio .slides-container>.namyang>figcaption>.btn>.proc');
    const $btnProcLee = $('#portfolio .slides-container>.lee>figcaption>.btn>.proc');
    const $btnProcDokdo = $('#portfolio .slides-container>.dokdo>figcaption>.btn>.proc');

    let imgIdx = ['./images/portfolio/LINE-작업과정-디자인.png', './images/portfolio/남양아이-작업과정-디자인.png', './images/portfolio/LEE-작업과정-디자인.png', './images/portfolio/dokdo-작업과정-디자인.png'];

    $btnProcLine.on('click', function (evt) {
        evt.preventDefault();

        $procEvt.css({
            width: 600,
            marginLeft: -300
        });

        $shadow.fadeIn(200);
        $procEvt.attr('src', imgIdx[0]);
    });

    $btnProcNam.on('click', function (evt) {
        evt.preventDefault();

        $procEvt.css({
            width: 600,
            marginLeft: -300
        });

        $shadow.fadeIn(200);
        $procEvt.attr('src', imgIdx[1]);
    });

    $btnProcLee.on('click', function (evt) {
        evt.preventDefault();

        $procEvt.css({
            width: 600,
            marginLeft: -300
        });

        $shadow.fadeIn(200);
        $procEvt.attr('src', imgIdx[2]);
    });

    $btnProcDokdo.on('click', function (evt) {
        evt.preventDefault();

        $procEvt.css({
            width: 1200,
            marginLeft: -600
        });

        $shadow.fadeIn(200);
        $procEvt.attr('src', imgIdx[3]);
    });

    $shadow.on('click', function (evt) {
        evt.preventDefault();

        $shadow.fadeOut(200);
    });

    $procEvt.on('click', function (evt) {
        evt.stopPropagation();
    });

    $(document).on('keyup', function (evt) {
        if(evt.which == '27'){
            $shadow.fadeOut(200);
        }
    });

	//inview 이벤트는 화면이 요소가 출현했을 때 작동
	$(".skill").on("inview", function(evt, visible){
		if(visible==true){	

			for(var i=0;i<=5;i++){
				var $that = $(".skill .bar").eq(i);
				$that.css({
					"width" : $that.parent().attr("data-bar")+"%"
				});
			}
		}
	});
	
	
	$(window).on("scroll", function(){
		if($(this).scrollTop() < $(".skill").offset().top-$(this).height()){
			$(".skill .bar").width(0);
		}
	});
});

// function
$(function () {
    
    // js-function-1
    const $btnPrev = $('#function > .js-func > .func > li:nth-child(1) > .item > .slides > .button > .prev');
    const $btnNext = $('#function > .js-func > .func > li:nth-child(1) > .item > .slides > .button > .next');
    const $btnPlay = $('#function > .js-func > .func > li:nth-child(1) > .item > .slides > .button > .play');
    const $btnPause = $('#function > .js-func > .func > li:nth-child(1) > .item > .slides > .button > .pause');
    const $frame = $('#function > .js-func > .func > li:nth-child(1) > .item > .slides > .slides-container > li');
    const $pagination = $('#function > .js-func > .func > li:nth-child(1) > .item > .slides > .slides-pagination > li > a');

    let intervalID = '';
    let nowIdx = 0;
    let oldIdx = nowIdx;

    function fadeFn() {
        $frame.eq(oldIdx).stop().fadeOut(1500);
        $frame.eq(nowIdx).stop().fadeIn(1500);
        
        $pagination.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    };

    function autoPlay() {
        intervalID = setInterval(function () {
            oldIdx = nowIdx;

            if(nowIdx < 3){
                nowIdx++;
            }else{
                nowIdx = 0;
            }

            fadeFn();
        }, 2600);

        $btnPlay.addClass('on1');
    };

    $pagination.on('click', function (evt) {
        evt.preventDefault();

        oldIdx = nowIdx;
        nowIdx = $pagination.index(this);

        fadeFn();
    });

    $btnPrev.on('click', function (evt) {
        evt.preventDefault();

        oldIdx = nowIdx;

        if(nowIdx > 0){
            nowIdx--;
        }else{
            nowIdx = 3;
        }

        fadeFn();
    });

    $btnNext.on('click', function (evt) {
        evt.preventDefault();

        oldIdx = nowIdx;

        if(nowIdx < 3){
            nowIdx++;
        }else{
            nowIdx = 0;
        }

        fadeFn();
    });

    $btnPlay.on('click', function (evt) {
        evt.preventDefault();

        autoPlay();

        $btnPlay.addClass('on1');
        $btnPause.removeClass('on2');
    });
    
    $btnPause.on('click', function (evt) {
        evt.preventDefault();

        clearInterval(intervalID);

        $btnPlay.removeClass('on1');
        $btnPause.addClass('on2');
    });

    autoPlay();

    // js-function-2
    const $runImg = $('#function > .js-func > .func > li:nth-child(2) > .item > .frame > img');

    let intervalID2 = '';
    let imgIdx = 1;

    intervalID2 = setInterval(function () {

        if(imgIdx < 10){
            imgIdx++;
        }else{
            imgIdx = 1;
        }

        $runImg.attr('src', './images/sprite/run_' + imgIdx + '.gif');

    }, 80);
});