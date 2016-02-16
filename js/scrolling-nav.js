//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 400) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

 $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll >= 385) {
        $(".navbar-default").removeClass("nav-relative");
		$(".navbar-default").removeClass("nav-relative");
		$(".navbar-default").addClass("navbar-fixed-top");
        } else if (scroll <= 385) {
       $(".navbar-default").removeClass("navbar-fixed-top");
		
        }
    });
	
	




//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
