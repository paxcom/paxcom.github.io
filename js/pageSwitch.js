
(function($){
 
 $('body').width();
    var _prefix=(function(temp){
       var aPrefix=["webkit","Moz","o","ms"],props="";
       for(var i in aPrefix){
          props=aPrefix[i]+"Transition";
          if(temp.style[props]!==undefined){
          	return "-"+aPrefix[i].toLowerCase()+"-";
          }
       }
       return false;
    })(document.createElement(PageSwitch)); 


    var PageSwitch=(function(){
         function PageSwitch(element,options){
         	this.settings=$.extend(true,$.fn.PageSwitch.defaults,options||{});
         	this.element=element;
         	this.init();

         }
       
         PageSwitch.prototype={
         
         	init:function(){
                
                  var me=this;
                
                  me.selectors=me.settings.selectors;
                  me.selections=me.element.find(me.selectors.selections);
                  me.selection=me.selections.find(me.selectors.selection);
                  me.direction=me.settings.direction=="vertical"?true:false;
                  me.pagesCount=me.pagesCount();
               
                  me.index=(me.settings.index>=0&&me.settings.index<me.pagesCount)?me.settings.index:0;

                  me.canScroll=true;


                  if(!me.direction){
                     me._initLayout();
                  }

                  if(me.settings.pagination){
                  	me._initPaging();
                  }

                  me._initEvent();
         	},
         
         	pagesCount:function(){
                  return this.selection.length;

         	},
         
         	switchLenth:function(){
                  return this.direction?this.element.height():this.element.width();
         	},
         
            prev:function(){
               var me=this;
               if(me.index > 0){
               	  me.index--;
               }else if(me.settings.loop){
               	  me.index=me.pagesCount-1;
               }
               me._scrollpage(); 

            },
        
            next:function(){
               var me=this;
               if(me.index < me.pagesCount){
               	  me.index++;
               }else if(me.settings.loop){
               	  me.index=0;
               }
               me._scrollpage(); 
            },
         
         	_initLayout:function(){
                 var me=this;
                 var width=(me.pagesCount*100)+"%",
                     cellWidth=(100/me.pagesCount).toFixed(2)+"%";

                 me.selections.width(width);
                 me.selection.width(cellWidth).css("float","left");

         	},
         
         	_initPaging:function(){
                   var me=this,
                   pagesClass=me.selectors.page.substring(1);

                   me.activeClass=me.selectors.active.substring(1);
                   var pageHtml="<ul class="+ pagesClass+" >";
                   for(var i=0;i<me.pagesCount;i++){
                   	  pageHtml+="<li></li>";
                   } 
                   pageHtml+="</ul>";
                   me.element.append(pageHtml);

                   var pages=me.element.find(me.selectors.page);
                   me.pageItem=pages.find("li");
                   me.pageItem.eq(me.index).addClass(me.activeClass);

                   if(me.direction){
                   	 pages.addClass("vertical");
                   }else{
                   	 pages.addClass("horizontal");
                   }


         	},
           
            _initEvent:function(){
                 var me=this;
                 me.element.on("click",me.selectors.page +" li",function(){
                 	 me.index=$(this).index();
                 	 me._scrollpage();
                 })
                 me.element.on("mousewheel DOMMouseScroll",function(e){

                 	if(me.canScroll){
	                 
	                 	var detal=e.originalEvent.wheelDelta || -e.originalEvent.detail;
	                 
	                 	if(detal>0 && (me.index && !me.settings.loop||me.settings.loop)){
	                        me.prev();
	                 	}else if(detal<0 && (me.index<(me.pagesCount-1) && !me.settings.loop || me.settings.loop)){
	                        me.next();
	                 	}
                 	}
                 });

               
                 if(me.settings.keyboard){
                     $(window).on("keydown",function(e){
                         var keyCode=e.keyCode;
                      
                         if(keyCode==37||keyCode==38){
                              me.prev();
                         }else if(keyCode==39||keyCode==40){
                              me.next();
                         }
                     });
                 }
              
                 $(window).resize(function(){
                      var currentLength=me.switchLenth(),
                          offset=me.settings.direction?me.selection.eq(me.index).offset()
                          .top:me.selection.eq(me.index).offset().left;
                        if(Math.abs(offset)>currentLength/2 && me.index< (me.pagesCount-1)) {
                        	me.index++;
                        }
                        if(me.index){
                        	me._scrollpage();
                        }
                 });
              
                me.selections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend",function(){
                	   me.canScroll=true;
                       if(me.settings.callback && $.type(me.settings.callback) == "function"){
                       
                       	   me.settings.callback();
                       }
                });
            },
         
            _scrollpage:function(){
            	var me=this,
            	    dest=me.selection.eq(me.index).position();
                
           
            	if(!dest){
            		return ;
            	}

            	me.canScroll=false;
            
            	if(_prefix){
            		
                    me.selections.css(_prefix+"transition","all "+me.settings.duration+"ms "+me.settings.easing);
                    var translate=me.direction?"translateY(-"+dest.top+"px)":"translateX(-"+dest.left+"px)";
                    me.selections.css(_prefix+"transform",translate);
            	}else{
            	 
                    var animateCss=me.direction?{top:-dest.top}:{left:-dest.left};
                  
                    me.selections.animate(animateCss,me.settings.duration,"linear",function(){
                    
                    	me.canScroll=true;
                    	if(me.settings.callback && $.type(me.settings.callback) == "function"){
                       
                       	   me.settings.callback();
                       }
                    }); 
            	}
             
            	if(me.settings.pagination){
            		me.pageItem.eq(me.index).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
            	}   
            }
         }
         return PageSwitch;    
    })();

 
   $.fn.PageSwitch=function(options){
   	   
        return this.each(function(){
        	var me=$(this),
        	    instance=me.data("PageSwitch");
        	
        	    if(!instance){
        	    	instance=new PageSwitch(me,options);
        	    	me.data("PageSwitch",instance);
        	    }
        	    if($.type(options)==="string"){
        	    	return instance[options]();
        	    }    
        });
   };
   $.fn.PageSwitch.defaults={
   	selectors:{
   		selections:".selections",
   		selection:".selection",
   		page:".pages",
   		active:".active"
   	},
   	index:0,
  
   	easing:"ease",
 
   	duration:"500",
  
   	loop:false,
 
   	pagination:true,
  
   	keyboard:true,
  
   	direction:"vertical",
   
    callback:""
   };
   
 
   $(function(){
   	$('[data-PageSwitch]').PageSwitch();
   });
   

})(jQuery);
