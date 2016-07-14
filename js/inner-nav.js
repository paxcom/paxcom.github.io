// JavaScript Document
$(window).scroll(function() {
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