

$(document).ready(function() {
	
	var $window = $(window);

	//letters for lolcats
	var $lolcats_first_l = $('#lolcats_first_l'),
	    $lolcats_first_o = $('#lolcats_first_o'),
	    $lolcats_second_l = $'#lolcats_second_l'),
	    $lolcats_first_c = $('#lolcats_first_c'),
	    $lolcats_first_a = $('#lolcats_first_a'),
	    $lolcats_first_t = $('#lolcats_first_t'),
	    $lolcats_first_s = $('#lolcats_first_s');

	//add inview class to stuff that's in the viewport
	$('#lolcats_first_l, #lolcats_first_o, #lolcats_second_l, #lolcats_first_c, #lolcats_first_a, #lolcats_first_t, #lolcats_first_s'), function(event, visible) {
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

		//letters for lolscats
		if($lolscats_first_l.hasClass("inview")) {
			$lolscats_first_l.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 900, 0.2)});
		}
		if($lolscats_first_o.hasClass("inview")) {
			$lolscats_first_o.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 900, 0.2)});
		}
		if($lolscats_second_l.hasClass("inview")) {
			$lolscats_second_l.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 900, 0.2)});
		}
		if($lolscats_first_c.hasClass("inview")) {
			$lolscats_first_c.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 900, 0.2)});
		}
		if($lolscats_first_a.hasClass("inview")) {
			$lolscats_first_a.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 900, 0.2)});
		}
		if($lolscats_first_t.hasClass("inview")) {
			$lolscats_first_t.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 900, 0.2)});
		}
		if($lolscats_first_s.hasClass("inview")) {
			$lolscats_first_s.css({'backgroundPosition' : newPosition(50, windowHeight, pos, 900, 0.2)});
		}
	}
				
	$window.resize(function(){
		move();
	});

	$window.bind('scroll', function(){
		move();
	});
});
