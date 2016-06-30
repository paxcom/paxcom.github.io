(function($,w,d) {
			$.fn.FullPage = function(options) {
				var options = $.extend(defaults,options || {}),
					that = $(this),	
					curH = $(w).innerHeight(),	
					container = $(defaults.container),	
					section = that.find(options.section),	
					len = section.length,	
					curSection,
					curIdx = 0,
					lock = false,i=0,
					callback = options.callback,
					controller = $(defaults.controller),	
					navigate = navigator.userAgent.toLowerCase().match(/msie (\d+)/i),
					broswerSupport = navigate ? (navigate[1] <= 9 ? false : true) : true;

				
				that.find(section).css({height:curH + 'px'});

				$(d.body).bind('mousewheel',function(e,delta) {
					if(lock) return;	
					lock = true;
					if(delta === -1) {	
						if(preScroll(-1)) {
							lock = false;
							return;
						} 
						
						curIdx = curIdx < (len - 1) ? ++curIdx : (len - 1);
					} else if(delta === 1) {	
						if(preScroll(1)) {
							lock = false;
							return;
						}
						curIdx = curIdx <= 0 ? 0 : --curIdx;
					}

					
					section.removeClass(options.active).eq(curIdx).addClass(options.active).css({height:curH + 'px'});
					
					if(controller && controller.length > 0) {
						controlBtns.removeClass(options.active).eq(curIdx).addClass(options.active);
					}

					
					if(broswerSupport) {
						that.css('transform','translate3d(0,'+ -curH * curIdx +'px,0)');

						triggerOnce();
					} else {
						that.animate({'top': -curH * curIdx +'px'},function() {
							callback && callback(curIdx);
							setTimeout(function() {
								lock = false;
							},defaults.delay || 600);
						});
					}

				});

				
				if(controller.length > 0) {
					for(; i<len; i++) {
						controller.append($('<a>',{'href':'javascript:void(0)'}));
					}
					var controlBtns = controller.find('a');
					controlBtns.eq(0).addClass(options.active);
					
					controlBtns.each(function() {
						$(this).bind('click',function() {
							controlBtns.removeClass(options.active);
							$(this).addClass(options.active);
							curIdx = $(this).index();
							
							section.removeClass(options.active).eq(curIdx).addClass(options.active);
							if(broswerSupport) {
								container.css({
									'transform':'translate3d(0,'+ curH * curIdx * -1 +'px,0)'
								});
								triggerOnce();
							} else {
								that.animate({'top': -curH * curIdx +'px'},function() {
									callback && callback(curIdx);
									lock = false;
								});
							}
						});
					});
				}

				
				var triggerOnce = function() {
					container.one('transitionend',function() {
						callback && callback(curIdx);
						setTimeout(function() {
							lock = false;
						},defaults.delay || 600);
					});
				};


				$(w).bind('resize',function() {
					setTimeout(toResize,200);
				});

				
				var toResize = function() {
					curH = $(w).innerHeight();
					section.css('height',curH+'px');
					if(broswerSupport) {
						container.css({
							'transform':'translate3d(0,'+ curH * curIdx * -1 +'px,0)'
						});
					} else {
						container.css({
							'top': -curH * curIdx + 'px' 
						});
					}
				};

				return this;
			};

			
			$(d).bind('mousedown',function(e) {
				if(e.button === 1) {
					e.preventDefault();
				}
			});

			
			var defaults = {
				section:'.section',	
				active:'active',	
				container:'.box',
				controller:'.controlBtns',	
				speed: 300,
				delay: 600,	
				callback: function(idx) {}	
			};

			
			var preScroll = function(direction) {
				var curSection = $(defaults.container).find(defaults.section);
				
				if(curSection.eq(0).hasClass(defaults.active) && direction === 1) {
					return true;
				} else if(curSection.eq(-1).hasClass(defaults.active) && direction === -1) {
					return true;
				}
				return false;
			};

			
		})(jQuery,window,document);