//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
	/*var navOffTop = $(".inner-nav").offset().top;
	console.log(navOffTop);
	*/
    if ($(".inner-nav").offset().top >= 385) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

$(window).scroll(function(){
    var head = $('#headerdata');
    var scroll = $(window).scrollTop();
    //console.log("scroll",scroll);
   // console.log("headheight",head.height());
    if (scroll >= head.height()+125 && !($(".inner-nav").hasClass("navbar-fixed-top"))) {
        $(".inner-nav").removeClass("nav-relative");
        $(".inner-nav").removeClass("nav-relative");
        $(".inner-nav").addClass("navbar-fixed-top");
    } else if (scroll < head.height()+125) {
        $(".inner-nav").removeClass("navbar-fixed-top");
        $($('#myTab li')[0]).addClass("active");

    }
});

window.animating = true;

//jQuery to collapse the navbar on scroll
/*$(window).scroll(function() {
    if ($(".inner-nav").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

*/


    // $("html, body").animate({ scrollTop: 550 }, 1000);

$(function() {
    $('a.page-scroll').bind('click', function(event) {
       // event.preventDefault();
        var $anchor = $(this);
        var navigationBar = $('#navigation-bar');
        var offset = navigationBar.hasClass('navbar-fixed-top') ? 0 : navigationBar.height();
        //console.log("hii",$($anchor.attr('href')).offset().top);
        //console.log("offset",offset);
        $('html, body').animate({
            scrollTop: $($anchor.attr('href')).offset().top - offset
        }, 1500, 'easeInOutExpo');
       // event.preventDefault();
       //event.preventDefault();
    });
});




//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    // $('a.page-scroll').bind('click', function(event) {
        // var $anchor = $(this);
		// var navigationBar = $('#navigation-bar');
		// var offset = navigationBar.hasClass('navbar-fixed-top') ? 0 : navigationBar.height();
		// console.log(offset);
        // window.animating = true;
        // $('html, body').stop().animate({
        //     scrollTop: $($anchor.attr('href')).offset().top - offset
        // }, 1500, 'easeInOutExpo',function(){
        //     window.animating = false;
        // });
        // event.preventDefault();
    // });
});

