var navTabsId = "#selection2,#selection4";
var pageSwitchLoaded = false;
var manualScroll = false;
var responsiveHeight = 500;
var responsiveWidth = 900;
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
                manualScroll = true;
            }else{
                manualScroll = false;
                return true;
            }
        } else {
            //scroll up
            if(activeTabIndex > 0){
                $('.nav-tabs > li').eq(activeTabIndex - 1).find('a').tab('show');
                manualScroll = true;
            }else{
                manualScroll = false;
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
        responsiveWidth : responsiveWidth,
        responsiveHeight : responsiveHeight,
        onLeave : function( index, nextIndex, direction){
            console.log("index, nextIndex, direction",index, nextIndex, direction)
            //Logic for floating button
            if(nextIndex === totalSections){
                $("#floating-icon").addClass('fa-chevron-up').removeClass('fa-chevron-down')
            }else if(nextIndex < totalSections){
                if(!$("#floating-icon").hasClass('fa-chevron-down')){
                    $("#floating-icon").addClass('fa-chevron-down').removeClass('fa-chevron-up')
                }
            }
            //Logic for header class
            if(nextIndex === 1){
                if($("header").hasClass('headerActive')){
                    $("header").removeClass('headerActive')
                }
            }else{
                if(!$("header").hasClass('headerActive')){
                    $("header").addClass('headerActive')
                }
            }
            if(manualScroll){
                return false;
            }
        }
    })
    enableNavScrolling()
    $('.floating-button').on('click',function () {
        if($("#floating-icon").hasClass('fa-chevron-down')){
            $('.selections').fullpage.moveSectionDown()
        }
        if($("#floating-icon").hasClass('fa-chevron-up')){
            $('.selections').fullpage.moveTo(1)
        }
    })
    $('[data-toggle="tooltip"]').tooltip();
    if ($(window).width() < responsiveWidth || $(window).height() < responsiveHeight){
        $('.floating-button').hide();
    }
    $(window).resize(function() {
        if ($(window).width() < responsiveWidth || $(window).height() < responsiveHeight){
            $('.floating-button').hide();
        }else{
            $('.floating-button').show();
        }
    });
});

$(".nav-toggle-icon").click(function(){
    $(".nav-dropdown-menu").toggleClass("drop-down-default");
});
