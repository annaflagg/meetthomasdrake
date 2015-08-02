$(window).on("load", setup);
var durations = [51, 165, 239, 189, 132]

var buttonClick = false;
var firstVid = 0;
var initialVolume = 1;
var thisPlayer = -1;
var interviewPlayer = -1;
var interviewPlayerReady = false;
var totalT = durations[firstVid];
var playing = false;
var fadeTime = 100;
var starting = true;
var vidid = 0;
var url = "ST-THOMASDRAKE-";



var urls = {0:"http://bc29.ajnm.me/fms/2848955552001/201507/3531/2848955552001_4390998439001_4390815645001.mp4", //new
1:"http://bc29.ajnm.me/fms/2848955552001/201507/2629/2848955552001_4390900751001_ac860e79-a6e5-4997-a969-d863d6979bd7-AWSAccessKeyId-AKIAJWBBMGHEBQ6SISMA-Expires-1438469517-Signature-tq2h7QIPxFKke-2Fgj7GdimJTfBfc-3D.mp4", //new
2:"http://bc29.ajnm.me/fms/2848955552001/201507/1987/2848955552001_4390970103001_4390753660001.mp4", //this is the new version
3:"http://bc29.ajnm.me/fms/2848955552001/201507/3285/2848955552001_4391012480001_4390754669001.mp4", //new
4:"http://bc29.ajnm.me/fms/2848955552001/201507/2419/2848955552001_4391034674001_2473a7fd-7308-4ada-b290-f293977be349-AWSAccessKeyId-AKIAJWBBMGHEBQ6SISMA-Expires-1438472123-Signature-O3Pv0VeXsmKFQICgzWB-2BDyR46FA-3D.mp4"}//new

var interactiveMode=false;
var vdoc = document, xaxis,
 	vg = vdoc.getElementById('vis')
    vw = vg.clientWidth,
    vh = vg.clientHeight;

var interactiveNavRatio = 1;
var interactiveNavSize;
var hasStarted = false;

var navContent = {0:"INTRO", 1:"9/11: A GIFT TO THE NSA", 2:"THE CHAIN OF COMMAND",
3:"OBAMA'S WAR ON WHISTLEBLOWERS", 4:"NOTHING TO HIDE"}
var navtimeout1 = ""


function isSafari() {
var ua = navigator.userAgent.toLowerCase(); 
  if (ua.indexOf('safari') != -1) { 
    if (ua.indexOf('chrome') == -1) {
      return true
    } 
  }
  return false;
}

function isFirefox() {
if (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6){//Firefox
	
	return true;
	}
return false;
}

function resizeNavs(dur) {
	vw = vg.clientWidth;
	var navw = .23
	if (interactiveMode) {
		showPlay();
		$(".navdiv").removeClass("clickable");
		$(".navdiv").addClass("noclick");
		
		d3.selectAll(".nav").each(function(d, i) {
			this.innerHTML = "";
		}).style("display", "none");
		$(".progresscontent").addClass("nodisplay");
		
		$(".pausediv").addClass("interactivepausediv");
		d3.select(".pauseicondiv").style("min-width", ((.5*(1-(4*navw))*vw)+5)+"px")
		$(".pauseicondiv").addClass("two");
		
		$(".pauseicondiv").removeClass("twelve");
		$(".pauseicondiv").addClass("textalignright");
		$(".pauseicondiv").removeClass("textaligncenter");
		
		$(".playpauseicon").removeClass("bigicon");

		navtimeout1 = setTimeout(function() {$(".continuevideo").removeClass("nodisplay");}, 1000);
		

		d3.selectAll(".pausediv")
			.transition().duration(dur).style("width",(vw*interactiveNavRatio)+"px")
		interactiveNavSize = ((vw*(1-interactiveNavRatio))/5.0);
		d3.selectAll(".navdiv")
			.transition()
			.duration(dur)
			.style("width",interactiveNavSize+"px")

		d3.select(".continueprompt").style("display", "inline")

	} else {
		
		$(".navdiv").addClass("clickable");
		$(".navdiv").removeClass("noclick");
		$(".progresscontent").removeClass("nodisplay");
		
		d3.select(".pauseicondiv").style("max-width", (2*((.13333333)*((vw*interactiveNavRatio)-50)))+"px")
		
		$(".pausediv").removeClass("interactivepausediv");
		$(".pauseicondiv").removeClass("two");
		$(".pauseicondiv").addClass("twelve");
		$(".pauseicondiv").addClass("textaligncenter");
		$(".pauseicondiv").removeClass("textalignright");
		$(".continuevideo").addClass("nodisplay");
		$(".pausedivdesc").addClass("nodisplay");		

		d3.selectAll(".navdiv")
			.transition()
			.duration(dur)
			.style("width", function(d, i) {
			if (i==0) {
				return (.6*(navw*vw))+"px";
			} else if (i==3) {
				return 1.4*(navw*vw)+"px";
			} else {
				return (navw*vw)+"px";
			}
			})
			
		d3.selectAll(".pausediv")
			.transition()
			.duration(dur).style("width",function(d, i) {
				return ((1-(4*navw))*vw)+"px";
			})
			.each("end", function() {
				$(".playpauseicon").addClass("bigicon");
				if (hasStarted) {
					showPause();
				}
				d3.selectAll(".nav").style("display", "block").each(function(d, i) {
					this.innerHTML = navContent[i] + "<span class='navtime'>"+formatTime(durations[i]);+"</span>";
				});
			});
	}
}

function showAbout(dur) {
	if (!(thisPlayer==-1)) {
		clearTimeout(vidtimeout1);
		clearTimeout(vidtimeout2);
		d3.select('.about').style("opacity", 0);
		$('.about').removeClass("nodisplay");
		
		d3.select('.about').transition().duration(dur).style("opacity", 1);
		
		
		$('.content').addClass("nodisplay");
		thisPlayer.pause();
		clearTimeout(safariTimeout);
	}
}
function hideAbout() {
	d3.select('.about').transition();
	$('.about').addClass("nodisplay");
	$('.content').removeClass("nodisplay");
	$('.end').addClass("nodisplay");
	if (interviewPlayerReady) {
		interviewPlayer.pause();
	}
}

function showESImage() {
	$('.esimage').css({opacity: 1});
}

function hideES() {
	$('.esdiv').css({display: "none"});
}
var h = "";
function setup() {
	if (window.location.hash) {
		h = window.location.hash.substring(1);

	}

	$(window).on('resize', resize); 
	videojs("#extendedinterview_html5_api").ready(function(){
		interviewPlayer = this;
		interviewPlayerReady = true;
	});

	videojs("#video_html5_api").ready(function(){
  			thisPlayer = this;
			thisPlayer.volume(initialVolume);
			$(".round-button").removeClass("nodisplay");
			thisPlayer.on("ended", function(){ 
				if (vidid==0) {
					showMainTitles();
				} else if (vidid<4) {
					clickVideo(vidid+1, -1);
				} else {
					showAbout(3000);
				}
			});
			
			if (h=="budget") {
				clickVideo(1, 0);
				h="";
			} else if (h=="agencies") {
				clickVideo(1, 1);
				h="";
			} else if (h=="timeline") {
				clickVideo(2, 0);
				h="";
			} else if (h=="whistleblowers") {
				clickVideo(3, 0);
				h="";
			} 
			
			
			
		});
	resizeVideo('.videoWrapper', '#video_html5_api', '.timelinebackgroundimageclass', '.introimageclass', '.blurimage', '.esimage');
	setTimeout(function() {resizeVideo('.videoWrapper', '#video_html5_api', '.timelinebackgroundimageclass', '.introimageclass', '.blurimage', '.esimage');}, 1000);
	showESImage();
	resizeNavs(0);
	$(document).ready(function(){ $( document ).on( 'keydown', function ( e ) {     
			if ( e.keyCode === 32 ){     
				e.preventDefault();  
				togglePlay();
			} 
		}); 
	}); 
	($(".progress")).on("click", function(e) {
			e.preventDefault();
			clickProgressbar(e);
	});
	($(".progress")).on("mousemove", function(e) {
			e.preventDefault();
			mouseoverProgressbar(e);
	}).on("mouseout", function(e) {
			e.preventDefault();
			mouseoutProgressbar(e);
	});
		setInterval(updatePage, 10);
		
}


function mouseoverProgressbar(e) {
	var mousex = e.pageX;//Math.max(0, Math.min((e.pageX)/($(window).width()), 1));
	$(".videoprogresshoverbar").css({ width:  mousex});
}
function mouseoutProgressbar(e) {
	$(".videoprogresshoverbar").css({ width:  0});
}

var parentHeight, parentWidth;

function resize() {
	resizeVideo('.videoWrapper', '#video_html5_api', '.timelinebackgroundimageclass', '.introimageclass', '.blurimage', '.esimage')
	resizeNavs(0);
}

var moveLeft = 0;
function resizeVideo(parent, video, image, introimage, blurimage, esimage) {
	var $parent = $(parent);
    var $video = $(video);
    var $image = $(image);
    var $introimage = $(introimage);
    var $blurimage = $(blurimage);
    var $esimage = $(esimage);
    parentHeight = $parent.height()
    parentWidth = $parent.width()
    var ratio = 1.777778;
    var newHeight, newWidth;
    if (parentWidth<(parentHeight*(ratio))) {
    	newWidth = (parentHeight*ratio);
    	newHeight = parentHeight;
    	$video.css({ width:  newWidth})
    	$video.css({ height: parentHeight })
    	$image.css({ width:  newWidth})
    	$image.css({ height: parentHeight })
    	$introimage.css({ width:  newWidth})
    	$introimage.css({ height: parentHeight })
    	$blurimage.css({ width:  newWidth})
    	$blurimage.css({ height: parentHeight })
    	$esimage.css({ width:  newWidth})
    	$esimage.css({ height: parentHeight })	 
    } else {
    	newHeight = parentWidth/ratio;
    	newWidth = parentWidth;
    	$video.css({ width: parentWidth });
    	$video.css({ height: newHeight });
    	$image.css({ width: parentWidth });
    	$image.css({ height: newHeight });
    	$introimage.css({ width: parentWidth });
    	$introimage.css({ height: newHeight });
    	$blurimage.css({ width: parentWidth });
    	$blurimage.css({ height: newHeight });
    	$esimage.css({ width: parentWidth });
    	$esimage.css({ height: newHeight });
    	
    }
    $video.css({ "margin-left": (((parentWidth-newWidth)/2)-moveLeft) })
    $video.css({ "margin-top": 0 })
    $image.css({ "margin-left": ((parentWidth-newWidth)/2) })
    $image.css({ "margin-top": 0 })
    $introimage.css({ "margin-left": ((parentWidth-newWidth)/2) })
    $introimage.css({ "margin-top": 0 })
    $blurimage.css({ "margin-left": ((parentWidth-newWidth)/2) })
    $blurimage.css({ "margin-top": 0 })
    $esimage.css({ "margin-left": ((parentWidth-newWidth)/2) })
    $esimage.css({ "margin-top": 0 })
	
}



function updatePage() {
	if (playing) {
		var currT = thisPlayer.currentTime();
		var p = Math.min((currT/totalT)*100, 100);
		($(".videoprogressbar")).css({ width: p+"%" })
		formattedTime = formatTime(currT);
		document.getElementById("currtimeid").innerHTML = formattedTime;

	}
}

function formatTime(t) {
	t = parseInt((t.toString()).split("."));
	var seconds = t%60;
	var minutes = parseInt(t/60)
	if (seconds<10) {
		return minutes+":0"+seconds;
	}
	return minutes+":"+seconds;
}
var cancelVolumeFade = false;
function togglePlay() {
	if (!hasStarted) {
	hasStarted = true;
	clickVideo(vidid, -1)
	} else {
		if (interactiveMode) {
			cancelVolumeFade = true;
			clearTimeout(navtimeout1)
			setTimeout(function() {cancelVolumeFade = false;}, 500);
   			endInteractiveMode(0);

   		} else {
			if (thisPlayer.paused()) {
				thisPlayer.play();
				 showPause();
			} else {
				thisPlayer.pause();
				 showPlay();
			}
		}
	}
		updateNav(vidid);

		
}

function showPause() {
		$(".playpauseicon")[0].innerHTML = "&#10074;&#10074;"
}

function showPlay() {
	$(".playpauseicon")[0].innerHTML = "&#9658;"
}

function start(vidtoplay) {
	if (thisPlayer==-1) {
		return;
	}
	starting = true;
	hasStarted=false;
	clearTimeout(safariTimeout);
//	console.log("starting")
	$(".introimagediv").addClass("nodisplay");
	
	hideES();
	clickVideo(vidtoplay, -1);
}




var vidtitledur = 0;
var vidtitleduroffset = 0;
var vidtimeout1 = "";
var vidtimeout2 = "";
var safariTimeout = "";
function clickVideo(i, visnum) {
	if (thisPlayer==-1) {
		return;
	}
	hideES();
	hideAbout();
	clearTimeout(safariTimeout);

	resizeVideo('.videoWrapper', '#video_html5_api', '.timelinebackgroundimageclass', '.introimageclass', '.blurimage', '.esimage')
	playing = true;
	hasStarted=true;
	vidid = i;
	
	if (starting) {
		starting = false;
	} else {
		 cancel();
	}
	
	if (vidid==0) {
		//$(".navcontainer").addClass("nodisplay");
	} else {
		$(".navcontainer").removeClass("nodisplay");
	}
	$('.replay').addClass("nodisplay");
	hideMainTitles();
	thisPlayer.currentTime(0);
	totalT = durations[vidid];
	document.getElementById("totaltimeid").innerHTML = formatTime(totalT);
	updateNav(vidid);
   	thisPlayer.src({"type":"video/mp4", "src":urls[vidid]});//"img/"+url+vidid+".mp4"});
   	
   	if ((!(vidid==0))&&(visnum==-1)) {
	
		thisPlayer.volume(0)

		showChapterTitle();
		vidtitledur = 2500;
		vidtitleduroffset = 1000;
	 } else {
	 	vidtitledur = 0;
	 	vidtitleduroffset = 0;
	 	
		d3.selectAll(".chaptertitle").transition();
		d3.selectAll(".chaptersubtitle").transition();
		clearTimeout(vidtimeout1);
		clearTimeout(vidtimeout2);
		hideChapterTitle(0);
	 }
	

    
    vidtimeout1 = setTimeout(function() {
    	if ((!(vidid==0))&&(visnum==-1)) {
    		hideChapterTitle(1000);
    	}
    	vidtimeout2 = setTimeout(function() {

			showPause(); 
			thisPlayer.volume(1);
			
			if (visnum==-1) {
				thisPlayer.currentTime(0);
				thisPlayer.play();
			} else {
			
				if (isSafari()) {
					thisPlayer.pause();
					safariTimeout = setTimeout(function() {
						thisPlayer.currentTime(interactivesTimes[vidid+"-"+visnum]);
						thisPlayer.play();
						console.log(4000)
						}, 4000);
					
				} else {
					thisPlayer.currentTime(interactivesTimes[vidid+"-"+visnum]);
					thisPlayer.play();
				}
			}
		
		   if (interactiveMode) {
				cancelVolumeFade = true;
				endInteractiveMode(0);
				setTimeout(function() {cancelVolumeFade = false;}, 500);
		   }
		}, vidtitleduroffset);
	}, vidtitledur);

   
}

function endPage() {
	hasStarted = false;
	$('.end').removeClass("nodisplay");
	thisPlayer.currentTime(0);
	thisPlayer.pause();
	deselectAllNav();
	showPlay();
	vidid = 0;
	
}


function showMainTitles() {
	$(".titlestuff").removeClass("nodisplay");
	$(".navcontainer").addClass("nodisplay");
	var showim = "showElement('.introimageclass', 1000, 0, '')";
	var showsub = 'showElement(".mainsubtitle", 1000, 0, "")'   
	showElement(".meet", 500, 0, "showElement('.maintitle', 1000, 0, '"+showsub+"')")
	setTimeout(function() {
		showElement('.introimageclass', 1000, 0, '');
		d3.select('.playbutton').style("display", "block")
		showElement('.playbutton', 1000, 0, "");
		showElement('.credits', 1000, 0, "");
	}, 3000)
	$('.progresselement').addClass("nodisplay");
}

function showElement(e, dur, delay, callback) {
	d3.select(e).transition().duration(dur).delay(delay)
		.style("opacity", 1)
		.each("end", function() {
			eval(callback);
		});
}

function hideElement(e, dur, delay, callback) {
	d3.select(e).transition().duration(dur).delay(delay)
		.style("opacity", 0)
		.each("end", function() {
			eval(callback);
		});
}

function hideMainTitles() {
	$(".introimagediv").addClass("nodisplay");
	$(".navcontainer").removeClass("nodisplay");
	d3.select(".introimageclass").style("opacity", 0);
	d3.select(".meet").style("opacity", 0);
	d3.select(".maintitle").style("opacity", 0);
	d3.select(".mainsubtitle").style("opacity", 0);
	d3.select('.playbutton').style("display", "none")
	d3.select(".playbutton").style("opacity", 0);
	d3.select(".credits").style("opacity", 0);
	$('.progresselement').removeClass("nodisplay");
}


var chaptertitles = ["", "9/11: A GIFT TO THE NSA", "THE CHAIN OF COMMAND", "OBAMA'S WAR ON WHISTLEBLOWERS", "NOTHING TO HIDE"]

function showChapterTitle() {
	
	$(".chaptersubtitle")[0].innerHTML = formatTime(durations[vidid]); //chaptersubtitles[vidid];
	$(".chaptertitle")[0].innerHTML = chaptertitles[vidid];
	
	if (!(vidid==0)) {
		$(".blackbackground").css({opacity: 1});
		d3.selectAll(".chaptertitle").transition().delay(100).duration(800).style("opacity", 1);
		d3.selectAll(".chaptersubtitle").transition().delay(100).duration(800).style("opacity", 1);
	}
}

function hideChapterTitle(dur) {

	d3.selectAll(".chaptersubtitle").transition().duration(dur).style("opacity", 0)
	d3.selectAll(".chaptertitle").transition().duration(dur).style("opacity", 0).each("end", function() {
		d3.selectAll(".blackbackground").transition().duration(dur/2.0).style("opacity", 0);
		
	});
	
}


function updateNav(i) {
   $(".nav").removeClass("highlightednav");
   $(".nav"+i).addClass("highlightednav");
   $(".navdiv").removeClass("highlightednavdiv");
    $(".nav"+i+"div").addClass("highlightednavdiv");
}

function deselectAllNav() {
	 $(".nav").removeClass("highlightednav");
	  $(".navdiv").removeClass("highlightednavdiv");
}

function isMobile() {
	return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
}
