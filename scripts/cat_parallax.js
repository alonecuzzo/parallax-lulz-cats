

$(document).ready(function() {
	
	var $window = $(window);

	//letters for lolcats
	var $lolcats_text_1 = $('#lolcats_text_1'),
	    $lolcats_text_2 = $('#lolcats_text_2'),
	    $lolcats_text_3 = $('#lolcats_text_3'),
	    $lolcats_text_4 = $('#lolcats_text_4');
	
	var $lolcats_text_holder = $('#lolcats_text_holder');
	
	var windowHeight = $window.height();

	//add inview class to stuff that's in the viewport
	$('#lolcats_text_holder').bind('inview', function(event, visible) {
			if(visible == true) {
				$(this).addClass("inview");
			} else {
				$(this).removeClass("inview");
			}
			console.log("text holder is: " + visible);

	});
	
	//move the div to its new position
	function newPosition(x, windowHeight, pos, adjuster, inertia) {
		var returnValue = x + "% " + (-((windowHeight + pos) - adjuster) * inertia) + "px";
		console.log('return value: ' + returnValue);
		return returnValue;
	}
	
	//called whenever window is scrolled
	function move(){
		var windowHeight = $window.height();
		var pos = $window.scrollTop();
		console.log('scroll top is: ' + pos);
		//lolcats intro text
		if($lolcats_text_holder.hasClass("inview")) {
			console.log("should be calling newPosition");
			$lolcats_text_1.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 500, 0.42)});
			$lolcats_text_2.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 500, 0.38)});
			$lolcats_text_3.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 500, 0.33)});
			$lolcats_text_4.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 500, 0.31)});
		}
	}
				
	$window.resize(function(){
		move();
	});

	$window.bind('scroll', function(){
		move();
	});
});
