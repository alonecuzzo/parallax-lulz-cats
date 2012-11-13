

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
		return x + "% " + (-((windowHeight + pos) - adjuster) * inertia) + "px";
	}
	
	//called whenever window is scrolled
	function move(){
		var pos = $window.scrollTop();
		console.log('move being called!');
		//lolcats intro text
		if($lolcats_text_holder.hasClass("inview")) {
			console.log("should be calling newPosition");
			$lolcats_text_1.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 39, 0.3)});
			$lolcats_text_2.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 9, 0.2)});
			$lolcats_text_3.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 92, 0.1)});
			$lolcats_text_4.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 22, 0.5)});
		}
	}
				
	$window.resize(function(){
		move();
	});

	$window.bind('scroll', function(){
		move();
	});
});
