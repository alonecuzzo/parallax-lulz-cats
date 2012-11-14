var init = function() {	
	var $window = $(window);
	var windowHeight = $window.height();

	//letters for lolcats
	var $lolcats_text_1 = $('#lolcats_text_1'),
	    $lolcats_text_2 = $('#lolcats_text_2'),
	    $lolcats_text_3 = $('#lolcats_text_3'),
	    $lolcats_text_4 = $('#lolcats_text_4'),
	    speedDeltaLowerBound = 0.004,
	    speedDeltaUpperBound = 0.001,
	    // to adjust height of intro text, and point of disappearing,
	    // play with the text speed, the adjuster, and the containing 
	    // div class and id heights!!!!
	    base_lolcats_text_speed = 0.0;
	    lolcats_text_adjuster = 1000,
	    round_to = 10000;
	    
	    // console.log('adjuster: ' + lolcats_text_adjuster);
		
	var speedDelta1 = getRandomArbitrary(speedDeltaLowerBound, speedDeltaUpperBound);	
	var speedDelta2 = getRandomArbitrary(speedDeltaLowerBound, speedDeltaUpperBound);	
	var speedDelta3 = getRandomArbitrary(speedDeltaLowerBound, speedDeltaUpperBound);	
	var speedDelta4 = getRandomArbitrary(speedDeltaLowerBound, speedDeltaUpperBound);	

	//round deltas
	speedDelta1 = Math.round(round_to*speedDelta1) / round_to;
	speedDelta2 = -Math.round(round_to*speedDelta2) / round_to;
	speedDelta3 = Math.round(round_to*speedDelta3) / round_to;
	speedDelta4 = -Math.round(round_to*speedDelta4) / round_to;
	
	//add inview class to stuff that's in the viewport
	$('#lolcats_text_1, #lolcats_text_2, #lolcats_text_3, #lolcats_text_4').bind('inview', function(event, visible) {
			if(visible == true) {
				$(this).addClass("inview");
			} else {
				$(this).removeClass("inview");
			}
			console.log("text section is: " + visible);

	});
	
	//move the div to its new position
	function newPosition(x, windowHeight, pos, adjuster, inertia, div) {
		var adjuster1 = 400 + (windowHeight);
		adjuster1 = 0;
		// console.log('adjuster position: ' + adjuster1);
		var newY = -((windowHeight - pos) - adjuster1) * inertia;
		newY = Math.abs(newY);
		// console.log('inertia ' + inertia);
		// var returnValue = x + "% " + newY + "px";
		var returnValue = newY + "px";
		// console.log('return value: ' + returnValue);
		return returnValue;
	}
	
	//called whenever window is scrolled
	function move(){
		var windowHeight = $window.height();
		$window.scrollLeft(0);
		var pos = $window.scrollTop();
		 // console.log('scroll top is: ' + pos);
		//lolcats intro text
		 if($('#lolcats_text_1').hasClass("inview")) {
			// console.log("should be calling newPosition");
			$lolcats_text_1.css({'margin-top' : newPosition(50, windowHeight, pos, lolcats_text_adjuster, (base_lolcats_text_speed + (pos * speedDelta1)), $lolcats_text_1)});
		 }
		 if($('#lolcats_text_2').hasClass("inview")) {
			$lolcats_text_2.css({'margin-top' : newPosition(50, windowHeight, pos, lolcats_text_adjuster, (base_lolcats_text_speed + (pos * speedDelta2)), $lolcats_text_2)});
		 }
		 if($('#lolcats_text_3').hasClass("inview")) {
			$lolcats_text_3.css({'margin-top' : newPosition(50, windowHeight, pos, lolcats_text_adjuster, (base_lolcats_text_speed + (pos * speedDelta3)), $lolcats_text_3)});
		 }
		 if($('#lolcats_text_4').hasClass("inview")) {
			$lolcats_text_4.css({'margin-top' : newPosition(50, windowHeight, pos, lolcats_text_adjuster, (base_lolcats_text_speed + (pos * speedDelta4)), $lolcats_text_4)});
		 }
	}

	/**
	 * Returns a random number between min and max
	 */
	function getRandomArbitrary (min, max) {
    		return Math.random() * (max - min) + min;
	}
				
	$window.resize(function(){
		move();
	});

	$window.bind('scroll', function(){
		move();
	});

	move();
};

$(document).ready(function() {
	// here until we figure out how to get height adjustment set
	$(window).scrollTop(0);
	 init();	
	// var lockScrollTop = function() {
	// 	$(window).scrollTop(0);
	// };
	// 
	// // force window not to scroll
	// $(window).bind('scroll', lockScrollTop);	

	// $('.lolcats_text').fadeIn(3000, function(){
	// 	$(window).unbind('scroll', lockScrollTop);
	// 	//init();
	// });
});
