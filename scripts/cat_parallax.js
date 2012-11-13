

$(document).ready(function() {
	
	var $window = $(window);

	//letters for lolcats
	var $lolcats_text_1 = $('#lolcats_text_1'),
	    $lolcats_text_2 = $('#lolcats_text_2'),
	    $lolcats_text_3 = $('#lolcats_text_3'),
	    $lolcats_text_4 = $('#lolcats_text_4');
	
	//add inview class to stuff that's in the viewport
	$('#lolcats_text_1, #lolcats_text_2, #lolcats_text_3, #lolcats_text_4'), function(event, visible) {
			if(visible == true) {
				$(this).addClass("inview");
			} else {
				$(this).removeClass("inview");
			}

	});
	
	//move the div to its new position
	function newPositon(x, windowHeight, pos, adjuster, inertia) {
		return x + "% " + (-((windowHeight + pos) - adjuster * inertia) + "px";
	}
	
	//called whenever window is scrolled
	function move(){
		var pos = $window.scrollTop();

		//letters for lolcats
		if($lolcats_text_1.hasClass("inview")) {
			$lolcats_text_1.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 900, 0.2)});
		}
		if($lolcats_text_2.hasClass("inview")) {
			$lolcats_text_2.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 900, 0.2)});
		}
		if($lolcats_text_3.hasClass("inview")) {
			$lolcats_text_3.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 900, 0.2)});
		}
		if($lolcats_text_4.hasClass("inview")) {
			$lolcats_text_4.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 900, 0.2)});
		}
	}
				
	$window.resize(function(){
		move();
	});

	$window.bind('scroll', function(){
		move();
	});
});
