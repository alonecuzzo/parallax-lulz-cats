var AJ2012Site = (function() {
	var settings = {},
		defaults = {
			startAt: 0,					// start experience at
			sectionCheckInterval: 3000	// check section interval
		},
		imageSequences = {},
		scrollAnimate,
		currentSection,
		yt = false,						// youtube flag
		loadProgress;
	
	var page, wHeight, wWidth, wCenter;

	// grabs page info from main app
	function getPageInfo() {
		page = scrollAnimate.getPageInfo();
		wHeight = page.wHeight;
		wWidth = page.wWidth;
		wCenter = page.wCenter;	
	}
	

	// ---------------------------------------------
	// SECTIONS
	// ---------------------------------------------
	
	var animationSections = {	
		'intro': 0,
		'over': 200,
		'around': 1600,
		'through': 3500,
		'share': 5000
	};


	// ---------------------------------------------
	// ANIMATION HELPERS
	// ---------------------------------------------
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

	
	

	// ---------------------------------------------
	// ANIMATION DATA
	// ---------------------------------------------
	
	var t = 0;
	var animation = [

					// ---------------------------------------------
					// VIDEO
					
	         		
	         		
	         		

	         	// ---------------------------------------------
	         		// INTRO

	         		{
	         			id: 'intro-text-container',
	         			startAt: 0,
	         			endAt: 360,
	         			onStartAnimate: function( anim ) {
	         				$(this._elem).css({
		         				'opacity': '1',
		         				'display': 'block'
		         			});
	         			}
	         		},
	         		{
	         			id: 'choose-flight-1',
	         			startAt: 0,
	         			endAt: 250,
	         			keyframes: [
	         						{
	         							position: 0,
	         							ease: TWEEN.Easing.Linear.EaseNone,
	         							onInit: function( anim ) {
	         								animationFunctions.centerH.call( this, anim, {});
	         								animationFunctions.centerV.call( this, anim, {});
	         							},
	         							properties: {
	         							}
	         						},
	         						{
	         							position: 1,
	         							ease: TWEEN.Easing.Linear.EaseNone,
	         							onInit: function( anim ) {
	         								animationFunctions.centerH.call( this, anim, {});
	         								animationFunctions.topOutside.call( this, anim, {});
	         							},
	         							properties: {
	         							}
	         						}
	         					]
	         		},
	         		{
	         			id: 'choose-flight-2',
	         			startAt: 0,
	         			endAt: 300,
	         			keyframes: [
	         						{
	         							position: 0,
	         							ease: TWEEN.Easing.Linear.EaseNone,
	         							onInit: function( anim ) {
	         								animationFunctions.centerH.call( this, anim, {});
	         								animationFunctions.centerV.call( this, anim, {});
	         							},
	         							properties: {
	         							}
	         						},
	         						{
	         							position: 1,
	         							ease: TWEEN.Easing.Linear.EaseNone,
	         							onInit: function( anim ) {
	         								animationFunctions.centerH.call( this, anim, {});
	         								animationFunctions.topOutside.call( this, anim, {});
	         							},
	         							properties: {
	         							}
	         						}
	         					]
	         		},
	         		{
	         			id: 'choose-flight-3',
	         			startAt: 0,
	         			endAt: 325,
	         			keyframes: [
	         						{
	         							position: 0,
	         							ease: TWEEN.Easing.Linear.EaseNone,
	         							onInit: function( anim ) {
	         								animationFunctions.centerH.call( this, anim, {});
	         								animationFunctions.centerV.call( this, anim, {});
	         							},
	         							properties: {
	         							}
	         						},
	         						{
	         							position: 1,
	         							ease: TWEEN.Easing.Linear.EaseNone,
	         							onInit: function( anim ) {
	         								animationFunctions.centerH.call( this, anim, {});
	         								animationFunctions.topOutside.call( this, anim, {});
	         							},
	         							properties: {
	         							}
	         						}
	         					]
	         		},
	         		{
	         			id: 'choose-flight-4',
	         			startAt: 0,
	         			endAt: 360,
	         			keyframes: [
	         						{
	         							position: 0,
	         							ease: TWEEN.Easing.Linear.EaseNone,
	         							onInit: function( anim ) {
	         								animationFunctions.centerH.call( this, anim, {});
	         								animationFunctions.centerV.call( this, anim, {});
	         							},
	         							properties: {
	         							}
	         						},
	         						{
	         							position: 1,
	         							ease: TWEEN.Easing.Linear.EaseNone,
	         							onInit: function( anim ) {
	         								animationFunctions.centerH.call( this, anim, {});
	         								animationFunctions.topOutside.call( this, anim, {});
	         							},
	         							properties: {
	         							}
	         						}
	         					]
	         		},
	         		{
	         			id: 'scroll-to-control-1',
	         			startAt: 0,
	         			endAt: 10,
	         			onStartAnimate: function( anim ) {
	         				var delay = '1s';
	         				$(this._elem).css({
		         				'opacity': '1',
		         				'display': 'block',
		         				'transition-delay': delay,
								'-moz-transition-delay': delay,
								'-webkit-transition-delay': delay,
								'-o-transition-delay': delay
		         			});

	         			},
	         			onEndAnimate: function( anim ) {
	         				var delay = '0s';
 							$(this._elem).css({
 								'opacity': '0',
 								'transition-delay': delay,
								'-moz-transition-delay': delay,
								'-webkit-transition-delay': delay,
								'-o-transition-delay': delay
 							});
 						},
	         			keyframes: [
	         						{
	         							position: 0,
	         							ease: TWEEN.Easing.Linear.EaseNone,
	         							onInit: function( anim ) {
	         								animationFunctions.centerH.call( this, anim, {});
	         								animationFunctions.centerV.call( this, anim, {offset:240});
	         							},
	         							properties: {
	         							}
	         						},
	         						{
	         							position: 1,
	         							ease: TWEEN.Easing.Linear.EaseNone,
	         							onInit: function( anim ) {
	         								animationFunctions.centerH.call( this, anim, {});
	         								animationFunctions.centerV.call( this, anim, {offset:240});
	         							},
	         							properties: {
	         							}
	         						}
	         					]
	         		},

	         		
	         		// ---------------------------------------------
	         		// OVER
	         		
	         		{
	         			id: 'over-bg-2',
	         			section: 'over',
	         			startAt: 0+animationSections.over,
	         			endAt: 520+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{ 
	         					position: .3,
	         					ease: TWEEN.Easing.Cubic.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {offset:-1100});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{ 
	         					position: .4,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {offset:-1100});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Cubic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'over-bg-3',
	         			section: 'over',
	         			startAt: 60+animationSections.over,
	         			endAt: 750+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{ 
	         					position: .2,
	         					ease: TWEEN.Easing.Cubic.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {offset:-2499});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{ 
	         					position: .5,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {offset:-2499});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Cubic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'over-bg-4',
	         			section: 'over',
	         			startAt: 500+animationSections.over,
	         			endAt: 1300+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'over-bg-5',
	         			section: 'over',
	         			startAt: 1050+animationSections.over,
	         			endAt: 1350+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'over-bg-6',
	         			section: 'over',
	         			startAt: 1100+animationSections.over,
	         			endAt: 1500+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'jet-container',
	         			startAt: 170+(animationSections.over-=300),
	         			endAt: 1000+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomLeftOutside.call( this, anim, {offset:40});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{ 
	         					position: .5,
	         					ease: TWEEN.Easing.Cubic.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {offset:40});
	         						animationFunctions.centerV.call( this, anim, {offset:0});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Cubic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.topRightOutside.call( this, anim, {offset:40});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		
	         		jetPartAnimation('jet-l-sole', [332, 20], [55, -1040]),
	         		jetPartAnimation('jet-r-sole', [343, 26], [102, -480]),
	         		
	         		
	         		jetPartAnimation('jet-l-intake', [230, 82], [110, -810]),
	        		jetPartAnimation('jet-r-intake', [270, 130], [510, -310]),
	        		
	        		jetPartAnimation('jet-l-shell', [210, 90], [250, -600]),
	        		jetPartAnimation('jet-r-shell', [257,112], [370, -270]),
	        		
	        		
	         		
	         		jetPartAnimation('jet-l-outer', [38, 122], [600, -400]),
	        		jetPartAnimation('jet-r-outer', [205,215], [270, -70]),
	        		
	        		jetPartAnimation('jet-laces', [90, 190], [780, -300]),
	        		
	        		jetPartAnimation('jet-l-sole-bottom', [2, 267], [1050, -250]),
	        		jetPartAnimation('jet-r-sole-bottom', [123,300], [250, -050]),
	         		{
	         			id: 'jet-sole-top',
	         			startAt: 370+animationSections.over,
	         			endAt: 850+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomLeftOutside.call( this, anim, {offset:0});
	         					},
	         					properties: {}
	         					
	         				},
	         				{
	         					position: .4,
	         					ease: TWEEN.Easing.Cubic.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {}
	         				},
	         				{
	         					position: 1,
	         					//ease: TWEEN.Easing.Quadratic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {offset:9});
	         						animationFunctions.centerV.call( this, anim, {offset:-9});
	         					},
	         					properties: {}
	         				}
	         			]
	         		},
	         		{
	         			id: 'over-vid',
	         			startAt: 850+animationSections.over,
	         			endAt: 1680+animationSections.over,
	         			/*
	         			onProgress: function( progress ) {
	         				var is = imageSequences['over'];
							is.showImageAt( Math.floor(is.imageCount / is.skipImages * progress) );
	         			},*/
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{ 
	         					position: .7,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onProgress: function( progress ) {
	         						var is = imageSequences['over'];

	         						var startFrame = 0, 
	         							endFrame = (is.imageCount/is.skipImages) * .7,
	         							toFrame = Math.floor(progress*endFrame);

									is.showImageAt( Math.floor(toFrame) );
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{ 
	         					position: .8,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onProgress: function( progress ) {
	         						var is = imageSequences['over'];

	         						var startFrame = (is.imageCount/is.skipImages) * .7, 
	         							endFrame = is.imageCount/is.skipImages,
	         							toFrame = Math.floor( startFrame - (progress*(startFrame-endFrame)) );

									is.showImageAt( Math.floor(toFrame) );
	         					},
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		
	         		
	         		
	         		{
	         			id: 'over-vid-extra-shoe-1',
	         			startAt: 1140+animationSections.over,
	         			endAt: 1219+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomLeftOutside.call( this, anim, {offset:0});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Quadratic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'over-vid-extra-shoe-2',
	         			startAt: 1450+animationSections.over,
	         			endAt: 1535+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomLeftOutside.call( this, anim, {offset:0});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Quadratic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         				
	         		
	         		{
	         			id: 'over-vid-end-frame',
	         			startAt: 1679+animationSections.over,
	         			endAt: 1850+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Quadratic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.topRightOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'over-title-label',
	         			startAt: 200+animationSections.over,
	         			endAt: 800+animationSections.over,
	         			keyframes: [
	         						{ 
	         							position: 0,
	         							onInit: function( anim ) {
	         								animationFunctions.bottomLeftOutside.call( this, anim, {offset:-500});
	         							},
	         							properties: {
	         								top: 0, left: 0
	         							}
	         							
	         						},
	         						{
	         							position: 1,
	         							ease: TWEEN.Easing.Linear.EaseNone,
	         							onInit: function( anim ) {
	         								animationFunctions.topRightOutside.call( this, anim, {offset:-500});
	         							},
	         							properties: {
	         								top: 0, left: 0
	         							}
	         						}
	         					]
	         		},
	         		{
	         			id: 'over-midsole-detail-group-back',
	         			startAt:  750+animationSections.over,
	         			endAt: 1350+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
								animationFunctions.bottomLeftOutside.call( this, anim, {offset:-100});
	         					},
	         					properties: {
	         						top: 150, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
								animationFunctions.topRightOutside.call( this, anim, {offset:-100});
	         					},
	         					properties: {
	         						top: 150, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'over-midsole-detail-group-front',
	         			startAt: 750+animationSections.over,
	         			endAt: 1350+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
								animationFunctions.bottomLeftOutside.call( this, anim, {offset:-100});
	         					},
	         					properties: {
	         						top: 150, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
								animationFunctions.topRightOutside.call( this, anim, {offset:-100});
	         					},
	         					properties: {
	         						top: 150, left: 0
	         					}
	         				}
	         			]
	         		},
	         		detailPartAnimation('over-midsole-title', {startLeft:96, startTop:0, endLeft:96, endTop:0, startAt:750+animationSections.over}),
	         		detailPartAnimation('over-midsole-text', {startLeft:-40, startTop:84, endLeft:-40, endTop:84, startAt:750+animationSections.over}),
	         		detailPartAnimation('over-midsole-img-2', {startLeft:-100, startTop:300, endLeft:50, endTop:50, startAt:750+animationSections.over}),
	         		detailPartAnimation('over-midsole-img-1', {startLeft:120, startTop:150, endLeft:420, endTop:-320, startAt:750+animationSections.over}),
	         		detailPartAnimation('over-download', {startLeft: 100, startTop:225, endLeft:100, endTop:225, startAt: 200+animationSections.over, endAt: 520+animationSections.over}),
	         		detailPartAnimation('over-download', {startLeft: 100, startTop:225, endLeft:325, endTop:25, startAt: 520+animationSections.over, endAt: 750+animationSections.over}),
	         		//detailPartAnimation('over-download', {startLeft: 600, startTop:-180, endLeft:-200, endTop:450, startAt: 400+animationSections.over, endAt: 650+animationSections.over}),
	         		//detailPartAnimation('over-download', {startLeft: -40, startTop:450, endLeft:-40, endTop:450, startAt: 650+animationSections.over, endAt: 820+animationSections.over}),
	         		{
	         			id: 'over-innersleeve-detail-group-back',
	         			startAt: 1210+animationSections.over,
	         			endAt: 1800+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomLeftOutside.call( this, anim, {offset: 600});
	         					},
	         					properties: {
	         						top: 200, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topRightOutside.call( this, anim, {offset: 600});
	         					},
	         					properties: {
	         						top: 200, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'over-innersleeve-detail-group-front',
	         			startAt: 1210+animationSections.over,
	         			endAt: 1800+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomLeftOutside.call( this, anim, {offset: 600});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topRightOutside.call( this, anim, {offset: 600});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		detailPartAnimation('over-innersleeve-title', {startLeft:0, startTop:239, endLeft:0, endTop:239, startAt:1100+animationSections.over}),
	         		detailPartAnimation('over-innersleeve-text', {startLeft:0, startTop:-140, endLeft:0, endTop:-140, startAt:1100+animationSections.over}),
	         		detailPartAnimation('over-innersleeve-img-1', {startLeft: 150, startTop:20, endLeft:230, endTop:-110, startAt:1100+animationSections.over}),
	         		detailPartAnimation('over-innersleeve-img-2', {startLeft:-180, startTop:300, endLeft:-20, endTop:80, startAt:1100+animationSections.over}),
	         		{
	         			id: 'over-designer-vid-cta',
	         			startAt: 1400+(animationSections.over),
	         			endAt: 1800+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomLeftOutside.call( this, anim, {offset:-450});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topRightOutside.call( this, anim, {offset:-450});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'over-phylon-midsole-detail-group',
	         			startAt: 1628+animationSections.over, 
	         			endAt: 1870+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomLeftOutside.call( this, anim, {offset: 250});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topRightOutside.call( this, anim, {offset: 250});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'over-phylon-midsole-detail-group-front',
	         			startAt: 1628+animationSections.over, 
	         			endAt: 1870+animationSections.over,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomLeftOutside.call( this, anim, {offset: 250});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topRightOutside.call( this, anim, {offset: 250});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},	         		
	         		detailPartAnimation('over-upper-text', {startLeft:0, startTop:100, endLeft:0, endTop:100, startAt:1300+animationSections.over}),
	         		detailPartAnimation('over-upper-img-1', {startLeft:200, startTop: 20, endLeft:20, endTop:-40, startAt:1300+animationSections.over}),
	         		{
	         			id: 'over-upper-detail-group',
	         			startAt: 1500+animationSections['over'],
	         			endAt: 1860+animationSections['over'],
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomLeftOutside.call( this, anim, {offset:500});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topRightOutside.call( this, anim, {offset:500});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'over-upper-detail-group-front',
	         			startAt: 1500+animationSections['over'],
	         			endAt: 1860+animationSections['over'],
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomLeftOutside.call( this, anim, {offset:500});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topRightOutside.call( this, anim, {offset:500});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},	         		
	         		detailPartAnimation('over-phylon-midsole-title', {startLeft:0, startTop:-85, endLeft:0, endTop:-85, startAt:1300+animationSections.over, endAt:1900+animationSections.over}),
	         		detailPartAnimation('over-phylon-midsole-text', {startLeft:0, startTop:0, endLeft:0, endTop:0, startAt:1300+animationSections.over, endAt:1900+animationSections.over}),
	         		detailPartAnimation('over-phylon-midsole-img-1', {startLeft: 10, startTop: 200, endLeft: 240, endTop:0, startAt:1000+animationSections.over, endAt:1800+animationSections.over}),
	         		//detailPartAnimation('over-phylon-midsole-img-1', {startLeft:-20, startTop: -235, endLeft:200, endTop:-400, startAt:1671+animationSections.over, endAt:1800+animationSections.over}),	         		
	         		{
	         			id: 'over-jet-line-03',
	         			startAt: 250+animationSections.over,
	         			endAt: 1150+animationSections.over,
	         			keyframes: [
	         					{ 
	         						position: 0,
	         						onInit: function( anim ) {
	         							animationFunctions.bottomLeftOutside.call( this, anim, {offset:-330});
	         						},
	         						properties: {
	         							top: 0, left: 0
	         						}
	         						
	         					},
	         					{
	         						position: 1,
	         						ease: TWEEN.Easing.Linear.EaseNone,
	         						onInit: function( anim ) {
	         							animationFunctions.topRightOutside.call( this, anim, {offset:-330});
	         						},
	         						properties: {
	         							top: 0, left: 0
	         						}
	         					}
	         				]
	         		},
	         		{
	         			id: 'over-jet-line-05',
	         			startAt: 850+animationSections.over,
	         			endAt: 1680+animationSections.over,
	         			keyframes: [
	         					{ 
	         						position: 0,
	         						onInit: function( anim ) {
	         							animationFunctions.bottomLeftOutside.call( this, anim, {offset:-180});
	         						},
	         						properties: {
	         							top: 0, left: 0
	         						}
	         						
	         					},
	         					{
	         						position: 1,
	         						ease: TWEEN.Easing.Linear.EaseNone,
	         						onInit: function( anim ) {
	         							animationFunctions.topRightOutside.call( this, anim, {offset:-180});
	         						},
	         						properties: {
	         							top: 0, left: 0
	         						}
	         					}
	         				]
	         		},
	         		{
	         			id: 'over-jet-line-03',
	         			startAt: 1450+animationSections.over,
	         			endAt: 1780+animationSections.over,
	         			keyframes: [
	         					{ 
	         						position: 0,
	         						onInit: function( anim ) {
	         							animationFunctions.bottomLeftOutside.call( this, anim, {offset:220});
	         						},
	         						properties: {
	         							top: 0, left: 0
	         						}
	         						
	         					},
	         					{
	         						position: 1,
	         						ease: TWEEN.Easing.Linear.EaseNone,
	         						onInit: function( anim ) {
	         							animationFunctions.topRightOutside.call( this, anim, {offset:220});
	         						},
	         						properties: {
	         							top: 0, left: 0
	         						}
	         					}
	         				]
	         		},	         		
	         		{
	         			id: 'over-marker-02',
	         			startAt: 190+animationSections.over,
	         			endAt: 900+animationSections.over,
	         			keyframes: [
	         					{ 
	         						position: 0,
	         						onInit: function( anim ) {
	         							animationFunctions.bottomLeftOutside.call( this, anim, {offset:-350});
	         						},
	         						properties: {
	         							top: 0, left: 0
	         						}
	         						
	         					},
	         					{
	         						position: 1,
	         						ease: TWEEN.Easing.Linear.EaseNone,
	         						onInit: function( anim ) {
	         							animationFunctions.topRightOutside.call( this, anim, {offset:-350});
	         						},
	         						properties: {
	         							top: 0, left: 0
	         						}
	         					}
	         				]
	         		},
	         		{
	         			id: 'over-marker-03',
	         			startAt: 790+animationSections.over,
	         			endAt: 1400+animationSections.over,
	         			keyframes: [
	         					{ 
	         						position: 0,
	         						onInit: function( anim ) {
	         							animationFunctions.bottomLeftOutside.call( this, anim, {offset:185});
	         						},
	         						properties: {
	         							top: 0, left: 0
	         						}
	         						
	         					},
	         					{
	         						position: 1,
	         						ease: TWEEN.Easing.Linear.EaseNone,
	         						onInit: function( anim ) {
	         							animationFunctions.topRightOutside.call( this, anim, {offset:185});
	         						},
	         						properties: {
	         							top: 0, left: 0
	         						}
	         					}
	         				]
	         		},
	         		{
	         			id: 'over-marker-04',
	         			startAt: 1190+animationSections.over,
	         			endAt: 1700+animationSections.over,
	         			keyframes: [
	         					{ 
	         						position: 0,
	         						onInit: function( anim ) {
	         							animationFunctions.bottomLeftOutside.call( this, anim, {offset:-150});
	         						},
	         						properties: {
	         							top: 0, left: 0
	         						}
	         						
	         					},
	         					{
	         						position: 1,
	         						ease: TWEEN.Easing.Linear.EaseNone,
	         						onInit: function( anim ) {
	         							animationFunctions.topRightOutside.call( this, anim, {offset:-150});
	         						},
	         						properties: {
	         							top: 0, left: 0
	         						}
	         					}
	         				]
	         		},
	         		
	         		
	         		
	         		
	         		// ---------------------------------------------
	         		// AROUND
	         		
	         		{
	         			id: 'around-bg-block-02',
	         			section: 'around',
	         			startAt: 0+animationSections.around,
	         			endAt: 800+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: .5,
	         					ease: TWEEN.Easing.Cubic.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {offset:500});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				},
	         				{
	         					position: .60,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {offset:500});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Cubic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		
	         		{
	         			id: 'around-bg-block-03',
	         			startAt: 150+animationSections.around,
	         			endAt: 960+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: .35,
	         					ease: TWEEN.Easing.Cubic.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {offset:-500});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				},
	         				{
	         					position: .55,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {offset:-500});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Cubic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'around-bg-block-05',
	         			startAt: 1200+animationSections.around,
	         			endAt: 1500+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'around-bg-block-06',
	         			startAt: 1110+animationSections.around,
	         			endAt: 1600+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'around-bg-block-07',
	         			startAt: 1580+animationSections.around,
	         			endAt: 1800+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},	         		
	         		{
	         			id: 'around-title-label',
	         			startAt: 220+animationSections.around,
	         			endAt: 850+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:235});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:235});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		
	         		// Car:
	         		{
	         			id: 'car-container',
	         			section: 'around',
	         			startAt: 0+animationSections.around,
	         			endAt: 1070+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call(this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: .55,
	         					ease: TWEEN.Easing.Quadratic.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call(this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Quadratic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call(this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},
	         		
	         		{
	         			id: 'car',
	         			section: 'around',
	         			startAt: 0+animationSections.around,
	         			endAt: 1070+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					properties: {top: 0, left: 790}
	         					
	         				},
	         				{
	         					position: 1,
	         					properties: {top: 0, left: 790}
	         				}
	         			]
	         		},

	         		carPartAnimation('t-sole-profile-front', [329,124], [-440, -1200]),
	        		carPartAnimation('b-sole-profile-front', [329,153], [-830, -2150]),

	        		carPartAnimation('t-sole-front', [456,37], 			[-330, -830]),
	        		carPartAnimation('b-sole-front', [456,160], 		[-120, -1300]),

	        		carPartAnimation('t-tire-front', [359,19], 			[300, -600]),
					carPartAnimation('b-tire-front', [359, 171], 		[150, -900]),

					carPartAnimation('m-bootie-front', [256,134], 		[350, -330]),

					carPartAnimation('t-shell', [113,38], 				[800, -460]),
					carPartAnimation('b-shell', [113,154], 				[300, -220]),

					carPartAnimation('t-bootie-back', [20,70], 			[1200, -250]),
					carPartAnimation('b-bootie-back', [18, 148], 		[600, -100]),
	        		
	        		carPartAnimation('t-tire-back', [14, 2], 			[1600, -150]),
	         		carPartAnimation('b-tire-back', [15,132], 			[900, -50]),

	        		carPartAnimation('t-rear-wing', [6,10], 			[2000, -50]),
	        		carPartAnimation('b-rear-wing', [6,164], 			[1200, -20]),
	        		{
	         			id: 'm-sole',
	         			section: 'around',
	         			startAt: 150+animationSections.around,
	         			endAt: 870+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call(this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Cubic.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call(this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},
	         		
	         		
	         		
	         		
	         		///////////////////////
	         		// Around Video:
	         		{
	         			id: 'around-vid',
	         			startAt: 970+(animationSections.around -= 100),
	         			endAt: 1710+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{ 
	         					position: .6,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onProgress: function( progress ) {
	         						var is = imageSequences['around'];

	         						var startFrame = 0, 
	         							endFrame = (is.imageCount/is.skipImages) * .7,
	         							toFrame = Math.floor(progress*endFrame);

									is.showImageAt( Math.floor(toFrame) );
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{ 
	         					position: .75,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},	         				
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onProgress: function( progress ) {
	         						var is = imageSequences['around'];

	         						var startFrame = (is.imageCount/is.skipImages) * .7, 
	         							endFrame = is.imageCount/is.skipImages,
	         							toFrame = Math.floor( startFrame - (progress*(startFrame-endFrame)) );

									is.showImageAt( Math.floor(toFrame) );
	         					},
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'around-vid-extra-shoe-1',
	         			startAt: 1180+animationSections.around,
	         			endAt: 1264+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {	         						
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {offset: 20});
	         						animationFunctions.centerV.call( this, anim, {offset:5});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'around-vid-extra-shoe-2',
	         			startAt: 1460+animationSections.around,
	         			endAt: 1532+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {	         						
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					//ease: TWEEN.Easing.Linear.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {offset: 20});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},	         		
	         		{
	         			id: 'around-vid-end-frame',
	         			startAt: 1710+animationSections.around,
	         			endAt: 2150+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Quadratic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'around-marker-01',
	         			startAt: 480+animationSections.around,
	         			endAt: 1400+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:230});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:230});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'around-marker-02',
	         			startAt: 1680+animationSections.around,
	         			endAt: 1950+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:15});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:15});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'around-marker-03',
	         			startAt: 780+animationSections.around,
	         			endAt: 1500+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:65});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:65});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		
	         		{
	         			id: 'around-line-03',
	         			startAt: 450+animationSections.around,
	         			endAt: 1350+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:120});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:120});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'around-line-04',
	         			startAt: 1340+animationSections.around,
	         			endAt: 2003+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:-100});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:-100});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'around-car-half-outline',
	         			startAt: 1140+animationSections.around,
	         			endAt: 1590+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:-250});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:-250});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'around-midsole-flythrough-detail-group-back',
	         			startAt: 805+animationSections['around'],
	         			endAt: 1380+animationSections['around'],
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:0});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:0});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'around-midsole-flythrough-detail-group-front',
	         			startAt: 805+animationSections['around'],
	         			endAt: 1380+animationSections['around'],
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:0});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:0});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		detailPartAnimation('around-download', {startLeft:-300, startTop:0, endLeft:0, endTop:0, startAt:300+animationSections.around, endAt:1000+animationSections.around}),
	         		detailPartAnimation('around-midsole-flythrough-img-2', {startLeft:230, startTop:-45, endLeft:270, endTop:-55, startAt:805+animationSections.around, endAt:1380+animationSections.around}),
	         		detailPartAnimation('around-midsole-flythrough-img-1', {startLeft:0, startTop:174, endLeft:0, endTop:174, startAt:805+animationSections.around, endAt:1380+animationSections.around}),
	         		detailPartAnimation('around-midsole-flythrough-title', {startLeft:0, startTop:40, endLeft:0, endTop:40, startAt:805+animationSections.around, endAt:1380+animationSections.around}),
	         		detailPartAnimation('around-midsole-flythrough-text', {startLeft:-107, startTop:127, endLeft:-107, endTop:127, startAt:805+animationSections.around, endAt:1380+animationSections.around}),
	         		
	         		{
	         			id: 'around-innersleeve-low-detail-group-back',
	         			startAt: 1270+animationSections.around,
	         			endAt: 1700+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:-90});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:-90});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'around-innersleeve-low-detail-group-front',
	         			startAt: 1270+animationSections.around,
	         			endAt: 1700+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:-90});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:-90});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		detailPartAnimation('around-innersleeve-low-img-2', {startLeft: 350, startTop:215, endLeft:-140, endTop:215, startAt:1270+animationSections.around, endAt:1900+animationSections.around}),
	         		detailPartAnimation('around-innersleeve-low-img-1', {startLeft:250, startTop:0, endLeft:680, endTop:0, startAt:1270+animationSections.around, endAt:2000+animationSections.around}),
	         		detailPartAnimation('around-innersleeve-low-title', {startLeft:110, startTop:60, endLeft:110, endTop:60, startAt:1270+animationSections.around, endAt:2000+animationSections.around}),
	         		detailPartAnimation('around-innersleeve-low-text', {startLeft:110, startTop:145, endLeft:110, endTop:145, startAt:1270+animationSections.around, endAt:2000+animationSections.around}),
	         		{
	         			id: 'around-designer-vid-cta',
	         			startAt: 1850+animationSections.around,
	         			endAt: 2040+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:130});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},       				
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:130});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		
	         		{
	         			id: 'around-outsole-detail-group',
	         			startAt: 1700+animationSections.around,
	         			endAt: 2125+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:-80});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:-80});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'around-perforations-detail-group-back',
	         			startAt: 1600+animationSections.around,
	         			endAt: 1900+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:200});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:200});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		{
	         			id: 'around-perforations-detail-group-front',
	         			startAt: 1600+animationSections.around,
	         			endAt: 1900+animationSections.around,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.leftOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:300});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.rightOutside.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:300});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         		},
	         		detailPartAnimation('around-outsole-img-1', {startLeft: 30, startTop:60, endLeft:30, endTop:60, startAt:1200+animationSections.around, endAt:2110+animationSections.around}),
	         		detailPartAnimation('around-outsole-title', {startLeft:151, startTop:172, endLeft:151, endTop:172, startAt:1500+animationSections.around, endAt:2110+animationSections.around}),
	         		detailPartAnimation('around-outsole-text', {startLeft:110, startTop:60, endLeft:110, endTop:60, startAt:1200+animationSections.around, endAt:2110+animationSections.around}),
	         		detailPartAnimation('around-perforations-img-1', {startLeft:110, startTop:285, endLeft:110, endTop:285, startAt:1200+animationSections.around, endAt:2110+animationSections.around}),
	         		detailPartAnimation('around-perforations-title', {startLeft:80, startTop:60, endLeft:170, endTop:60, startAt:1200+animationSections.around, endAt:2110+animationSections.around}),
	         		detailPartAnimation('around-perforations-text', {startLeft:110, startTop:145, endLeft:110, endTop:145, startAt:1200+animationSections.around, endAt:2110+animationSections.around}),
	         		
	         		///////////////////////////////////////////////////////
	         		// Through
	         		{
	         			id: 'through-bg-block-02',
	         			startAt: 50+animationSections.through,
	         			endAt: 700+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: .4,
	         					ease: TWEEN.Easing.Cubic.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {offset:480});
	         					},
	         					properties: {top: 0, left: 0}
	         				},
	         				{
	         					position: .7,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {offset:480});
	         					},
	         					properties: {top: 0, left: 0}
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Cubic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'through-bg-block-03',
	         			startAt: 100+animationSections.through,
	         			endAt: 750+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: .4,
	         					ease: TWEEN.Easing.Cubic.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {offset:480 + 660});
	         					},
	         					properties: {top: 0, left: 0}
	         				},
	         				{
	         					position: .7,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {offset:480 + 660});
	         					},
	         					properties: {top: 0, left: 0}
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Cubic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'through-bg-block-04',
	         			startAt: 400+animationSections.through,
	         			endAt: 1150+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Cubic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'through-bg-block-05',
	         			startAt: 600+animationSections.through,
	         			endAt: 1450+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Cubic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'tank-container',
	         			startAt: 0+animationSections.through,
	         			endAt: 800+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {offset:300});
	         						animationFunctions.centerH.call(this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: .5,
	         					ease: TWEEN.Easing.Quadratic.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.centerV.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Quadratic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},
					tankPartAnimation('tank-cannon', [251,2], 			[-70, -300]),

					tankPartAnimation('tank-m-shell', [220,114], 		[20, -300]),

					tankPartAnimation('tank-l-tread', [153,113], 		[150, -100]),
					tankPartAnimation('tank-r-tread', [317,113], 		[-110, -200]),
					
					tankPartAnimation('tank-r-t-shell', [266,157], 		[200, -250]),
					tankPartAnimation('tank-l-t-shell', [160,157], 		[130, -380]),

					tankPartAnimation('tank-turret', [215,213], 		[400, -320]),

					tankPartAnimation('tank-r-b-shell', [266,255], 		[830, -150]),
					tankPartAnimation('tank-l-b-shell', [160,254], 		[290, -320]),

					




					tankPartAnimation('tank-r-sole-profile', [322,180], [1270, -100]),
					tankPartAnimation('tank-l-sole-profile', [160,180], [500, -350]),

					tankPartAnimation('tank-r-sole-bottom', [304,306], 	[1660, -240]),
					tankPartAnimation('tank-l-sole-bottom', [170,306], 	[840, -100]),

					tankPartAnimation('tank-r-bootie', [256,308], 		[1850, -150]),
					tankPartAnimation('tank-l-bootie', [212,310], 		[1040, -250]),

					
					//tankPartAnimation('tank-m-sole', [228,195], 		[-240, 710]),
					
					{
	         			id: 'tank-m-sole',
	         			startAt: 200+animationSections.through,
	         			endAt: 400+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Quadratic.EaseOut,
	         					onInit: function( anim ) {
	         						animationFunctions.centerV.call( this, anim, {offset:20});
	         						animationFunctions.centerH.call(this, anim, {});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},
	         		
	         		{
	         			id: 'through-title-group',
	         			startAt: 100+animationSections.through,
	         			endAt: 700+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: 363, left: 580}
	         					
	         				},
	         				{
	         					position: .5,
	         					ease: TWEEN.Easing.Quadratic.EaseOut,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: 578, left: 580}
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Quadratic.EaseIn,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: 263, left: 580}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-title-text',
	         			startAt: 100+animationSections.through,
	         			endAt: 700+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {},
	         					properties: {top: 300, left: 470}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {},
	         					properties: {top: 300, left: 470}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-wallpaper-cta',
	         			startAt: 100+animationSections.through,
	         			endAt: 700+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {},
	         					properties: {top: 150}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {},
	         					properties: {top: 85}
	         				}
	         			]
	         		},
	         		
	         		
	         		{
	         			id: 'tank-half-outline',
	         			startAt: 660+animationSections.through,
	         			endAt: 1050+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:-110});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				// {
	         				// 	position: .44,
	         				// 	//ease: TWEEN.Easing.Quadratic.EaseOut,
	         				// 	onInit: function( anim ) {
	         				// 		animationFunctions.centerV.call( this, anim, {offset:530});
	         				// 		animationFunctions.centerH.call(this, anim, {offset:-110});
	         				// 	},
	         				// 	properties: {top: 0, left: 0}
	         				// },
	         				{
	         					position: 1,
	         					//ease: TWEEN.Easing.Quadratic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:-110});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},
	         		
	         		{
	         			id: 'through-line-01',
	         			startAt: 900+animationSections.through,
	         			endAt: 1400+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:-160});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:-160});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-midsole-detail-group-back',
	         			startAt: 550+animationSections.through,
	         			endAt: 1000+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         				animationFunctions.bottomOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:-110});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:-110});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-midsole-img-1',
	         			startAt: 550+animationSections.through,
	         			endAt: 1000+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: 200, left: -50}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: 125, left: -50}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-midsole-img-2',
	         			startAt: 550+animationSections.through,
	         			endAt: 1000+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: -100, left: 250}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: -225, left: 250}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-midsole-detail-group-front',
	         			startAt: 550+animationSections.through,
	         			endAt: 1000+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:-110});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:-110});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-innersleeve-detail-group-back',
	         			startAt: 840+animationSections.through,
	         			endAt: 1240+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:330});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:330});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-innersleeve-detail-group-front',
	         			startAt: 840+animationSections.through,
	         			endAt: 1240+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:330});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});

	         						animationFunctions.centerH.call(this, anim, {offset:330});

	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},
	         		{

	         			id: 'through-innersleeve-img-1',
	         			startAt: 800+animationSections.through,
	         			endAt: 1200+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: -70, left: -100}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: -250, left: -100}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-innersleeve-img-2',
	         			startAt: 800+animationSections.through,
	         			endAt: 1200+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: 250, left: 120}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: 100, left: 120}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-designer-vid-cta',
	         			startAt: 1250+animationSections.through,
	         			endAt: 1460+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:220});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:220});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-propulsion-detail-group',
	         			startAt:1050+animationSections.through,
	         			endAt: 1450+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:-100});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:-100});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-propulsion-img-1',
	         			startAt:1100+animationSections.through,
	         			endAt: 1600+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: 200, left: 40}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: 150, left: 40}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-upper-detail-group',
	         			startAt: 1340+animationSections.through,
	         			endAt: 1500+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:-100});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:-100});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]

	         		},	
	         		{
	         			id: 'through-upper-img-1',
	         			startAt: 1150+animationSections.through,
	         			endAt: 1550+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: 330, left: 50}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         					},
	         					properties: {top: 190, left: 50}
	         				}
	         			]
	         		},
	         		{
	         			id: 'through-line-02',
	         			startAt: 1160+animationSections.through,
	         			endAt: 1760+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:60});
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.topOutside.call( this, anim, {});
	         						animationFunctions.centerH.call(this, anim, {offset:60});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         			]
	         		},

	         		
					
					///////////////////
					// Through video
					{
	         			id: 'through-vid',
	         			startAt: 399+animationSections.through,
	         			endAt: 1350+animationSections.through ,
	         			keyframes: [
	    	         				{ 
	    	         					position: 0,
	    	         					onInit: function( anim ) {
	    	         						animationFunctions.centerH.call( this, anim, {});
	    	         						animationFunctions.centerV.call( this, anim, {});
	    	         					},
	    	         					properties: {
	    	         						top: 0, left: 0
	    	         					}
	    	         					
	    	         				},
	    	         				{ 
	    	         					position: .21 *(thr_vid_mul = 1.2),
	    	         					onInit: function( anim ) {
	    	         						animationFunctions.centerH.call( this, anim, {});
	    	         						animationFunctions.centerV.call( this, anim, {});
	    	         					},
	    	         					onProgress: function( progress ) {
	    	         						animationFunctions.videoPause.call( this, progress, imageSequences['through'], 0, .28)
	    	         					},
	    	         					properties: {
	    	         						top: 0, left: 0
	    	         					}
	    	         					
	    	         				},
	    	         				{ 
	    	         					position: .36 * thr_vid_mul,
	    	         					onInit: function( anim ) {
	    	         						animationFunctions.centerH.call( this, anim, {});
	    	         						animationFunctions.centerV.call( this, anim, {});
	    	         					},
	    	         					properties: {
	    	         						top: 0, left: 0
	    	         					}
	    	         					
	    	         				},
	    	         				
	    	         				{
	    	         					position: .48 * thr_vid_mul,
	    	         					onInit: function( anim ) {
	    	         						animationFunctions.centerH.call( this, anim, {});
	    	         						animationFunctions.centerV.call( this, anim, {});
	    	         					},
	    	         					onProgress: function( progress ) {
	    	         						animationFunctions.videoPause.call( this, progress, imageSequences['through'], .28, .555)
	    	         					},
	    	         					properties: {
	    	         						top: 0, left: 0
	    	         					}
	    	         				},
	    	         			
	    	         				{ 
	    	         					position: .53 * thr_vid_mul,
	    	         					onInit: function( anim ) {
	    	         						animationFunctions.centerH.call( this, anim, {});
	    	         						animationFunctions.centerV.call( this, anim, {});
	    	         					},
	    	         					properties: {
	    	         						top: 0, left: 0
	    	         					}
	    	         					
	    	         				},
	    	         				
	    	         				{
	    	         					position: .7 * thr_vid_mul,
	    	         					onInit: function( anim ) {
	    	         						animationFunctions.centerH.call( this, anim, {});
	    	         						animationFunctions.centerV.call( this, anim, {});
	    	         					},
	    	         					onProgress: function( progress ) {
	    	         						animationFunctions.videoPause.call( this, progress, imageSequences['through'], .555, .92)
	    	         					},
	    	         					properties: {
	    	         						top: 0, left: 0
	    	         					}
	    	         				},



	    	         				{ 
	    	         					position: .78 * thr_vid_mul,
	    	         					onInit: function( anim ) {
	    	         						animationFunctions.centerH.call( this, anim, {});
	    	         						animationFunctions.centerV.call( this, anim, {});
	    	         					},
	    	         					properties: {
	    	         						top: 0, left: 0
	    	         					}
	    	         					
	    	         				},
	    	         				
	    	         				{
	    	         					position: 1,
	    	         					onInit: function( anim ) {
	    	         						animationFunctions.centerH.call( this, anim, {});
	    	         						animationFunctions.centerV.call( this, anim, {});
	    	         					},
	    	         					onProgress: function( progress ) {
	    	         						animationFunctions.videoPause.call( this, progress, imageSequences['through'], .92, 1)
	    	         					},
	    	         					properties: {
	    	         						top: 0, left: 0
	    	         					}
	    	         				}
	    	         			]
	         		},
	    
	         		{
	         			id: 'through-vid-extra-shoe-1',
	         			startAt: 780+animationSections.through,
	         			endAt: 816+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					//ease: TWEEN.Easing.Quadratic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {offset: -5});
	         						animationFunctions.centerV.call( this, anim, {offset: -25});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		{
	         			id: 'through-vid-extra-shoe-2',
	         			startAt: 680+animationSections.through,
	         			endAt: 1063+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Quadratic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset: -30});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		
	         		{
	         			id: 'through-vid-end-frame',
	         			startAt: 1350+animationSections.through,
	         			endAt: 1750+animationSections.through,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Quadratic.EaseIn,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.topOutside.call( this, anim, {});
	         					},
	         					properties: {
	         						top: 0, left: 0
	         					}
	         				}
	         			]
	         			
	         		},
	         		
	         		{
	         			id: 'social-screen',
	         			startAt: animationSections.share,
	         			endAt: 800+animationSections.share,
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					onInit: function( anim ) {
	         						animationFunctions.bottomOutside.call( this, anim, {});
	         						
	         					},
	         					properties: {top: 0, left: 0}
	         					
	         				},
	         				{
	         					position: .4,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:-60});
	         					},
	         					properties: {top: 0, left: 0}
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
	         						animationFunctions.centerH.call( this, anim, {});
	         						animationFunctions.centerV.call( this, anim, {offset:-60});
	         					},
	         					properties: {top: 0, left: 0}
	         				}
	         				
	         			]
	         		},
	         		socailPaneAnimation('social-over', {startLeft:0, startTop:800, endLeft:0, endTop:125, startAt:0+animationSections.share,endAt: 800+animationSections.share}),
	         		socailPaneAnimation('social-around', {startLeft:0, startTop:900, endLeft:0, endTop:403, startAt:50+animationSections.share,endAt: 800+animationSections.share}),
	         		socailPaneAnimation('social-through', {startLeft:0, startTop:1200, endLeft:0, endTop:681, startAt:100+animationSections.share,endAt: 800+animationSections.share}),
	         		socailPaneAnimation('footer-text', {startLeft:86, startTop:1200, endLeft:86, endTop:955, startAt:120+animationSections.share,endAt: 800+animationSections.share})
	         	];

	
	// ---------------------------------------------
	// ANIMATION AUTOMATION
	// ---------------------------------------------
	
	function absoluteAnimation(partId, homePos, offsets, animateX, animateY, startAt, endAt, opts)
	{
		
		var defaults = {keyframePositions: [0, .35, .55, 1],
				offsetMultiplier: 1},
		settings = $.extend(defaults, opts);
		var $target = $('#' + partId);
		var homeX = homePos[0];
		var homeY = homePos[1];
		var startOffset = offsets[0] * settings.offsetMultiplier;
		var endOffset = offsets[1] * settings.offsetMultiplier;
		
		var anim = {
			id: partId,
			startAt: startAt,
			endAt: endAt,
			keyframes: [
				{ 
					position: settings.keyframePositions[0],
					onInit: function( anim ) {},
					properties: {}
					
				},
				{ 
					position: settings.keyframePositions[1],
					ease: TWEEN.Easing.Quadratic.EaseOut,
					onInit: function( anim ) {},
					properties: {}
					
				},
				{ 
					position: settings.keyframePositions[2],
					onInit: function( anim ) {},
					properties: {}
					
				},
				{
					position: settings.keyframePositions[3],
					ease: TWEEN.Easing.Quadratic.EaseIn,
					onInit: function( anim ) {},
					properties: {}
				}
			]
		};
		
		anim.keyframes[0].properties.left = homeX - (animateX ? startOffset : 0);
		anim.keyframes[1].properties.left = homeX;
		anim.keyframes[2].properties.left = homeX;
		anim.keyframes[3].properties.left = homeX - (animateX ? endOffset : 0);
		anim.keyframes[0].properties.top = homeY + (animateY ? startOffset : 0);
		anim.keyframes[1].properties.top = homeY;
		anim.keyframes[2].properties.top = homeY;
		anim.keyframes[3].properties.top = homeY + (animateY ? endOffset : 0);
		return anim;
	}
	
	function carPartAnimation(partId, homePos, offsets)
	{
		var startAt = 0+animationSections.around;
		var endAt = 1070+animationSections.around;
		return absoluteAnimation(partId, homePos, offsets, true, false, startAt, endAt, {offsetMultiplier:1, keyframePositions: [0, .45, .50, 1]});
	}
	
	function jetPartAnimation(partId, homePos, offsets)
	{
		var startAt = 270+animationSections['over'];
		var endAt = 900+animationSections['over'];
		return absoluteAnimation(partId, homePos, offsets, true, true, startAt, endAt, {offsetMultiplier:1.5});
	}
	
	function tankPartAnimation(partId, homePos, offsets)
	{
		var startAt = 0+animationSections.through;
		var endAt = 800+animationSections.through;
		return absoluteAnimation(partId, homePos, offsets, false, true, startAt, endAt, {offsetMultiplier:3, keyframePositions: [0, .45, .55, 1]});
	}

	function socialPartAnimation(partId, homePos, offsets)
	{
		var startAt = 0+animationSections.share;
		var endAt = 800+animationSections.share;
		return absoluteAnimation(partId, homePos, offsets, false, true, startAt, endAt, {offsetMultiplier:3, keyframePositions: [0, .45, .55, 1]});
	}

	
	function detailPartAnimation(partId, opts)
	{
		var defaults = {startLeft:0, startTop:0, endLeft:0, endTop:0, startAt:0, endAt:0}, settings = $.extend(defaults, opts);
		if(settings.endAt == 0)settings.endAt = settings.startAt + 600;
		return{
			id: partId,
			startAt: settings.startAt,
			endAt: settings.endAt,
			keyframes: [
				{ 
					position: 0,
					onInit: function( anim ) {
					},
					properties: {
						left: settings.startLeft,
						top: settings.startTop
					}
					
				},
				{ 
					position: 1,
					onInit: function( anim ) {
					},
					properties: {
						left: settings.endLeft,
						top: settings.endTop
					}
				}
			]
		};
	}

	function socailPaneAnimation(partId, opts)
	{
		var defaults = {startLeft:0, startTop:0, endLeft:0, endTop:0, startAt:0, endAt:0}, settings = $.extend(defaults, opts);
		if(settings.endAt == 0)settings.endAt = settings.startAt + 600;
		return{
			id: partId,
			startAt: settings.startAt,
			endAt: settings.endAt,
			keyframes: [
				{ 
					position: 0,
					onInit: function( anim ) {
					},
					properties: {
						left: settings.startLeft,
						top: settings.startTop
					}
					
				},
				{ 
					position: .2,
					onInit: function( anim ) {
					},
					properties: {
						left: settings.endLeft,
						top: settings.endTop
					}
				},
				{ 
					position: 1,
					onInit: function( anim ) {
					},
					properties: {
						left: settings.endLeft,
						top: settings.endTop
					}
				}
			]
		};
	}
	

	function animationAutomation() {
		
	}


	
	// ---------------------------------------------
	// INIT IMAGE SEQUENCES
	// ---------------------------------------------
	function initImageSequences() {
		// over
		if(location.pathname == '/jumpman23/aj2012/index2.html') {
			imageSequences['over'] = new ImageSequence({
				filesPath:'images/over/vid/{index}.png',
				imageCount: 198,
				skipImages: 2,
				container: $('#over-vid'),
				onProgress: function() {
	
					loadProgress.update( this.skipImages );
				}
			});
	
			// around
			imageSequences['around'] = new ImageSequence({
				filesPath:'images/around/vid/{index}.png',
				imageCount: 183,
				skipImages: 2,
				container: $('#around-vid'),
				onProgress: function() {
					loadProgress.update( this.skipImages );
				}
			});
	
			// through
			imageSequences['through'] = new ImageSequence({
				filesPath:'images/through/vid/{index}.png',
				imageCount: 240,
				skipImages: 2,
				container: $('#through-vid'),
				onProgress: function() {
					loadProgress.update();
				}
			});	
		} else {
			imageSequences['over'] = new ImageSequence({
				filesPath:'images/over/vid-50/{index}.png',
				imageCount: 198,
				skipImages: 2,
				container: $('#over-vid'),
				onProgress: function() {
	
					loadProgress.update( this.skipImages );
				}
			});
	
			// around
			imageSequences['around'] = new ImageSequence({
				filesPath:'images/around/vid-50/{index}.png',
				imageCount: 183,
				skipImages: 2,
				container: $('#around-vid'),
				onProgress: function() {
					loadProgress.update( this.skipImages );
				}
			});
	
			// through
			imageSequences['through'] = new ImageSequence({
				filesPath:'images/through/vid-50/{index}.png',
				imageCount: 240,
				skipImages: 2,
				container: $('#through-vid'),
				onProgress: function() {
					loadProgress.update();
				}
			});			
		}
		
		// init LoadProgress
		loadProgress = new LoadProgress({
			onUpdate: function( val ) {
				nav.setLoadProgress( val*100 );
			},
			onComplete: function() {
				nav.hideLoadProgress( this.skipImages );
			}
		})

		// register with LoadProgress
		for (i in imageSequences) {
			loadProgress.register( imageSequences[i].imageCount );
			imageSequences[i].load();
		}

		
	}

	// UI
	// yt
	function showYt( vid ) {
		console.log('showing', vid);
		scrollAnimate.stopScroll(); 
		yt = true;
		var container = $('#yt');
		container.append('<div id="player"></div>');
		container.fadeIn();
		
		var margins = 40,
			playerWidth = page.wWidth - (margins*2),
			playerHeight = (playerWidth/16) * 9;

		var player;

		$('#player').css({
			'position': 'absolute',
			'top': ((page.wHeight/2) - (playerHeight/2)) + 'px',
			'left': margins + 'px'
		});
		
		if (YT) {
			player = new YT.Player('player', {
				videoId: vid,
				width: playerWidth, height: playerHeight,
				playerVars: { 
  					'rel': 0
  				}, 
				events: {
					'onReady': onPlayerReady
				}
	        });
		}

		function onPlayerReady(event) {
			event.target.playVideo();
		}
	};

	function closeYt() {
		if (yt) {
			$('#yt #player').hide().remove();
			$('#yt').fadeOut();	
			yt = false;	
		}
	};


	// nav scrollTo
	gotoSection = {
		'#intro': 0,
		'#over': 520,
		'#around': 2110,
		'#through': 3890,
		'#social': 5210,
		'#buy': 5210
	}

	

	// check sections
	function checkSection() {
		var scrollTop = scrollAnimate.getScrollTop();
		var sectionIndex = [];

		for (section in gotoSection) {
			sectionIndex.push(section);
		}

		for (var i = 0, count = sectionIndex.length; i < count; i++) {
			var nSection = sectionIndex[i+1],
				cSection = sectionIndex[i],
				nValue;

			if (!nSection) nValue = scrollAnimate.getMaxScroll();
			else nValue = gotoSection[nSection];

			if (scrollTop > gotoSection[cSection] && scrollTop < nValue) {
				if (currentSection != cSection) {
					currentSection = cSection;
					enterSection(currentSection);
				}
				
			} 
		}
	}

	function enterSection(section) {
		//console.log( 'currentSection', section );
		// omniture for tracking sections
		s.tl(this,'o','usJ23:stories:AJ2012:'+section.replace('#','fly-')+'-Viewed');
	}

	
	// --------------------------------------------------
	// PUBLIC
	// --------------------------------------------------
	var init = function( opts ) {
		settings = $.extend( defaults, opts );

		var ui;

		// draw background shapes
		drawing.drawBGShapes();

		// init image sequence and load progress indicators
		initImageSequences();

		// animation automation
		animationAutomation();

		// A flag to start and stop updating the nav bars. Used to prevent nav flicker on hover
		window.shouldUpdate = true;

		// ui
		// nav
		$('.nav-links').click( function(e) {	
			e.preventDefault();
			var hash = this.href.substring( this.href.indexOf('#') );
			shouldUpdate = true;
			closeYt();
			scrollAnimate.scrollTo( gotoSection[ hash ] );
		});



		
		if (window.location.hash) {
			settings.startAt = gotoSection[ window.location.hash ];
		};

		// ui
		Ui.init();

		// scroll animator
		scrollAnimate = ScrollAnimator();
		scrollAnimate.init({
			// data
			animation: animation,	// animation data
			
			// settings
			maxScroll: 5400,			// max scroll
			useRAF : false,				// set requestAnimationFrame
			tickSpeed: 50,				// set interval (ms) if not using RAF
			scrollSpeed: 15,
			debug: false,				// turn on debug
			tweenSpeed: .3,				// scrollTop tween speed
			startAt: settings.startAt,	// scrollTop where the experience starts
			container: $('#main'),		// main container

			// callbacks
			onStart: function() {
				$('#side-nav').css({
					'right': 0
				})
			},
			onResize: function() {
				$('#main').width($(window).width() - $('#side-nav').width());
			},
			onUpdate: function() {
				if (shouldUpdate == true) {
					nav.updateScroll( scrollAnimate.getScrollTop() / scrollAnimate.getMaxScroll() );
					
				}
			}
		});


		var hoverIn = function() {
			// Decide which NavItem to resize on hover						
			var hash = this.href.substring( this.href.indexOf('#') );			
			// Set the onUpdate flag to false so that the navigation doesn't flicker while trying to constantly
			// update it's size.
			
			// Update the targetted NavItem to full size if the NavItem is not the current one
			// We check to see if the current NavItem is not the current one by seeing if 
			// it's circle prog is equal to 0.
			var current = {x: 0};
			var target = {x: .8};
			var tween = new TWEEN.Tween(current).to(target, 150);

			if (hash == "#over") {
				if (nav.items[0].size <= 0.8) {
					//nav.items[0].update(1);
					targetNavItem = nav.items[0];
					shouldUpdate = false;
					tween.onUpdate(function (){						
						targetNavItem.update(current.x);
					})
					tween.start();					
				}
			}
			else if (hash == "#around") {
				if (nav.items[1].size == 0) {
					//nav.items[1].update(1);
					targetNavItem = nav.items[1];
					shouldUpdate = false;
					tween.onUpdate(function (){						
						targetNavItem.update(current.x);
					})
					tween.start();						
				}
			}
			else if (hash == "#through") {
				if (nav.items[2].size == 0) {
					//nav.items[2].update(1);
					targetNavItem = nav.items[2];
					shouldUpdate = false;
					tween.onUpdate(function (){						
						targetNavItem.update(current.x);						
					})
					tween.start();						
				}
			}
			else if (hash == "#social") {
					shouldUpdate = false;
					$('#nav-share').css('opacity', .5);					
			}
			else if (hash == "#buy") {
					shouldUpdate = false;
					$('#nav-buynow').css('opacity', .5);								
			}			

			//shouldUpdate = true;
			nav.updateScroll( scrollAnimate.getScrollTop() / scrollAnimate.getMaxScroll() );
			
		}

		var hoverOut = function() {
			// The NavItem should be set back to its previous progress state on a hover Out
			nav.updateScroll( scrollAnimate.getScrollTop() / scrollAnimate.getMaxScroll() );
			// Set the update flag back to true so that the size of the nav items can once again
			// be updated by the ScrollAnimate onUpdate function. This is turned off to ensure
			// no blinking on the side nav occurs during hovers.
			shouldUpdate = false;
			// Should set the opacity of the share item back to 1 incase it was changed
			$('#nav-share, #nav-buynow').css('opacity', '1.0');
			// var hash = this.href.substring( this.href.indexOf('#') );			
			// var current = {x: .8};
			// var target = {x: 0};
			// var tween = new TWEEN.Tween(current).to(target, 300);
			// if (hash == "#over") {
			// 	if (nav.items[0].size <= 0.8) {					
			// 		//nav.items[0].update(1);
			// 		targetNavItem = nav.items[0];
			// 		tween.onUpdate(function (){
			// 			targetNavItem.update(current.x);						
			// 		})
			// 		tween.start();					
			// 	}
			// }
			// else if (hash == "#around") {
			// 	if (nav.items[1].size <= 0.8) {
			// 		//nav.items[1].update(1);
			// 		targetNavItem = nav.items[1];
			// 		tween.onUpdate(function (){
			// 			targetNavItem.update(current.x);
			// 		})
			// 		tween.start();						
			// 	}
			// }
			// else if (hash == "#through") {
			// 	if (nav.items[2].size <= 0.8) {
			// 		//nav.items[2].update(1);
			// 		targetNavItem = nav.items[2];
			// 		tween.onUpdate(function (){
			// 			targetNavItem.update(current.x);					
			// 		})
			// 		tween.start();						
			// 	}
			// }
			// else if (hash == "#social") {
				
			// 	tween.onUpdate(function (){
			// 		$('#nav-share').css('opacity', 1.2-current.x);		
			// 	})
			// 	tween.start();				
			// }			

			shouldUpdate = true;


		}

		// Bind the above defined functions to every link within the nav
		//$('.nav-links').hover(hoverIn, hoverOut);		


		
		// over - designer interview
		$('#over-designer-vid-cta').click( function() {
			showYt('DRoMpopYaKo');
			s.tl(this,'o','usJ23:stories:AJ2012:FlyOverVideo');
		});
		
		// around - designer interview
		$('#around-designer-vid-cta').click( function() {
			showYt('L4NfSfMlQcY');
			s.tl(this,'o','usJ23:stories:AJ2012:FlyAroundVideo');
		});

		// through - designer interview
		$('#through-designer-vid-cta').click( function() {
			showYt('GLT2v41X0nM');
			s.tl(this,'o','usJ23:stories:AJ2012:FlyThroughVideo');
		});

		$('#yt #close, #yt').click( closeYt );

		
		// scrollable twitter pane
		$('.scrollable').scroll( function(e) {
			scrollAnimate.freezeTouchScroll();
			scrollAnimate.scrollTo( scrollAnimate.getScrollTop() );
			scrollAnimate.stopScroll();
		})
		

		// debug
		if (scrollAnimate.isDebug()) {
			// browser detect
			BrowserDetect.init();
			
			$('#status').html( BrowserDetect.browser + '<br/>' +BrowserDetect.version).show();
			
			$('#status2').show();
		};

		// kb
		$(window).keydown(function(e) {
	        	if(e.keyCode == 192) {
	        		scrollAnimate.toggleDebug();
	        	};
	        	if (e.keyCode == 40 || e.keyCode == 39) {
	        		var currentScroll = scrollAnimate.getScrollTop();
	        		var targetScroll = currentScroll + 25;
	        		if (targetScroll > scrollAnimate.getMaxScroll()) {
	        			targetScroll = currentScroll;
	        		}
	        		scrollAnimate.scrollTo(targetScroll);
	        		
	        	};
	        	if (e.keyCode == 38 || e.keyCode == 37) {
	        		var currentScroll = scrollAnimate.getScrollTop();
	        		var targetScroll = currentScroll - 25;
	        		if (targetScroll < 0) {
	        			targetScroll = 0;
	        		}
	        		scrollAnimate.scrollTo(targetScroll);
	        		
	        	};
        	
		});

		// section checks
		setInterval( checkSection, settings.sectionCheckInterval );

	}


	return {
		init: init
	}
})();

$(document).ready( function() {
	if(IsMobile.detect()){
		document.location = 'mobile/'
		return false;
	};
	AJ2012Site.init();
});




