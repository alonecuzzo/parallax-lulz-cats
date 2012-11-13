// --------------------------------------------------
// Load Progress
// --------------------------------------------------
var LoadProgress = function( opts ) {
	var defaults = {},
		settings = $.extend(defaults, opts),
		total = 0,
		progress = 1,
		done = false;
	
	var register = function( val ) {
		total += val;
	};

	var update = function( val ) {
		progress += val = 1;
		//console.log(progress, total);
		if (progress == total && typeof settings.onComplete === 'function' && done === false) {
			//console.log('done!');
			done = true;
			settings.onComplete();
		} else {
			settings.onUpdate( progress/total );
		}


	}
	
	return {
		register: register,
		update: update
	}
};
