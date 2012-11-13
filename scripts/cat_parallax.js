var lolcat_site = (function() {
  var settings = {},
      defaults = {
	      startAt: 0,
	      sectionCheckInterval: 3000
      },
      imageSequences = {},
      scrollAnimate,
      currentSection,
      yt = false,
      loadProgress;

  var page, wHeight, wWidth, wCenter;

  function getPageInfo() {
     page = scrollAnimate.getPageInfo();
     wHeight = page.wHeight;
     wWidth = page.wWidth;
     wCenter = page.wCenter;
  }

  var animationSections = {
     'intro': 0
  }


	var animationFunctions = {
		videoPause: function( progress , is, startFrameRatio, endFrameRatio) {
			var startFrame = (is.imageCount/is.skipImages) * startFrameRatio, 
				endFrame = (is.imageCount/is.skipImages) * endFrameRatio,
				//toFrame = Math.floor(progress*endFrame);
				toFrame = Math.floor( startFrame - (progress*(startFrame-endFrame)) );

			is.showImageAt( Math.floor(toFrame) );
		},
		
		absPosition: function(opts) {
			var defaults = {startLeft: 0,
							startTop: 0,
							endLeft: 0,
							endTop: 0},
			settings = $.extend(defaults, opts);
			this.startProperties['left'] = settings.startLeft;
			this.startProperties['top'] = settings.startTop;
			this.endProperties['left'] = settings.endLeft;
			this.endProperties['top'] = settings.endTop;
			this.startProperties['display'] = 'block';
			this.endProperties['display'] = 'none';
		},
			
		bottomLeftOutside: function( anim, opts ) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			getPageInfo();
			var portrait = false, //wHeight > wWidth ? true : false,
				elemHalfWidth = anim._elem.width()/2,
				elemHalfHeight = anim._elem.height()/2,
				adj = portrait ? wWidth/2 + elemHalfWidth : adj = wHeight/2 + elemHalfHeight,
				tan = Math.sqrt( Math.pow( adj, 2) + Math.pow( adj, 2) );
			
			this.properties['top'] = wCenter.top + adj - elemHalfHeight + (portrait ? settings.offset : 0);
			this.properties['left'] = wCenter.left - adj - elemHalfWidth + (portrait ? 0 : settings.offset);
		},
		topRightOutside: function( anim, opts ) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			var portrait = false, //wHeight > wWidth ? true : false,
				elemHalfWidth = anim._elem.width()/2,
				elemHalfHeight = anim._elem.height()/2,
				adj = portrait ? wWidth/2 + elemHalfWidth : adj = wHeight/2 + elemHalfHeight,
				tan = Math.sqrt( Math.pow( adj, 2) + Math.pow( adj, 2) );

			this.properties['top'] = wCenter.top - adj - elemHalfHeight + (portrait ? settings.offset : 0);
			this.properties['left'] = wCenter.left + adj - elemHalfWidth + (portrait ? 0 : settings.offset);
		},
		leftOutside: function( anim, opts ) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['left'] = -anim._elem.width() + settings.offset;
		},
		rightOutside: function( anim, opts ) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['left'] = wWidth + settings.offset;
		},
		centerV: function( anim, opts ) {
			getPageInfo();
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			var elemHalfHeight = anim._elem.height()/2;
			this.properties['top'] = wCenter.top - elemHalfHeight + settings.offset;
		},
		centerH: function( anim, opts ) {
			getPageInfo();
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			
			var elemHalfWidth = anim._elem.width()/2;
			
			this.properties['left'] = wCenter.left - elemHalfWidth + settings.offset;	
		},
		bottomOutside: function( anim, opts ) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['top'] = wHeight + settings.offset;
		},
		topOutside: function( anim, opts) {
			var defaults = {offset:0}, settings = $.extend(defaults, opts);
			this.properties['top'] = -anim._elem.height() + settings.offset;
		}
	}


  var animation = [
      // -------------------------------
      // INTRO
      { 
	      id: 'main',
	      startAt: 0,
	      endAt: 360,
	      onStartAnimate: function(anim) {
		      $(this._elem).css({
			      'opacity': '1',
		      	      'display': 'block'
		      });
	      }
      },
      {
	      id: 'lolcats-1',
	      startsAt: 0,
	      endAt: 250,
	      keyframes: [
	         {
			 position: 0,
			 ease: TWEEN.Easing.Linear.EaseNone,
			 onInit: function(anim) {
				 animationFunctions.centerH.call(this, anim, {});
				 animationFunctions.centerV.call(this, anim, {});
			},
			properties: {}
		 },
	         {
			 position: 1,
			 ease: TWEEN.Easing.Linear.EaseNone,
			 onInit: function(anim) {
				 animationFunctions.centerH.call(this, anim, {});
				 animationFunctions.topOutside.call(this, anim, {});
		 },
	         properties: {}
		 }
	      ]
      },
      {
	      id: 'lolcats-2',
	      startsAt: 0,
	      endAt: 350,
	      keyframes: [
	         {
			 position: 0,
			 ease: TWEEN.Easing.Linear.EaseNone,
			 onInit: function(anim) {
				 animationFunctions.centerH.call(this, anim, {});
				 animationFunctions.centerV.call(this, anim, {});
			},
			properties: {}
		 },
	         {
			 position: 1,
			 ease: TWEEN.Easing.Linear.EaseNone,
			 onInit: function(anim) {
				 animationFunctions.centerH.call(this, anim, {});
				 animationFunctions.centerH.call(this, anim, {});
		 },
	         properties: {}
		 }
	      ]
      }
   ];
   
   var init = function() {
	   scrollAnimate = ScrollAnimator();
	   scrollAnimate.init({
		   animation: animation,
		   maxScroll: 5400,
		   useRAF: false,
		   tickSpeed: 50,
		   scrollSpeed: .3,
		   startAt: settings.startAt,
		   container: $('main'),
		   
		   onStart: function() {
			   alert('starting');
		   },
		   onResize: function() {
		   
		   },
		   onUpdate: function() {

		   }
	   });
   };
   
   return {
	   init: init
   }

})();

$(document).ready(function(){
  lolcat_site.init();
});

