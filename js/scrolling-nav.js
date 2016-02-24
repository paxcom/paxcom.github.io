//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 385) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

$(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if (scroll >= 355) {
        $(".navbar-default").removeClass("nav-relative");
        $(".navbar-default").removeClass("nav-relative");
        $(".navbar-default").addClass("navbar-fixed-top");
    } else if (scroll <= 355) {
        $(".navbar-default").removeClass("navbar-fixed-top");
    }
});

window.animating = false;

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
		var navigationBar = $('#navigation-bar');
		var offset = navigationBar.hasClass('navbar-fixed-top') ? 0 : navigationBar.height();
		console.log(offset);
        window.animating = true;
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - offset
        }, 1500, 'easeInOutExpo',function(){
            window.animating = false;
        });
        event.preventDefault();
    });
});