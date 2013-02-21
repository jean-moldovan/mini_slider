/*
 *	mini slider 1.0 - free jQuery image/content slider plugin
 *	
 *	by Eugene Hranik
 *	
 *	requires jQuery library - http://jquery.com
 *
 */

(function( $ ) {

	$.fn.mini_slider = function(options) {

		// default settings
    	var settings = {
			width: 600,
			height: 250,
			arrows: true,
			speed: 600,
			auto: true,
			timer: 5000,
			bullets: true	
		};
		
		var options = $.extend(settings, options),
		
			obj = this,
			$ul = $('.slides', obj),
			$li = $('.slides li', obj),
			first_item = $('.slides li:eq(0)', obj),
			last_item = $('.slides li:last-child', obj),
			length = $li.length,
			width = options.width,
			height = options.height,
			speed = options.speed,
			timer = options.timer,
			i = 0;

		obj.switcher = true;
		obj.width(width);
		obj.height(height);
		obj.css('overflow', 'hidden');
		
		$li.css({'width' : width, 'height' : height});
		$li.first = false;
		$li.last = false;
				
		$ul.prepend(last_item.clone().css('margin-left', -width));
		$ul.append(first_item.clone());

		$ul.css('width', (length + 1)*width);

		// shows arrows
		if(options.arrows) {

			obj.prepend('<a class="prev" href="">prev</a>');
			obj.prepend('<a class="next" href="">next</a>');

			var	prev = $('.prev', obj),
				next = $('.next', obj),
				arrow_height;
			
			// sets arrows position
			arrow_height = prev.innerHeight();
			prev.css('margin-top', -arrow_height/2);
			next.css('margin-top', -arrow_height/2);
			
			// "previous" button handler
			prev.click(function(e) {
				e.preventDefault();
				
				if (obj.switcher) {
					obj.switcher = false;
					i--;
					
					changeSlide(obj, $ul, $li, width, speed, i, length);
					
					if (i < 0) {
						$li.first = true;
						i = length - 1;	
					}
				}
				
			});
			
			// "next" button handler	
			next.click(function (e) {
				e.preventDefault();
				
				if (obj.switcher) {
					obj.switcher = false;
					i++;

					changeSlide(obj, $ul, $li, width, speed, i, length);
					
					if (i > length - 1) {
						$li.last = true;
						i = 0;	
					}
				}				
			
			});

		};
		
		// enables auto rotation
		if(options.auto) {
			
			function rotate() {
				i++;

				changeSlide(obj, $ul, $li, width, speed, i, length);
				
				if (i > length - 1) {
					$li.last = true;
					i = 0;	
				}
			
			};					

			var delay = setInterval(rotate, timer);

			// pauses on hover
			obj.hover(function() {
				delay = clearInterval(delay);
			}, function() {
				delay = setInterval(rotate, timer);
			});		
				
		}
		
		// shows bullets
		if(options.bullets) {
			
			obj.append('<ul class="bullets"></ul>');
			
			var bullets = $('.bullets', obj);
			
			for (var k = 0; k < length; k++) {
				bullets.append('<li><a href="&nbsp;" data-id="' + k + '"></a></li>');	
			}
			
			bullets.css('margin-left', -bullets.innerWidth()/2);
			
			var link = $('li a', bullets);
			
			link.eq(0).addClass('active');
				
			link.click(function(e) {
				
				e.preventDefault();
				
				i = $(this).attr('data-id');
				
				fadeSlide(obj, $ul, width, speed, i);
				
			});
		
		}
		
	};

	// animate
	function changeSlide(o, ul, li, w, s, i, l) {
		
		ul.animate({left: i*w*(-1)}, s, function() {
			
											o.switcher = true;
											
											if (li.first) {
												
												ul.css('left', (l - 1)*w*(-1));
												
												li.first = false;
											
											}
											
											if (li.last) {
																								
												ul.css('left', w*0);
												
												li.last = false;
											}											
											
										});
		
		if (i >= l) {
			
			i = 0;
			
		}
			
		$('.bullets li a', o).removeClass('active');
		$('.bullets li a', o).eq(i).addClass('active');
	
	}
	
	// fadeIn / fadeOut
	function fadeSlide(o, ul, w, s, i) {
		
		ul.fadeOut(s/4, function() {
			
							ul.css('left', i*w*(-1));
							
							o.switcher = true;
							
							$('.bullets li a', o).removeClass('active');
							
						});
							
		ul.fadeIn(s/4, function() {$('.bullets li a', o).eq(i).addClass('active');});
	
	}

})( jQuery );
