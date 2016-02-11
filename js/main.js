var navTabsId = "#selection2,#selection4";
var pageSwitchLoaded = false;
var enableNavScrolling = function (params) {
    var activeTabIndex = 0;
    var getActiveTabIndex = function(){
        var tabs = $('.nav-tabs > li');
        var activeTab = tabs.filter('.active');
        return tabs.index(activeTab);
    }
    var getTabsCount = function(){
        return $('.nav-tabs > li').length;
    }
    
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        activeTabIndex = getActiveTabIndex();
    })

    $(navTabsId).on('DOMMouseScroll mousewheel', function ( event ) {
        if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
            //scroll down
            if(activeTabIndex < getTabsCount()-1){
                $('.nav-tabs > li').eq(activeTabIndex + 1).find('a').tab('show');
            }else{
                //$('header').css('background-color','white');
                // $('header').attr('class','activeHeader');
                // setTimeout(function(){
                //     $('header').removeClass('activeHeader');
                // },300)
                return true;
            }
        } else {
            //scroll up
            if(activeTabIndex > 0){
                $('.nav-tabs > li').eq(activeTabIndex - 1).find('a').tab('show');
            }else{
                return true;
            }
        }
        //prevent page fom scrolling
        return false;
    });
}
var loadPageSwitch = function(){
    var baseUrl = $('#mainJs').attr('data-baseurl');
    var head = document.getElementsByTagName('head')[0];
    var pageSwitchJs = document.createElement("script");
    pageSwitchJs.type = "text/javascript";
    pageSwitchJs.src = baseUrl + "/js/pageSwitch.js";
    pageSwitchJs.onload = function () {
        pageSwitchLoaded = true;
        console.log('pageswitch loaded')
        $("#container").PageSwitch({
            duration:1000
        });
        enableNavScrolling();
    };
    head.appendChild(pageSwitchJs);
}
$(document).ready(function(){
    var totalSections = $('.selection').length;
    $('.selections').fullpage({
        sectionSelector : '.selection',
        onLeave : function( index, nextIndex, direction){
            if(nextIndex === totalSections){
                $("#floating-icon").addClass('fa-hand-o-up').removeClass('fa-hand-o-down')
            }else if(nextIndex < totalSections){
                if(!$("#floating-icon").hasClass('fa-hand-o-down')){
                    $("#floating-icon").addClass('fa-hand-o-down').removeClass('fa-hand-o-up')
                }
            }
        }
    })
    enableNavScrolling()
    $('.floating-button').on('click',function () {
        if($("#floating-icon").hasClass('fa-hand-o-down')){
            $('.selections').fullpage.moveSectionDown()
        }
        if($("#floating-icon").hasClass('fa-hand-o-up')){
            $('.selections').fullpage.moveTo(1)
        }
    })
    $('body').scroll(function() {
        console.log("$(document).height()-" + $(document).height() + ", $(window).height()-"+"$(window).scrollTop()-"+$(document).height())
        if ($(document).height() <= ($(window).height() + $(window).scrollTop())) {
            //Bottom Reached
            alert('bottom')
        }
    });
    $('[data-toggle="tooltip"]').tooltip();
    // if ($(window).width() > 600){
    //     loadPageSwitch();
    // }
    // $(window).resize(function() {
    //     if(!pageSwitchLoaded && $(window).width() > 600){
    //         pageSwitchLoaded = true;
    //         loadPageSwitch();
    //     }
    // });
});

$(".nav-toggle-icon").click(function(){
    $(".nav-dropdown-menu").toggleClass("drop-down-default");
});
