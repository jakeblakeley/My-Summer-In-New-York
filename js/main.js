/*global alert:true, Modernizr:true */
/*jslint node: true */
"use strict";

var pathObj = {
    "ideo": {
        "strokepath": [
            {"path": "   M392.129,146c-21.5,1.75-47.023,6.5-62.137,11s21.63-3.75,29.63-5.25s8.257,63.25,7.257,66.25s-29.909,7.033-30.455,8.017   C335.879,227,390.629,212.5,401.129,215",
             "duration": 500},
            {"path": "   M425.879,138c-0.5-5,5.818,66.971,9.4,68.965c8.6,4.785,35.266-1.965,47.266-39.521c9.986-31.254-5.332-49.398-62.666-26.444",
             "duration": 500},
            {"path": "   M409.546,239.389C399.213,242.334,346.213,256,344.879,258c-1.333,2,9.666,66.791,12.334,67.562   c2.666,0.771,56-14.229,60.333-15.562",
             "duration": 400},
            {"path": "   M398.546,278.557c-7.333,0.11-52.333,13.443-54,14.777",
             "duration": 100},
            {"path": "   M466.213,230.667c-31.105,8.722-33.422,65.442-8.422,73.109s37.887-9.243,44.469-23.22c17.816-37.831-10.047-60.557-48.047-46.89",
             "duration": 400}
        ],"dimensions": {
            "width": 600,
            "height": 486
        }
    }
}; 

$(document).ready(function(){
	  //==========================//
	 // Parallax
	//===========================//
	//fallbacks
	var threedTransforms 	= false,
		transformValue		= 0;

	//fallback
	if (Modernizr.csstransforms3d){
		threedTransforms = true;
	} else if (Modernizr.csstransforms){
		threedTransforms = false;
	} else {
		alert("Sorry, but your browser does not support the technology used in this website. Try upgrading your browser: http://browsehappy.com/");
	}

	//call correct transform based on browser support
	function transformFunction(x, y, z) {
		if (threedTransforms === true){
			transformValue = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)';
		} else {
			transformValue = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(' + z + 'px)';
		}
	    return transformValue;
	}

	//request animation frame polyfill
	(function() {
	    var lastTime = 0;
	    var vendors = ['webkit', 'moz'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame =
	          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }

	    if (!window.requestAnimationFrame){
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	    }

	    if (!window.cancelAnimationFrame){
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	    }
	}());

	// Detect request animation frame
	var scrolling = window.requestAnimationFrame,
	    browserHeight = $(window).height(),
	    browserWidth = $(window).width(),
	    scrollSnap = 200, //distance away from waypoint for browser to snap to
		lastPosition = -1;

	//smaller scrollsnap for small screens
	if (scrollSnap > ($(window).height() * 0.25)){
		scrollSnap = $(window).height() * 0.2;
	}

	//global variables for elements being animated
		//scene 1
	var cloudsInner 	= $(".clouds img"),
		title 			= $(".titleContainer, .titleScroll"),
		skyscrapers 	= $(".skyscrapers"),
		street 			= $(".street"),
		sceneOne 		= $(".sceneOne"),
		sceneOneText	= $(".sceneOneText"),
		//scene 2
		woodDesk		= $(".woodDesk"),
		sceneTwoText	= $(".sceneTwoText"),
		backpage2		= $(".backpage2"),
		backpage1		= $(".backpage1"),
		marker2			= $(".marker2"),
		coffee 			= $(".coffee"),
		stickyNotes 	= $(".stickyNotes"),
		ideo			= $(".ideo"),
		marker1			= $(".marker1"),
		//scene 3
		sceneThree 		= $(".sceneThree"),
		sceneThreeText	= $(".sceneThreeText"),
		phone			= $(".phone"),
		moon 			= $(".moon"),
		statue 			= $(".statue"),
		boat 			= $(".boat"),
		sceneThreeImage	= $(".skylineBackground"),
		screenFlash		= $(".screenflash"),
		//scene 4
		radioCity 		= $(".radioCityLeft, .radioCityRight, .sceneFourText"),
		taxiSmall 		= $(".taxiSmall"),
		taxiLarge 		= $(".taxiLarge"),
		radioCityRight  = $(".radioCityRight, .sceneFourText"),
		//scene 5
		skyBackground 	= $(".skyBackground"),
		plane			= $(".plane"),
		sceneFiveText	= $(".sceneFiveText"),
		sceneFive 		= $(".sceneFive, .sceneFiveText");

	//globals for math of animations
	var titleScroll 			= (browserHeight - scrollSnap),
		sectionOnewidth 		= $("img.street").width(),
		sectionTwoScroll 		= browserHeight * 2,
		sectionThreeScroll 		= browserHeight * 3,
		sectionFourScroll   	= browserHeight * 4,
		sectionFourHalfScroll	= sectionFourScroll + (browserHeight * 0.6),
		sectionFiveScroll   	= browserHeight * 5,
		secondaryAnimationOne 	= browserHeight - scrollSnap,
		secondaryAnimationTwo 	= browserHeight + (browserHeight * 0.4),
		secondaryAnimationThree = sectionTwoScroll - 4,
		secondaryAnimationFour  = sectionTwoScroll + 4,
		secondaryAnimationFive	= sectionThreeScroll - scrollSnap,
		secondaryAnimationSix	= sectionFourScroll + (browserHeight * 0.4),
		phoneWidth 				= (browserHeight * 1.25) * -0.96;
	phone.css("transform", transformFunction(phoneWidth , 0, 0));

	//cache if resets are in sure or not, to call on only once
	var isSceneOneReset 	= false,
		isSceneTwoReset 	= false,
		isSceneThreeReset 	= false,
		isSceneFourReset	= false,
		isSceneFiveReset	= false,
		isSceneSixReset		= false,
		lazyLinePainted		= false;

	//fake scroll to fix positioning issues
	function fakeScroll(){
		$(window).scrollTop($(window).scrollTop()+1);
	}

	//fix position issue on page reload
	fakeScroll();

	//update some vars on window resize
	$(window).resize(function() {
		browserHeight 			= $(window).height();
	    browserWidth 			= $(window).width();
	    titleScroll 			= (browserHeight - scrollSnap);
		sectionOnewidth 		= $("img.street").width();
		sectionTwoScroll 		= browserHeight * 2;
		sectionThreeScroll 		= browserHeight * 3;
		sectionFourScroll   	= browserHeight * 4;
		sectionFourHalfScroll	= sectionFourScroll + (browserHeight * 0.6);
		sectionFiveScroll   	= browserHeight * 5;
		secondaryAnimationOne 	= browserHeight - scrollSnap;
		secondaryAnimationTwo 	= browserHeight + (browserHeight * 0.4);
		secondaryAnimationThree = sectionTwoScroll - 4;
		secondaryAnimationFour  = sectionTwoScroll + 4;
		secondaryAnimationFive	= sectionThreeScroll - scrollSnap;
		secondaryAnimationSix	= sectionFourScroll + (browserHeight * 0.4);
		phoneWidth 				= (browserHeight * 1.25) * -0.96;
		phone.css("transform", transformFunction(phoneWidth , 0, 0));
	    $('#ideo').css({"transform" : "scale(" + ((browserHeight * 0.45) / 486) + ")", "transform-origin" : "top left"});
	});

	//resets for scene start and end
	function titleStart(){ //title screen 
		title.css({'transform':  transformFunction(0, 0, 0),'opacity': '1'});
		cloudsInner.css('opacity', '1');
		skyscrapers.css('transform',  transformFunction(0, 0, 0));
		street.css('transform',  transformFunction(0, 0, 0));
		sceneOneText.css({'transform': transformFunction(0, 0, 0), 'opacity': '0'});
		sceneOne.css('transform', 'scale(1)');
	}
	function titleEnd(){ //title screen 
		title.css({'opacity': '0'});
		cloudsInner.css('opacity', '0');
		skyscrapers.css('transform',  transformFunction(0, -browserHeight, 0));
		sceneOneText.css({'transform': transformFunction(0, 0, 0), 'opacity': '1'});
	}
	function sceneOneStart(){ //streets
		street.css('transform',  transformFunction(0, 0, 0));
		sceneOne.css('transform', 'scale(1)');
	}
	function sceneOneEnd(){ //streets
		street.css('transform',  transformFunction(0, -browserHeight, 0));
	}
	function sceneTwoStart(){ //desk
		var phoneHide = (browserHeight * 0.3).toFixed(2);
		sceneThree.css('transform', transformFunction(0, phoneHide, 0) + 'rotate(-50deg) scale(0.3)');
		$(".coffee, .stickyNotes, .marker1, .woodDesk").css('transform', transformFunction(0, 0, 0));
		$(".sceneTwoText, .backpage1, .backpage2, .marker2").css('transform',  transformFunction(0, 0, 0) + 'rotate(0deg)');
	}
	function sceneTwoEnd(){ //desk
		var coffeeSlideIn1		= (browserHeight * -0.45).toFixed(2),
			coffeeSlideIn2		= (browserWidth * 0.2).toFixed(2),
			stickySlideIn1  	= (browserHeight * 0.45).toFixed(2),
			stickySlideIn2		= (browserWidth * 0.15).toFixed(2),
			marker1SlideIn		= (browserHeight * 0.5).toFixed(2),
			sceneTwoTextSlideIn	= -480;
		coffee.css('transform',  transformFunction(coffeeSlideIn2, coffeeSlideIn1, 0));
		stickyNotes.css('transform',  transformFunction(stickySlideIn2, stickySlideIn1, 0));
		marker1.css('transform',  transformFunction(coffeeSlideIn2, marker1SlideIn, 0));
		sceneTwoText.css('transform',  transformFunction(sceneTwoTextSlideIn, 0, 0) + 'rotate(' + -2 +'deg)');
		backpage1.css('transform',  transformFunction(-24, 0, 0) + 'rotate(' + -3 +'deg)');
		backpage2.css('transform',  transformFunction(-32, 0, 0) + 'rotate(' + -12 +'deg)');
		marker2.css('transform',  transformFunction(-64, 72, 0) + 'rotate(' + -13 +'deg)');
		woodDesk.css('transform', transformFunction(0, -browserHeight, 0));
		sceneOne.css('transform', 'scale(0.94)');
	}
	function sceneThreeStart(){ //cruise
		sceneThreeImage.css("transform", "rotateY(-90deg)" + transformFunction(0, 0, 0));
		screenFlash.css({"transform": "rotateY(-90deg)", "opacity": "0"});
		$(".moon, .statue, .boat, .sceneThreeText").css('transform', transformFunction(0, 0, 0));
	}
	function sceneThreeEnd(){ //cruise
		var sceneThreeTop 		= (browserHeight * -0.7).toFixed(2),
			sceneThreeLeft 		= (browserWidth * 0.25).toFixed(2);
		sceneThree.css('transform', transformFunction(sceneThreeLeft, sceneThreeTop, 0) + 'rotate(0deg) scale(1)');
		screenFlash.css({"transform": "rotateY(0deg)", "opacity": "0"});
	}
	function sceneFourStart(){ //radio city 
		$(".radioCityLeft, .radioCityRight, .taxiSmall, .taxiLarge").css('transform', transformFunction(0, 0, 0));
		radioCityRight.hide();	
	}
	function sceneFourEnd(){ //radio city
		var taxiSmallSlideEnd	= (browserWidth * -0.6).toFixed(2),
			radioCitySlideEnd	= (browserWidth * -1).toFixed(2),
			taxiLargeSlideEnd	= (browserWidth * -1.15).toFixed(2),
			moonSlideEnd 		= (browserWidth * 0.05).toFixed(2),
			statueSlideEnd 		= (browserWidth * -0.1).toFixed(2),
			boatSlideEnd 		= (browserWidth * -0.15).toFixed(2),
			sceneThreeSlideEnd  = (browserWidth * -0.2).toFixed(2);
		taxiSmall.css('transform', transformFunction(taxiSmallSlideEnd, 0, 0)); 
		radioCity.css('transform', transformFunction(radioCitySlideEnd, 0, 0)); 
		taxiLarge.css('transform', transformFunction(taxiLargeSlideEnd, 0, 0));
		moon.css('transform', transformFunction(moonSlideEnd, 0, 0));
		statue.css('transform', transformFunction(statueSlideEnd, 0, 0));
		boat.css('transform', transformFunction(boatSlideEnd, 0, 0));
		sceneThreeImage.css('transform', transformFunction(sceneThreeSlideEnd, 0, 0));
		console.log("scenefourend");
	}
	function sceneFiveStart(){ //outro
		plane.css("top", "90%").removeClass("animatePlane");
		sceneFiveText.css({"transform": transformFunction(0, 0, 0), "opacity": "0"});
		skyBackground.css("opacity", "0");
	}
	function sceneFiveEnd(){ //outro
		plane.css("top", "0px").addClass("animatePlane");
		sceneFiveText.css({"transform": transformFunction(0, 0, 0), "opacity": "1"});
	}

	//call start/end resets
	function sceneOneReset(){
		titleStart();
		sceneTwoStart();
		sceneThreeStart();
		sceneFourStart();
		sceneFiveStart();
		//
		isSceneTwoReset 	= false;
		isSceneThreeReset 	= false;
		isSceneFourReset 	= false;
		isSceneFiveReset 	= false;
		isSceneSixReset 	= false;
		//
		isSceneOneReset = true;
	}
	function sceneTwoReset(){
		//title + scene one animating
		sceneTwoStart();
		sceneThreeStart();
		sceneFourStart();
		sceneFiveStart();
		//
		isSceneOneReset 	= false;
		isSceneThreeReset 	= false;
		isSceneFourReset 	= false;
		isSceneFiveReset 	= false;
		isSceneSixReset 	= false;
		//
		isSceneTwoReset = true;
	}
	function sceneThreeReset(){
		titleEnd();
		sceneOneEnd();
		//scene two animating
		sceneThreeStart();
		sceneFourStart();
		sceneFiveStart();
		//
		isSceneOneReset 	= false;
		isSceneTwoReset 	= false;
		isSceneFourReset 	= false;
		isSceneFiveReset 	= false;
		isSceneSixReset 	= false;
		//
		isSceneThreeReset = true;
	}
	function sceneFourReset(){
		titleEnd();
		sceneOneEnd();
		sceneTwoEnd();
		//scene three animating
		sceneFourStart();
		sceneFiveStart();
		//
		isSceneOneReset 	= false;
		isSceneTwoReset 	= false;
		isSceneThreeReset 	= false;
		isSceneFiveReset 	= false;
		isSceneSixReset 	= false;
		//
		isSceneFourReset = true;
	}
	function sceneFiveReset(){
		titleEnd();
		sceneOneEnd();
		sceneTwoEnd();
		sceneThreeEnd();
		//scene four animating
		sceneFiveStart();
		//
		isSceneOneReset 	= false;
		isSceneTwoReset 	= false;
		isSceneThreeReset 	= false;
		isSceneFourReset 	= false;
		isSceneSixReset 	= false;
		//
		isSceneFiveReset = true;
	}
	function sceneSixReset(){
		titleEnd();
		sceneOneEnd();
		sceneTwoEnd();
		sceneThreeEnd();
		sceneFourEnd();
		//scene five animating
		//
		isSceneOneReset 	= false;
		isSceneTwoReset 	= false;
		isSceneThreeReset 	= false;
		isSceneFourReset 	= false;
		isSceneFiveReset 	= false;
		//
		isSceneSixReset = true;
	}

	function scrollAnimation(){
		//scroll position
		var scrolled 	= window.pageYOffset;
		if (lastPosition === scrolled) {
			//don't recalculate if not scrolling
			scrolling( scrollAnimation );
			return false;
		} else {
			//update last position when scrolling
			lastPosition = scrolled;
			scrolling( scrollAnimation );

			  //==========================//
			 // animation set one
			//==========================//
			if (scrolled <= 0){
				if (!isSceneOneReset){
					sceneOneReset();
				}
			} else if (scrolled <= titleScroll){
				var compensation		= ((scrolled / titleScroll) * scrollSnap), //to compensate for height of sections that aren't 100% tall
					titleSlideDown  	= (scrolled * -0.25).toFixed(2),
					titleFadeOut		= (((browserHeight * 0.65) - scrolled) / (browserHeight * 0.65)).toFixed(2),
					cloudsFadeOut  		= ((browserHeight - scrolled) / browserHeight).toFixed(2),
					skyscraperYParallax	= (-scrolled - compensation).toFixed(2),
					streetScroll		= ((titleScroll * -0.1 ) + ((scrolled) * -0.9) - compensation).toFixed(2);
				title.css({'transform': transformFunction(0, titleSlideDown, 0), 'opacity': titleFadeOut});
				cloudsInner.css('opacity', cloudsFadeOut);
				skyscrapers.css('transform', transformFunction(0, skyscraperYParallax, 0));
				street.css('transform', transformFunction(0, streetScroll, 0));
				sceneOneText.css('opacity', '0');
				//reset
				if (!isSceneTwoReset){
					sceneTwoReset();
				}
			} else if(scrolled >= browserHeight && scrolled <= sectionTwoScroll){
				//scene two transition in
				var sceneTwoCalc		= ((scrolled - browserHeight) / browserHeight),
					sceneThreeTranslate = ((sceneTwoCalc * (browserHeight * -0.3)) + (browserHeight * 0.3)).toFixed(4),
					coffeeSlideIn1		= (sceneTwoCalc * (browserHeight * -0.45)).toFixed(2),
					coffeeSlideIn2		= (sceneTwoCalc * (browserWidth * 0.2)).toFixed(2),
					stickySlideIn1  	= (sceneTwoCalc * (browserHeight * 0.45)).toFixed(2),
					stickySlideIn2		= (sceneTwoCalc * (browserWidth * 0.15)).toFixed(2),
					marker1SlideIn		= (sceneTwoCalc * (browserHeight * 0.5)).toFixed(2),
					sceneTwoTextSlideIn	= (sceneTwoCalc * -480).toFixed(2);
				coffee.css('transform', transformFunction(coffeeSlideIn2, coffeeSlideIn1, 0));
				stickyNotes.css('transform', transformFunction(stickySlideIn2, stickySlideIn1, 0));
				marker1.css('transform', transformFunction(coffeeSlideIn2, marker1SlideIn, 0)); 
				sceneTwoText.css('transform', transformFunction(sceneTwoTextSlideIn, 0, 0) + 'rotate(' + (sceneTwoCalc * -2) +'deg)');
				backpage1.css('transform', transformFunction((sceneTwoCalc * -24), 0, 0) + 'rotate(' + (sceneTwoCalc * -3) +'deg)');
				backpage2.css('transform', transformFunction((sceneTwoCalc * -32), 0, 0) + 'rotate(' + (sceneTwoCalc * -12) +'deg)');
				marker2.css('transform', transformFunction((sceneTwoCalc * -64), (sceneTwoCalc * 72), 0) + 'rotate(' + (sceneTwoCalc * -13) +'deg)');
				//
				sceneThree.css('transform', transformFunction(0, sceneThreeTranslate, 0) + 'rotate(-50deg) scale(0.3)');
				//reset
				if (!isSceneThreeReset){
					sceneThreeReset();
				}
			} else if(scrolled >= sectionTwoScroll && scrolled <= sectionThreeScroll){
				//scene three transition in
				var sceneThreeCalc		= ((scrolled - sectionTwoScroll) / browserHeight),
					sceneThreeEnlarge	= ((sceneThreeCalc * 0.7) + 0.3).toFixed(4),
					sceneThreeRight		= (sceneThreeCalc * (browserWidth * 0.25)).toFixed(2),
					sceneThreeRotate 	= ((sceneThreeCalc * 50) - 50).toFixed(2),
					sceneThreeSlideUp 	= (sceneThreeCalc * (browserHeight * -0.7)).toFixed(2);
				sceneThree.css('transform', transformFunction(sceneThreeRight, sceneThreeSlideUp, 0) + 'rotate(' + sceneThreeRotate + 'deg) scale(' + sceneThreeEnlarge + ')');
				//reset
				if (!isSceneFourReset){
					sceneFourReset();
				}
			} else if(scrolled >= sectionThreeScroll && scrolled <= sectionFourScroll){
				var sceneFourCalc		= ((scrolled - sectionThreeScroll) / browserHeight),
					moonSlideOut 		= (sceneFourCalc * (browserWidth * 0.05)).toFixed(2),
					statueSlideOut		= (sceneFourCalc * (browserWidth * -0.1)).toFixed(2),
					boatSlideOut		= (sceneFourCalc * (browserWidth * -0.15)).toFixed(2),
					sceneThreeSlideOut 	= (sceneFourCalc * (browserWidth * -0.2)).toFixed(2),
					taxiSmallSlideIn	= (sceneFourCalc * (browserWidth * -0.6)).toFixed(2),
					radioCitySlideIn	= (sceneFourCalc * (browserWidth * -1)).toFixed(2),
					taxiLargeSlideIn	= (sceneFourCalc * (browserWidth * -1.15)).toFixed(2);
				moon.css('transform', transformFunction(moonSlideOut, 0, 0));
				statue.css('transform', transformFunction(statueSlideOut, 0, 0));
				boat.css('transform', transformFunction(boatSlideOut, 0, 0));
				sceneThreeText.css('transform', transformFunction(sceneThreeSlideOut, 0, 0));
				sceneThreeImage.css('transform', transformFunction(sceneThreeSlideOut, 0, 0)); 
				taxiSmall.css('transform', transformFunction(taxiSmallSlideIn, 0, 0)); 
				radioCity.css('transform', transformFunction(radioCitySlideIn, 0, 0)); 
				radioCityRight.show();
				taxiLarge.css('transform', transformFunction(taxiLargeSlideIn, 0, 0));
				sceneFive.hide();
				//scene four transition in
			 	if (!isSceneFiveReset){
					sceneFiveReset();
				}
			} else if(scrolled >= sectionFourScroll && scrolled <= sectionFourHalfScroll){
				var sceneFiveCalc		= ((scrolled - sectionFourScroll) / (browserHeight * 0.6)).toFixed(2);
				skyBackground.css("opacity", sceneFiveCalc);
				plane.addClass("animatePlane");
				sceneFive.show();
				if (!isSceneSixReset){
					sceneSixReset();
				}
			} else if(scrolled >= sectionFourHalfScroll && scrolled <= sectionFiveScroll){
				var sceneFiveTwoCalc	= ((scrolled - (sectionFourScroll + (browserHeight * 0.6))) / (browserHeight * 0.4)),
					planeSlideIn		= ((sceneFiveTwoCalc * -90) + 90).toFixed(2);
				plane.css("top", planeSlideIn + "%");
				plane.addClass("animatePlane");
				skyBackground.css("opacity", "1");
			}

			  //==========================//
			 // animation set Two
			//==========================//
			if (scrolled >= secondaryAnimationOne && scrolled <= browserHeight){//text box 1 in
				var sceneOneTextFadeIn	= ((scrolled - titleScroll) / scrollSnap),
					sceneOneTextSlideIn = (-((scrolled - titleScroll) - scrollSnap)).toFixed(2);
				sceneOneText.css({	'transform': transformFunction(sceneOneTextSlideIn, 0, 0), 'opacity': sceneOneTextFadeIn});
			} else if(scrolled === browserHeight){
				sceneOneText.css('opacity', '1');
			} else if (scrolled >= browserHeight && scrolled <= secondaryAnimationTwo){
				var bgCalc 		= ((scrolled - browserHeight) / (browserHeight * 0.4)),
					deskSlideIn = (bgCalc * -browserHeight).toFixed(4),
					sceneOneHide= ((-bgCalc * 0.06) + 1).toFixed(4);
				woodDesk.css('transform', transformFunction(0, deskSlideIn, 0));
				sceneOne.css('transform', "scale(" + sceneOneHide + ")");
			} else if (scrolled >= secondaryAnimationTwo && scrolled <= secondaryAnimationThree) {
				woodDesk.css('transform', transformFunction(0, -browserHeight, 0));
			} else if (scrolled >= secondaryAnimationThree && scrolled <= secondaryAnimationFour){
				woodDesk.css('transform', transformFunction(0, -browserHeight, 0));
				if (!lazyLinePainted){
					$('#ideo').lazylinepainter({
					    "svgData": pathObj,
					    "strokeWidth": 8,
					    'onComplete': $('#ideo').css({"transform" : "scale(" + ((browserHeight * 0.45) / 486) + ")",
					    							  "transform-origin" : "top left"}),
					    "strokeColor": "#59534f"
					}).lazylinepainter('paint'); 
					lazyLinePainted = true;
				}
			} else if (scrolled >= secondaryAnimationFour && scrolled <= secondaryAnimationFive){
				sceneThreeStart();
			} else if (scrolled >= secondaryAnimationFive && scrolled <= sectionThreeScroll){ 
				var flipCalculation	= ((scrolled - sectionThreeScroll + scrollSnap) / scrollSnap),
					sceneThreeAppear= ((flipCalculation * -90) + 90).toFixed(2),
					flashFadeIn		= ((flipCalculation * -1) + 1).toFixed(2);
				sceneThreeImage.css("transform", "rotateY(" + sceneThreeAppear + "deg)");
				screenFlash.css({"transform": "rotateY(" + sceneThreeAppear + "deg)", "opacity": flashFadeIn});
			} else if (scrolled >= secondaryAnimationSix && scrolled <= sectionFiveScroll){
				var sceneFiveTextFadeIn	= ((scrolled - (sectionFourScroll + (browserHeight * 0.4))) / (browserHeight * 0.6)).toFixed(2),
					sceneFiveTextSlideIn= ((sceneFiveTextFadeIn * 150) - 150).toFixed(2);
				sceneFiveText.css({"transform": transformFunction(0, sceneFiveTextSlideIn, 0), "opacity": sceneFiveTextFadeIn});
			}
	    }
	}

	// Call the loop to execute parallax
	scrollAnimation();

	  //==========================//
	 // Plugins
	//===========================//
	$(document).scrollsnap({
	    snaps: '.scrollsnap',
	    proximity: scrollSnap,
	    duration: 400
	});
});

  //==========================//
 // Misc Functions
//===========================//
$(document).ready(function(){
	//close nav on click outside of it
	$('html').click(function() {
		$(".showNav, nav").removeClass("slideout");
	});
	//nav toggle button
	$('.showNav').click(function(e){
	    e.stopPropagation();
	    $(".showNav, nav").toggleClass("slideout");
	});
	//avoid nav + children propagation so click outside to close works properly
	$('nav').click(function(e){
	    e.stopPropagation();
	});

	//scroll to sections from nav links
	$.easing.myEasing = function (x, t, b, c, d) {
	    return c*((t=t/d-1)*t*t + 1) + b;
	};
	$("nav li").click(function(){
		var viewport 		= $("html, body"),
			index 			= $(this).index(),
			scrollTo 		= $(window).height() * index;

		//stop scroll if user scroll themselves
		viewport.on("scroll mousedown DOMMouseScroll mousewheel", function(e){
		    if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
		        viewport.stop().off('scroll mousedown DOMMouseScroll mousewheel keyup');
		    }
		});

		//scroll to that position and unbind when done
		viewport.stop().animate({ scrollTop: scrollTo }, 1600, 'myEasing');
		
		//close nav
		$(".showNav, nav").removeClass("slideout");
	});

	//scrolldown to next section
	function scrollDown(){
		var viewport 			= $("html, body"),
			scrollDistance 		= $(window).height(),
			scrolledPos			= $(window).scrollTop(),
			scrollDownRounded 	= Math.ceil((scrolledPos + 20) / scrollDistance) * scrollDistance;

		//stop scroll if user scroll themselves
		viewport.on("scroll mousedown DOMMouseScroll mousewheel", function(e){
		    if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
		        viewport.stop().off('scroll mousedown DOMMouseScroll mousewheel keyup');
		    }
		});

		//scroll to that position and unbind when done
		viewport.stop().animate({ scrollTop: scrollDownRounded }, 1600, 'myEasing');
	}

	//scrollup to prev section
	function scrollUp(){
		var viewport 			= $("html, body"),
			scrollDistance 		= $(window).height(),
			scrolledPos			= $(window).scrollTop(),
			scrollUpRounded 	= Math.floor((scrolledPos - 20) / scrollDistance) * scrollDistance;

		//stop scroll if user scroll themselves
		viewport.on("scroll mousedown DOMMouseScroll mousewheel", function(e){
		    if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
		        viewport.stop().off('scroll mousedown DOMMouseScroll mousewheel keyup');
		    }
		});

		//scroll to that position and unbind when done
		viewport.stop().animate({ scrollTop: scrollUpRounded }, 1600, 'myEasing');
	}

	//scroll to sections from next arrows on page
	$(".scrollNext").click(function(){
		scrollDown();
	});

	//arrow keys
	$(document).keyup(function(e) {
		var scrollDistance 		= $(window).height(),
			scrolledPos			= $(window).scrollTop(),
			viewport 			= $("html, body");
      	if (e.keyCode === 40 || e.keyCode === 39) {  //down arrow
      		scrollDown();
      	} else if (e.keyCode === 38 || e.keyCode === 37){ //up arrow
      		scrollUp();
      	}
      	e.preventDefault(); //prevent scrolling
  	});

  	//allow scrolling on sceneFourText like pointer-events: none
  	$(".billboardTop, .billboardBottom").addEventListener('touchstart', function(e){
		e.preventDefault();
	});
});

