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
    $('.selections').fullpage({
        sectionSelector : '.selection',
    });
    enableNavScrolling();
    $('.scrollDown').on('click',function () {
        $('.selections').fullpage.moveSectionDown()
    })
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