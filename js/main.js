
    $(function(){

        $("#typed").typed({
            // strings: ["Typed.js is a <strong>jQuery</strong> plugin.", "It <em>types</em> out sentences.", "And then deletes them.", "Try it out!"],
            stringsElement: $('#typed-strings'),
            typeSpeed: 30,
            backDelay: 500,
            loop: false,
            contentType: 'html', // or text
            // defaults to false for infinite loop
            loopCount: false,
            callback: function(){ foo(); },
            resetCallback: function() { newTyped(); }
        });

        $(".reset").click(function(){
            $("#typed").typed('reset');
        });

    });
   var slidesIntervalTime = 3000;
    var slidesInterval;
    var changeslideAuto = function(){
        var slidesCount = $('.slides-heads').children().length
        //var activeHeadIndex = $('.slides-heads').find('.active-slide-head').parents().index();
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
    
    $(document).ready(function(){
        $('a').click(function(event){
            resetslidesInterval();
            var targetId = $(this).data('target-id');
            //$(this).parent().siblings().find('.active-slide-head').removeClass('active-slide-head')
            $('.slides-heads').find('.active-slide-head').removeClass('active-slide-head')
            //$(this).addClass('active-slide-head');
           $(event.target).closest('.slide-head').addClass('active-slide-head');
            //console.log('clicked ',targetId);
            $('.slides-contents').find('.active-slide-content').removeClass('active-slide-content');
            $(targetId).addClass('active-slide-content')
        })
        slidesInterval = setInterval(changeslideAuto,2000)
    })

    function newTyped(){ /* A new typed object */ }

    function foo(){ console.log("Callback"); }

