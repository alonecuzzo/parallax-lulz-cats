var init = function() {	
	var $window = $(window);
	var windowHeight = $window.height();

	//letters for lolcats
	var $lolcats_text_1 = $('#lolcats_text_1'),
	    $lolcats_text_2 = $('#lolcats_text_2'),
	    $lolcats_text_3 = $('#lolcats_text_3'),
	    $lolcats_text_4 = $('#lolcats_text_4'),
	    speedDeltaLowerBound = -0.008,
	    speedDeltaUpperBound = -0.003,
	    // to adjust height of intro text, and point of disappearing,
	    // play with the text speed, the adjuster, and the containing 
	    // div class and id heights!!!!
	    base_lolcats_text_speed = 0.1,
	    lolcats_text_adjuster = 1000,
	    round_to = 10000;
	    
	    console.log('adjuster: ' + lolcats_text_adjuster);

	
	var speedDelta1 = getRandomArbitrary(speedDeltaLowerBound, speedDeltaUpperBound);	
	var speedDelta2 = getRandomArbitrary(speedDeltaLowerBound, speedDeltaUpperBound);	
	var speedDelta3 = getRandomArbitrary(speedDeltaLowerBound, speedDeltaUpperBound);	
	var speedDelta4 = getRandomArbitrary(speedDeltaLowerBound, speedDeltaUpperBound);	

	//round deltas
	speedDelta1 = Math.round(round_to*speedDelta1) / round_to;
	speedDelta2 = Math.round(round_to*speedDelta2) / round_to;
	speedDelta3 = Math.round(round_to*speedDelta3) / round_to;
	speedDelta4 = Math.round(round_to*speedDelta4) / round_to;

	console.log('speed delta 1: ' + speedDelta1);
	console.log('speed delta 2: ' + speedDelta2);
	console.log('speed delta 3: ' + speedDelta3);
	console.log('speed delta 4: ' + speedDelta4);
	
	var $lolcats_text_holder = $('#lolcats_text_holder'),
	    $lolcats_text = $('.lolcats_text'),
	    lolcats_text_window_height_ratio = windowHeight / $lolcats_text.height();


	//add inview class to stuff that's in the viewport
	$('#lolcats_text_holder').bind('inview', function(event, visible) {
			if(visible == true) {
				$(this).addClass("inview");
			} else {
				$(this).removeClass("inview");
			}
			// console.log("text holder is: " + visible);

	});
	
	//move the div to its new position
	function newPosition(x, windowHeight, pos, adjuster, inertia) {
		var returnValue = x + "% " + (-((windowHeight + pos) - adjuster) * inertia) + "px";
		// console.log('return value: ' + returnValue);
		// console.log('inertia: ' + inertia);
		return returnValue;
	}
	
	//called whenever window is scrolled
	function move(){
		// var windowHeight = $window.height();
		var pos = $window.scrollTop();
		console.log('text adjuster: ' + lolcats_text_adjuster);
		// console.log('scroll top is: ' + pos);
		//lolcats intro text
		if($lolcats_text_holder.hasClass("inview")) {
			// console.log("should be calling newPosition");
			$lolcats_text_1.css({'backgroundPosition' : newPosition(50, windowHeight, pos, lolcats_text_adjuster, (base_lolcats_text_speed + (pos * speedDelta1)))});
			$lolcats_text_2.css({'backgroundPosition' : newPosition(50, windowHeight, pos, lolcats_text_adjuster, (base_lolcats_text_speed + (pos * speedDelta2)))});
			$lolcats_text_3.css({'backgroundPosition' : newPosition(50, windowHeight, pos, lolcats_text_adjuster, (base_lolcats_text_speed + (pos * speedDelta3)))});
			$lolcats_text_4.css({'backgroundPosition' : newPosition(50, windowHeight, pos, lolcats_text_adjuster, (base_lolcats_text_speed + (pos * speedDelta4)))});
		}
	}

	/**
	 * Returns a random number between min and max
	 */
	function getRandomArbitrary (min, max) {
    		return Math.random() * (max - min) + min;
	}

	function repositionVerticalElements(){
		//need to reposition bottom break to always be x number of pixels shorter than the window height
		var windowHeight = $(window).height();
		var lolcats_text_window_height_ratio = (windowHeight / $('.lolcats_text').height());
		var lolcats_text_height = $lolcats_text.height();
		var new_lolcats_text_height =  ((windowHeight + 200) / lolcats_text_window_height_ratio) * lolcats_text_window_height_ratio;
		$lolcats_text.height(new_lolcats_text_height);
		// $lolcats_text.css({'backgroundColor' : 'red'});
		console.log('new_lolcats_text_height: ' + new_lolcats_text_height);
		console.log('window height inside vert: ' + windowHeight);
		console.log('lolcats ratio: ' + lolcats_text_window_height_ratio);
		var new_lolcats_text_holder_height = $lolcats_text.height() + (lolcats_text_window_height_ratio * 200);
		lolcats_text_adjuster = $lolcats_text.height() - (lolcats_text_window_height_ratio * 85);

		$lolcats_text_holder.css({'height' : new_lolcats_text_holder_height + 'px'});
		console.log('window height: ' + windowHeight);
		console.log('');
	}

				
	$window.resize(function(){
		repositionVerticalElements();
		move();
	});

	$window.bind('scroll', function(){
		move();
	});
};

$(document).ready(function() {
	
	var lockScrollTop = function() {
		$(window).scrollTop(0);
	};
	
	// force window not to scroll
	$(window).bind('scroll', lockScrollTop);	

	$('#lolcats_text_holder').fadeIn(3000, function(){
		$(window).unbind('scroll', lockScrollTop);
		init();
	});
});
