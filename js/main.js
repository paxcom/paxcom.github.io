var slidesIntervalTime = 5000;
var slidesInterval;
var overviewScrolling = false;
var changeslideAuto = function(){
    var slidesCount = $('.slides-heads').children().length
    var activeHeadIndex = $('.slides-heads').find('.active-slide-head').index();
    activeHeadIndex++;
    if(activeHeadIndex >= slidesCount){
        activeHeadIndex = 0;
    }
    $('.slides-heads .slide-head').eq(activeHeadIndex).find('a').click();
}

var resetslidesInterval = function(){
    clearInterval(slidesInterval);
    slidesInterval = setInterval(changeslideAuto,slidesIntervalTime)
}

$(function(){
    //Typing effect
    var $scrollElements = $('.scroll-section');
    $scrollElements.first().addClass('scroll-active');
    scrollToTop();
    $("#typed-pim").typed({
		stringsElement : $('#typed-strings'),
        typeSpeed: 30,
        backDelay: 500,
        loop: true,
        contentType: 'html',
        loopCount: false
    });
    
    
    $("#typed-insights").typed({
		stringsElement : $('#typed-strings'),
        typeSpeed: 30,
        backDelay: 500,
        loop: false,
        contentType: 'html',
        loopCount: false
    });

    wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100
      }
    );
    wow.init();


    //Moving slides effect
    $('a').click(function(event){
        if($(this).hasClass('slide-btn')){
            if(event.hasOwnProperty('originalEvent')){
                clearInterval(slidesInterval)
            }
            //resetslidesInterval();
            var targetId = $(this).data('target-id');
            $('.slides-heads').find('.active-slide-head').removeClass('active-slide-head')
            $(event.target).closest('.slide-head').addClass('active-slide-head');
            $('.slides-contents').find('.active-slide-content').removeClass('active-slide-content');
            $(targetId).addClass('active-slide-content')
        }
    })
    slidesInterval = setInterval(changeslideAuto,slidesIntervalTime)
    
    $('#skuButton').on('click',function(){
		var iframe = $("#priceCompareFrame");
        if(iframe.attr("src") !== iframe.data("src")){
            iframe.attr("src", iframe.data("src"));    
        }
	});
    $(window).bind('DOMMouseScroll mousewheel',function (event) {
        console.log(event.originalEvent.detail,event.originalEvent.wheelDelta)
        if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
            //down
            return onScroll('down');
        }else{
            //up
            return onScroll('up');
        }
    })
    $(document).keydown(function ( event ) {
        if(event.which === 40){
            //down
            return onScroll('down');
        } else if(event.which === 38){
            //up
            return onScroll('up');
        }
        return true;
    });
    
    
    var onScroll = function (side) {
        if(window.animating){
            return false;
        }
        // resetslidesInterval();
        var currentElement = $scrollElements.filter('.scroll-active');
        var currentElementIndex = $scrollElements.index(currentElement);
        var nextElementIndex = currentElementIndex;
        var nextElement;
        if(side === 'down'){
            if(currentElementIndex + 1 !== $scrollElements.length){
                nextElementIndex = currentElementIndex + 1;
            }
        }else if(side === 'up'){
            if(currentElementIndex !== 0){
                nextElementIndex = currentElementIndex - 1;
            }
        }
        if(currentElementIndex !== nextElementIndex){
            currentElement = $scrollElements.eq(currentElementIndex);
            if(currentElement.hasClass('scroll-multiple')){
                if(multipleScrolling(side)){
                    return false;
                }
            }
            nextElement = $scrollElements.eq(nextElementIndex);
            currentElement.removeClass('scroll-active');
            nextElement.addClass('scroll-active');
            scrollToElement(nextElement);
        }
        return false;
    }

	
	$(".page-scroll").click(function(event){
		$(".navbar-ex1-collapse").removeClass("in");
        var targetId = $(event.target).attr('href')
        var currentElement = $scrollElements.filter('.scroll-active');
        var currentElementIndex = $scrollElements.index(currentElement);
        var targetElement = $scrollElements.filter(targetId);
        var targetElementIndex = $scrollElements.index(targetElement);
        if(targetElementIndex !== -1 && currentElementIndex!==targetElementIndex){
            console.log('manuall scroll click')
            currentElement.removeClass('scroll-active');
            targetElement.addClass('scroll-active');

        }
        scrollToElement(targetElement);
        event.preventDefault();
	});

});

var scrollToTop = function () {
    window.animating = true;
    $('html, body').animate({scrollTop : 0},1500,'easeInOutExpo',function () {
        window.animating = false;
    });
}

var scrollToElement = function (element) {
    if(typeof(element) !== 'object'){
        element = $(element);
    }
    window.animating = true;
    var navigationBar = $('#navigation-bar');
    var offset = navigationBar.hasClass('navbar-fixed-top') ? 0 : navigationBar.height();
    $('html, body').animate({
        scrollTop: element.offset().top - offset
    }, 1500,'easeInOutExpo',function () {
        window.animating = false;
    });
}

var multipleScrolling = function ( side ) {
    if(window.animating || overviewScrolling){
        return true
    }
    overviewScrolling = true;
    setTimeout(function() {
        overviewScrolling = false;
    }, 750);
    var slidesCount = $('.slides-heads').children().length
    var activeHeadIndex = $('.slides-heads').find('.active-slide-head').index();
    if( side === 'down' ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
        //scroll down
            activeHeadIndex++;
            if(activeHeadIndex >= slidesCount){
                return false;
            }
            $('.slides-heads .slide-head').eq(activeHeadIndex).find('a').click();
            resetslidesInterval();
            //prevent page fom scrolling
            return true;
    } else if(side === 'up') {
        activeHeadIndex--;
        if(activeHeadIndex < 0){
            //scroll to top
            return false;
        }
        $('.slides-heads .slide-head').eq(activeHeadIndex).find('a').click();
        resetslidesInterval();
        return true;
    }
}
