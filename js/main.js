var slidesIntervalTime = 5000;
var slidesInterval;

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
    $("#typed").typed({
		stringsElement : $('#typed-strings'),
        typeSpeed: 30,
        backDelay: 500,
        loop: false,
        contentType: 'html',
        loopCount: false
    });
	

    //Moving slides effect
    $('a').click(function(event){
	    if(event.hasOwnProperty('originalEvent')){
            clearInterval(slidesInterval)
        }
        //resetslidesInterval();
        var targetId = $(this).data('target-id');
        $('.slides-heads').find('.active-slide-head').removeClass('active-slide-head')
        $(event.target).closest('.slide-head').addClass('active-slide-head');
        $('.slides-contents').find('.active-slide-content').removeClass('active-slide-content');
        $(targetId).addClass('active-slide-content')
    })
    slidesInterval = setInterval(changeslideAuto,slidesIntervalTime)
});