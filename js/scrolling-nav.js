//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".inner-nav").offset().top > 310) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

$(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if (scroll >= 310) {
        $(".inner-nav").removeClass("nav-relative");
        $(".inner-nav").removeClass("nav-relative");
        $(".inner-nav").addClass("navbar-fixed-top");
    } else if (scroll <= 310) {
        $(".inner-nav").removeClass("navbar-fixed-top");
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
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
		//$(this).parent(li).addClass("active");
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
		//$(this).parent(li).addClass("active");
        event.preventDefault();
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