var w = window,
    d = document, xaxis,
    e = d.documentElement,
    g = d.getElementById('vis')
    w = g.clientWidth,
    h = g.clientHeight;
	
// VIS 0 parameters
var vis0xmargin = 100,//w/2, 
    vis0x1=0, 
    vis0x2=w-vis0xmargin,
    vis0y = .82*h,
    firstrun = true,
    axisduration = 400,
    axisdata = [1979, 1989, 2000, 2010, 2015],
    tickheight=5,
    hoveredticklabel = "",
	hovereddata = "";
var y1 = 2009.5;
var y2 = 2015;
var tooltipHasBeenShown = false;
var visyspace = 25;
var datayspace = 30;
var descyspace = 20;
var v4imyspace = 15;

window.onresize = updateWindow;

var svgall = d3.select("#vis").append("svg");
var cancelVis = false;
svgall.attr("id", "svg")
    .attr("width", w)
    .attr("height", h);
var svg = svgall
    .append("g")
var svgnarrative = svgall
    .append("g")
svg.attr("transform", "translate("+(-w/2)+", 0)");

var svg1 = svgall.append("g");
var svg2 = svgall.append("g");
var svg3 = svgall.append("g");
var svg4 = svgall.append("g");

var fadevolumefactor  = 0.01;
var fadevolumespeed   = 20;



var wvisoffset = 152;

var a3 = [
[wvisoffset+3.6, false, "overlay(true);showWhistleblowerData(0);highlightWhistleblower('Thomas Drake');", "", wvisoffset+8.5],
[wvisoffset+8.5, false, "overlay(true);showWhistleblowerData(1);highlightWhistleblower('Chelsea Manning');", "", wvisoffset+12.3],
[wvisoffset+12.3, false, "overlay(true);showWhistleblowerData(2);highlightWhistleblower('Stephen Kim');", "", wvisoffset+16.9],
[wvisoffset+16.9, false, "overlay(true);showWhistleblowerData(3);highlightWhistleblower('Jeffrey Sterling');", "", wvisoffset+20.4], 
[wvisoffset+20.4, false, "overlay(true);showWhistleblowerData(4);highlightWhistleblower('John Kiriakou');", "", wvisoffset+24.3],
[wvisoffset+24.3, false, "overlay(true);showWhistleblowerData(5);highlightWhistleblower('Edward Snowden');", "", wvisoffset+28],
[wvisoffset+28, false, "overlay(true);showWhistleblowerData(6);highlightWhistleblower('James Hitselberger');", "", wvisoffset+29],
[wvisoffset+29, false, "overlay(true);showWhistleblowerData(7);highlightWhistleblower('Shamai Leibowitz');", "", wvisoffset+30],
[wvisoffset+30, false, "overlay(true);showWhistleblowerData(8);highlightWhistleblower('');", "", wvisoffset+30.1],
[wvisoffset+30.1, false, "overlay(true);showWhistleblowerData(9);highlightWhistleblower('Lawrence Franklin');", "", wvisoffset+31.1],
[wvisoffset+31.1, false, "overlay(true);showWhistleblowerData(10);highlightWhistleblower('Samuel Morison');", "", wvisoffset+32.1],
[wvisoffset+32.1, false, "overlay(true);showWhistleblowerData(11);highlightWhistleblower('Daniel Ellsberg');", "", wvisoffset+33.1],
[wvisoffset+33.1, false, "overlay(true);showWhistleblowerTitles();highlightWhistleblower('');", "", wvisoffset+20037]//,
//[wvisoffset+37, false, "hideWhistleblowerVis();overlay(false);", "", wvisoffset+41]
];

// Parms for V4
var airforce = {"org":"AIR FORCE", "startyear":1979, "endyear": 1989.2, "y":0, 
"title":"U.S. AIR FORCE CREW MEMBER //FOR TEN YEARS", 
"role":"Signals Intelligence", 
"im":"careertimeline_airforce", 
"fullsizeim":"fullsize_AIRFORCE", "backgroundim":"airforce", 
"desc":"Signals Intelligence"};
var navy = {"org":"PENTAGON", "startyear":1992, "endyear": 1997,  "y":1, "title":"U.S. NAVAL INTELLIGENCE OFFICER FOR THE PENTAGON //FOR FIVE YEARS", 
"role":"Naval Intelligence Officer", 
"im":"careertimeline_navy", "fullsizeim":"fullsize_AIRFORCE", "backgroundim":"navy", 
"desc":"Naval Intelligence Officer"};
var cia = {"org":"CIA", "startyear":1989.3, "endyear": 1989.6,  "y":1, "title":"JOINED CIA //IN 1989", 
"role":"Imagery Analyst", 
"im":"careertimeline_cia", // ADD THIS ONE
"fullsizeim":"fullsize_AIRFORCE", "backgroundim":"cia", "desc":"Imagery Analyst"};
var nsacontract = {"org":"NSA CONTRACTOR", "startyear":1989.3, "endyear": 2001.7, "y":0, "title":"NSA CONTRACTOR //FOR TWELVE YEARS", 
"role":"Intelligence Contractor", 
"im":"careertimeline_nsacontract",  // ADD THIS ONE
"fullsizeim":"fullsize_AIRFORCE", "backgroundim":"nsacontract", "desc":"Intelligence Contractor"};
var nsa = {"org":"NSA SENIOR OFFICIAL", "startyear":2001.8, "endyear": 2008, "y":0, "title":"PROMOTED TO NSA SENIOR EXECUTIVE //IN 2001", 
"role":"Senior Executive", 
"im":"careertimeline_nsa", 
"fullsizeim":"fullsize_AIRFORCE", // ADD THIS ONE
"backgroundim":"nsa", "desc":"Senior Executive"};

var whistleblowing = {"org":"BLEW THE WHISTLE", "startyear":2006, "endyear": 2006.3, "y":1, "title":"IN 2005 //BLEW THE WHISTLE ON NSA ABUSE TO A REPORTER", "role":"", 
"im":"careertimeline_whistleblowing", 
"fullsizeim":"fullsize_AIRFORCE", "backgroundim":"", "desc":"Revealed NSA abuses to a reporter"};
//var whistleblowing = {"org":"BLEW THE WHISTLE", "startyear":2005, "endyear": 2005.3, "y":1, "title":"IN 2005 //BLEW THE WHISTLE ON NSA ABUSE", "role":"", "im":"timelineimages_AIRFORCE", "backgroundim":""};
//var espionage = {"org":"NSA", "startyear":2010, "endyear": 2010.3, "y":0, "title":"CHARGED WITH ESPIONAGE IN 2010//, ONE OF THE MOST SERIOUS CHARGES AN AMERICAN CAN FACE", "role":"", "im":"timelineimages_AIRFORCE", "backgroundim":""};

var espionage = {"org":"CHARGED", "startyear":2010, "endyear": 2010.3, "y":0, 
"title":"IN 2010, CHARGED BY THE OBAMA ADMINISTRATION //WITH ESPIONAGE", "role":"", 
"im":"careertimeline_espionage", 
"fullsizeim":"fullsize_AIRFORCE", "backgroundim":"", "desc":"Espionage Act Charge"};


var airforceachievementmedal = {"org":"", "startyear":1984, "endyear": 1984.2, "y":1, 
"title":"//", 
"role":"Air Force Achievement Medal", 
"im":"careertimeline_airforceachievementmedal", 
"fullsizeim":"fullsize_AIRFORCE", "backgroundim":"airforce", 
"desc":"Air Force Achievement Medal"};

var airmedal = {"org":"", "startyear":1985, "endyear": 1985.2, "y":1, 
"title":"//", 
"role":"The Air Medal", 
"im":"careertimeline_theairmedal", 
"fullsizeim":"fullsize_AIRFORCE", "backgroundim":"airforce", 
"desc":"The Air Medal"};

var meritorious = {"org":"", "startyear":1989, "endyear": 1989.2, "y":1, 
"title":"//", 
"role":"Meritorious Service Award", 
"im":"careertimeline_meritorious", 
"fullsizeim":"fullsize_AIRFORCE", "backgroundim":"airforce", 
"desc":"Meritorious Service Award"};

var v4datanone = [];
var v4data1 = [airforce];
var v4data2 = [airforce, nsacontract];
var v4data3 = [airforce, nsacontract, cia];
var v4data4 = [airforce, nsacontract, cia, navy];
var v4data5 = [airforce, nsacontract, cia, navy, nsa];
var v4data6 = [airforce, nsacontract, cia, navy, nsa, whistleblowing];
var v4data7 = [airforce, nsacontract, cia, navy, nsa, whistleblowing, espionage];

var v4data8 = [airforce, nsacontract, cia, navy, nsa, whistleblowing, airforceachievementmedal, airmedal, meritorious, espionage];


var v4data = v4datanone;

var a4timeoffset = 154.8;
var a4datastart = a4timeoffset+18;
var a4 = [
[a4timeoffset+11.3, false, "noInteractiveLabel(svg4);emptyTimelineBackgroundIm();unshowV4Axis();showTimelineBackgroundIm();showV4Titles()", "", a4datastart],//0
[a4datastart, false, "noInteractiveLabel(svg4);emptyTimelineBackgroundIm();showTimelineBackgroundImNoTransition();showV4Axis(2000, 1500);", "", a4datastart+2.5],//1
[a4datastart+2.5, false, "noInteractiveLabel(svg4);emptyTimelineBackgroundIm();showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();addTimelinePoint(v4data1, 1800, 3200);", "", a4datastart+13.5],//2
[a4datastart+13.5, false, "noInteractiveLabel(svg4);showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();unhighlightTimelinePoint(airforce)", "", a4datastart+14],//3
[a4datastart+14, false, "noInteractiveLabel(svg4);showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();addTimelinePoint(v4data2, 1800, 3200);", "", a4datastart+23.5],//4
[a4datastart+23.5, false, "noInteractiveLabel(svg4);showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();unhighlightTimelinePoint(nsacontract)", "", a4datastart+24],//5
[a4datastart+24, false, "noInteractiveLabel(svg4);showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();addTimelinePoint(v4data3, 1800, 1500)", "", a4datastart+28.5],//6
[a4datastart+28.5, false, "noInteractiveLabel(svg4);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();unhighlightTimelinePoint(cia)", "", a4datastart+29],//7
[a4datastart+29, false, "noInteractiveLabel(svg4);showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();addTimelinePoint(v4data4, 1800, 3200);", "", a4datastart+36.5],//8
[a4datastart+36.5, false, "noInteractiveLabel(svg4);showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();unhighlightTimelinePoint(navy)", "", a4datastart+37],//9
[a4datastart+37, false, "noInteractiveLabel(svg4);showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();addTimelinePoint(v4data5, 2500, 3200);", "", a4datastart+47.5],//10
[a4datastart+47.5, false, "noInteractiveLabel(svg4);showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();unhighlightTimelinePoint(nsa)", "", a4datastart+48],//11
[a4datastart+48, false, "noInteractiveLabel(svg4);showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();addTimelinePoint(v4data6, 2500, 3200);", "", a4datastart+57.5],//12
[a4datastart+57.5, false, "noInteractiveLabel(svg4);showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();unhighlightTimelinePoint(whistleblowing)", "", a4datastart+58],//13
[a4datastart+58, false, "noInteractiveLabel(svg4);showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();addTimelinePoint(v4data8, 2000, 3200);", "", a4datastart+63],//14
[a4datastart+63, false, "addInteractiveLabel(svg4);showV4Axis(0, 0);showTimelineBackgroundImNoTransition();showV4TitlesNoTransition();startInteractiveMode(fadevolumespeed);unhighlightTimelinePoint(espionage);", "", a4datastart+200000000000]//15
];

function noInteractiveLabel(svgvar) {
	svgvar.selectAll(".interactivelabel").text("")
}

function addInteractiveLabel(svgvar) {
	svgvar.selectAll(".interactivelabel").text("INTERACTIVE")
}

var a1p1offset = 23.5;
var a1p1baroffset = a1p1offset+1.9;
var a1p2offset = 73;
var a1bardur = .15;
var a1bardurslow = 1.2;
var a1bardurmedium = .5;
var a1p1baroffset2 = a1p1baroffset+a1bardur;
var a1p1baroffset3 = a1p1baroffset2+(10*a1bardur);
var a1p1baroffset4 = a1p1baroffset3+2*a1bardur;
var v1barchartshowing = false;

var dotdur1 = 400;
var dotdur2 = 900;
var dotgroupdelay = 2250;
var timebetweendotmoves = 1;
var a1 = [[a1p1offset, false, "hideTooltip(); prioritizeV1Part1(); overlay(false);hideV1Titles(0); startV1BarGraph();", "", a1p1offset+1.5],
[a1p1offset+1.5, false, "hideTooltip(); showV1Bars(1989, 300)", "", a1p1baroffset],
[a1p1baroffset, false, "hideTooltip(); showV1Bars(1990, (a1bardur*1000))", "", a1p1baroffset2],
[a1p1baroffset2, false, "hideTooltip(); showV1Bars(1991, (a1bardur*1000))", "", a1p1baroffset2+a1bardur],
[a1p1baroffset2+a1bardur, false, "hideTooltip(); showV1Bars(1992, (a1bardur*1000))", "", a1p1baroffset2+(2*a1bardur)],
[a1p1baroffset2+(2*a1bardur), false, "hideTooltip(); showV1Bars(1993, (a1bardur*1000))", "", a1p1baroffset2+(3*a1bardur)],
[a1p1baroffset2+(3*a1bardur), false, "hideTooltip(); showV1Bars(1994, (a1bardur*1000))", "", a1p1baroffset2+(4*a1bardur)],
[a1p1baroffset2+(4*a1bardur), false, "hideTooltip(); showV1Bars(1995, (a1bardur*1000))", "", a1p1baroffset2+(5*a1bardur)],
[a1p1baroffset2+(5*a1bardur), false, "hideTooltip(); showV1Bars(1996, (a1bardur*1000))", "", a1p1baroffset2+(6*a1bardur)],
[a1p1baroffset2+(6*a1bardur), false, "hideTooltip(); showV1Bars(1997, (a1bardur*1000))", "", a1p1baroffset2+(7*a1bardur)],
[a1p1baroffset2+(7*a1bardur), false, "hideTooltip(); showV1Bars(1998, (a1bardur*1000))", "", a1p1baroffset2+(8*a1bardur)],
[a1p1baroffset2+(8*a1bardur), false, "hideTooltip(); showV1Bars(1999, (a1bardur*1000))", "", a1p1baroffset2+(9*a1bardur)],
[a1p1baroffset2+(9*a1bardur), false, "hideTooltip(); showV1Bars(2000, (a1bardur*1000))", "", a1p1baroffset3],
[a1p1baroffset3, false, "hideTooltip(); showV1Bars(2001, (a1bardur*1000))", "", a1p1baroffset3+a1bardur],
[a1p1baroffset3+a1bardur, false, "hideTooltip(); showV1Bars(2002, (a1bardur*1000))", "", a1p1baroffset4],
[a1p1baroffset4, false, "hideTooltip(); showV1Bars(2003, (a1bardur*1000))", "", a1p1baroffset4+a1bardur],
[a1p1baroffset4+a1bardur, false, "hideTooltip(); showV1Bars(2004, (a1bardur*1000))", "", a1p1baroffset4+(2*a1bardur)],
[a1p1baroffset4+(2*a1bardur), false, "hideTooltip(); showV1Bars(2005, (a1bardur*1000))", "", a1p1baroffset4+(3*a1bardur)],
[a1p1baroffset4+(3*a1bardur), false, "hideTooltip(); showV1Bars(2006, (a1bardur*1000))", "", a1p1baroffset4+(4*a1bardur)],
[a1p1baroffset4+(4*a1bardur), false, "hideTooltip(); showV1Bars(2007, (a1bardur*1000))", "", a1p1baroffset4+(5*a1bardur)],
[a1p1baroffset4+(5*a1bardur), false, "hideTooltip(); showV1Bars(2008, (a1bardur*1000))", "", a1p1baroffset4+(6*a1bardur)],
[a1p1baroffset4+(6*a1bardur), false, "hideTooltip(); showV1Bars(2009, (a1bardur*1000))", "", a1p1baroffset4+(7*a1bardur)],
[a1p1baroffset4+(7*a1bardur), false, "hideTooltip(); showV1Bars(2010, (a1bardur*1000))", "", a1p1baroffset4+(8*a1bardur)],
[a1p1baroffset4+(8*a1bardur), false, "hideTooltip(); showV1Bars(2011, (a1bardur*1000))", "", a1p1baroffset4+(9*a1bardur)],
[a1p1baroffset4+(9*a1bardur), false, "hideTooltip(); showV1Bars(2012, (a1bardur*1000))", "", a1p1baroffset4+(10*a1bardur)],
[a1p1baroffset4+(10*a1bardur), false, "hideTooltip(); showV1Bars(2013, (a1bardur*1000))", "", a1p1baroffset4+(11*a1bardur)],
[a1p1baroffset4+(11*a1bardur), false, "hideTooltip(); showV1Bars(2014, (a1bardur*1000))", "", a1p1baroffset4+(12*a1bardur)],
[a1p1baroffset4+(12*a1bardur), false, "hideTooltip(); showV1Titles(1000); showV1Bars(2014, 0);", "", a1p1baroffset4+(12*a1bardur)+1],
[a1p1baroffset4+(12*a1bardur)+1, false, "showTooltip(); showV1Titles(0); showV1Bars(2014, 0); startInteractiveMode(fadevolumespeed)", "", a1p1baroffset4+(12*a1bardur)+4],
[a1p1baroffset4+(12*a1bardur)+4, false, "unshowV1Part2();overlay(false); hideV1BarGraph();", "", a1p1baroffset4+(12*a1bardur)+5],
[a1p2offset-3, false, "hideV1Part2Titles(0); overlayNoTransition(false); prioritizeV1Part2(); showV1Part2TitlesAndAxes()", "", a1p2offset],
[a1p2offset, false, "hideV1Part2Titles(0); overlayNoTransition(false); prioritizeV1Part2(); updateXLabels(1996); showV1Part2TitlesAndAxesNoTransition(); showDot('NSA', 0, dotdur1)", "", a1p2offset+timebetweendotmoves],
[a1p2offset+timebetweendotmoves, false, "hideV1Part2Titles(0); overlayNoTransition(false); updateXLabels(2004); showV1Part2TitlesAndAxesNoTransition(); updateDotsShown(['NSA'], 2004); moveDot('NSA', 1, dotdur2)", "", a1p2offset+(2*timebetweendotmoves)],
[a1p2offset+(2*timebetweendotmoves), false, "hideV1Part2Titles(0); overlayNoTransition(false); updateXLabels(2013);showV1Part2TitlesAndAxesNoTransition(); updateDotsShown(['NSA'], 2013); moveDot('NSA', 2, dotdur2)", "", a1p2offset+(3*timebetweendotmoves)],
[a1p2offset+(3*timebetweendotmoves), false, "hideV1Part2Titles(0); overlayNoTransition(false); updateXLabels(2014); showV1Part2TitlesAndAxesNoTransition(); updateDotsShown(['NSA'], 2014); showDot('CIA', 0, dotdur1);", "", a1p2offset+(4*timebetweendotmoves)],
[a1p2offset+(4*timebetweendotmoves), false, "hideV1Part2Titles(0); overlayNoTransition(false); updateXLabels(2014); showV1Part2TitlesAndAxesNoTransition(); updateDotGroupOrder(); updateDotsShown(['CIA', 'NSA'], 2004); moveDot('CIA', 1, dotdur2)", "", a1p2offset+(5*timebetweendotmoves)],
[a1p2offset+(5*timebetweendotmoves), false, "hideV1Part2Titles(0); overlayNoTransition(false); updateXLabels(2014); showV1Part2TitlesAndAxesNoTransition(); updateDotGroupOrder(); updateDotsShown(['CIA', 'NSA'], 2013); moveDot('CIA', 2, dotdur2)", "", a1p2offset+(6*timebetweendotmoves)],
[a1p2offset+(6*timebetweendotmoves), false, "hideV1Part2Titles(0); overlayNoTransition(false); updateXLabels(2014); showV1Part2TitlesAndAxesNoTransition(); updateDotGroupOrder(); updateDotsShown(['CIA', 'NSA'], 2014); showDot('NRO', 0, dotdur1);", "", a1p2offset+(7*timebetweendotmoves)],
[a1p2offset+(7*timebetweendotmoves), false, "hideV1Part2Titles(0); overlayNoTransition(false); updateXLabels(2014); showV1Part2TitlesAndAxesNoTransition(); updateDotGroupOrder(); updateDotsShown(['NRO', 'CIA', 'NSA'], 2004); moveDot('NRO', 1, dotdur2)", "", a1p2offset+(8*timebetweendotmoves)],
[a1p2offset+(8*timebetweendotmoves), false, "hideV1Part2Titles(0); overlay(true); updateXLabels(2014); showV1Part2TitlesAndAxesNoTransition(); updateDotGroupOrder(); updateDotsShown(['NRO', 'CIA', 'NSA'], 2014); moveDot('NRO', 2, dotdur2);", "", a1p2offset+(9*timebetweendotmoves)],
[a1p2offset+(9*timebetweendotmoves), false, "overlayNoTransition(true); showV1Part2Titles(); startInteractiveMode(fadevolumespeed); updateXLabels(2014); showV1Part2TitlesAndAxesNoTransition(); updateDotGroupOrder(); updateDotsShown(['NRO', 'CIA', 'NSA'], 2014);", "", 
a1p2offset+(9*timebetweendotmoves)+3],
[a1p2offset+(9*timebetweendotmoves)+3, false, "updateDotsShown(['NRO', 'CIA', 'NSA'], 2014); overlay(false); hideV1Part2();", "", a1p2offset+(9*timebetweendotmoves)+10]
];



var allanimations = [[], a1, a4, a3, []];
var timelinedur = 1000;

var noClickZones = [[], 
[[a1[0][0], a1[0][4]],[a1[1][0], a1[1][4]],[a1[2][0], a1[2][4]],[a1[3][0], a1[3][4]],[a1[4][0], a1[4][4]],[a1[5][0], a1[5][4]],[a1[6][0], a1[6][4]],[a1[7][0], a1[7][4]],[a1[8][0], a1[8][4]],[a1[9][0], a1[9][4]],[a1[10][0], a1[10][4]],[a1[11][0], a1[11][4]],[a1[12][0], a1[12][4]],[a1[13][0], a1[13][4]],[a1[14][0], a1[14][4]],[a1[15][0], a1[15][4]],[a1[16][0], a1[16][4]],[a1[17][0], a1[17][4]],[a1[18][0], a1[18][4]],[a1[19][0], a1[19][4]],[a1[20][0], a1[20][4]],[a1[21][0], a1[21][4]],[a1[22][0], a1[22][4]],[a1[23][0], a1[23][4]],[a1[24][0], a1[24][4]],[a1[25][0], a1[25][4]],[a1[26][0], a1[26][4]],[a1[27][0], a1[27][4]],[a1[28][0], a1[28][4]],[a1[29][0], a1[29][4]],[a1[30][0], a1[30][4]],
[a1[31][0], a1[31][4]],[a1[32][0], a1[32][4]],[a1[33][0], a1[33][4]],[a1[34][0], a1[34][4]],[a1[35][0], a1[35][4]],[a1[36][0], a1[36][4]],[a1[37][0], a1[37][4]],[a1[38][0], a1[38][4]],[a1[39][0], a1[39][4]],[a1[40][0], a1[40][4]],[a1[41][0], a1[41][4]]],
[[a4[0][0], a4[0][4]],[a4[1][0], a4[1][4]],[a4[2][0], a4[2][4]],[a4[3][0], a4[3][4]],[a4[4][0], a4[4][4]],[a4[5][0], a4[5][4]],[a4[6][0], a4[6][4]],[a4[7][0], a4[7][4]],[a4[8][0], a4[8][4]],[a4[9][0], a4[9][4]],[a4[10][0], a4[10][4]],[a4[11][0], a4[11][4]],[a4[12][0], a4[12][4]],[a4[13][0], a4[13][4]],[a4[14][0], a4[14][4]],[a4[15][0], a4[15][4]]
], [], []];

var hideAllFunctions = [[], [false, "unshowV1BarGraph();unshowV1Part2();overlay(false);"], [false, "noInteractiveLabel(svg4);emptyTimelineBackgroundIm();addTimelinePoint(v4datanone, 100, 100); unshowV4Titles();unshowV4Axis();hideTimelineBackgroundIm();unHighlightAllTimelineStuff();"], [false, "unshowV2Titles();showWhistleblowerData('none');overlay(false);"], []]
var renderAllFunctions = [[false, "updateWindow();"], [false, "renderVis1();updateWindow();"], [false, "renderVis4();updateWindow();"], [false, "setupV2();renderV2();updateWindow();"], [false, "updateWindow();"]]

function showTooltip() {
	if (!(tooltipHasBeenShown)) {
		$(".tooltip").removeClass("nodisplay");
		tooltipHasBeenShown = true;
	}
	updateTooltip();
	
}

function hideTooltip() {
	$(".tooltip").addClass("nodisplay");
}

function updateTooltip() {
	document.getElementById("tooltipid").style.left = ((w*.45)-320)+"px"; //(vis1x0-90)+"px";
	document.getElementById("tooltipid").style.top = (vis1y0-(v1heightscale(86.6)/2.4))+"px";
}

function hoverInteractiveMenu() {
	$(".menu").removeClass("nodisplay")
}

function unhoverInteractiveMenu() {
	$(".menu").addClass("nodisplay")
}

var interactivesTimes = {"1-0":a1p1offset-2.6, "1-1":a1p2offset-3.1, "2-0": a4timeoffset+11.31, "3-0": wvisoffset+1.7};

function matchesYearAndName(thisd, n, i) {
	if ((thisd.name==n)&&(thisd.year==v1part2xaxeslabels[i])) {
		return true;
	}
	return false;
}

function getSelectedDotG(n, i) {
	var selecteddotg = v1part2g.selectAll(".v1part2datag").filter(function(thisd, thisi) {
		return matchesYearAndName(thisd, n, i)
	});
	return selecteddotg;
}

function updateDotsShown(names, y) {	
	v1part2g.selectAll(".v1dot").attr("r", function(d, thisi) {
		if (dotShouldShow(names, y, d)) {
			return getDotR(d, thisi); 
		} else {
			return 0;
		}
	}).attr("opacity", function(d, thisi) {
		if (dotShouldShow(names, y, d)) {
			return 1; 
		} else {
			return 0;
		}
	}).classed("highlighteddot", function(d, i) {
		if (d.name==names[0]) {
			return true;
		} else {
			return false;
		}
	
	});
	prioritizeV1Part2();	
}

function updateXLabels(y) {
	v1part2g.selectAll(".v1part2xaxislabel").attr("opacity", function(d, i) {
		if (v1part2xaxeslabels[i]<=y) {
			return 1;
		} else {
			return 0;
		}
	})
}

function dotShouldShow(names, y, d) {
		if (names[0]==d.name) {	
			if ((isIn(names, d.name))&&(d.year<y)) {
				//console.log("is agency in question")
				//return getDotR(d, thisi); 
				return true;
			} else {
				return false;
			}		
			
		} else {
			if (isIn(names, d.name)) {
				return true;
			} else {
				return false;
			}
		}

}

function updateDotGroupOrder() {
	var ciag = v1part2g.selectAll(".v1part2datag").filter(function(thisd, thisi) {
		return (thisd.name=="CIA");
	});
	ciag.moveToFront();
	var nrog = v1part2g.selectAll(".v1part2datag").filter(function(thisd, thisi) {
		//console.log("NRO")
		return (thisd.name=="NRO");
	});
	nrog.moveToFront();
}

function showDot(n, i, dur) {
	var selecteddotg = getSelectedDotG(n, i);
	
	var selecteddot = selecteddotg.select(".v1dot");
	selecteddot.classed("highlighteddot", true).attr("r", function(d, i) {
		return getDotR(d, i); })
	selecteddot.transition()
		.duration(dur).attr("opacity", 1)
		.each("end", function() {v1part2g.selectAll(".dotlabelg").attr("opacity", 0)
	selecteddotg.selectAll(".dotlabelg").classed("highlighted", true).attr("opacity", 1)});
	selecteddotg.attr("transform", function(d, i) {return "translate("+getDotGroupX(d, i)+", "+getDotGroupY(d, i)+")";})
	selecteddotg.moveToFront();
}

function moveDot(n, i, dur) {
	updateV1Part2DotGroups(0);
	var selecteddotg = getSelectedDotG(n, i);
	selecteddotg.moveToFront();
	var lastselecteddotg = getSelectedDotG(n, i-1);
	var lastselectedgdata = lastselecteddotg[0][0].__data__;
	
	var selecteddot = selecteddotg.select(".v1dot");
	selecteddot.classed("highlighteddot", true).attr("opacity", 1)
	selecteddot.attr("r", function(d, i) { return getDotR(lastselectedgdata, i-1);});
	v1part2g.selectAll(".dotlabelg").attr("opacity", 0)
	selecteddotg.selectAll(".dotlabelg").classed("highlighted", true).attr("opacity", 1)
	selecteddotg.attr("transform", "translate("+getDotGroupX(lastselectedgdata, i-1)+", "+getDotGroupY(lastselectedgdata, i-1)+")")
		.transition()
		.duration(dur)
		.attr("transform", function(d, i) {return "translate("+getDotGroupX(d, i)+", "+getDotGroupY(d, i)+")";})
	selecteddot.transition().duration(dur)
		.duration(dur).attr("r", getDotR)
}

function prioritizeV1Part2() {
	v1part2g.moveToFront();
	unshowV1BarGraph();
	v1part = 1;
}
function prioritizeV1Part1() {
	v1barsg.moveToFront();
	unshowV1Part2();
	v1barchartshowing = true;
	v1part = 0;
	
}

function showV1Part2TitlesAndAxes() {
	v1part2g.selectAll(".v1dot").classed("noclick", false).classed("clickable", true);
	v1part2g.selectAll([".v1part2ytitle"]).attr("opacity", 1);
	buildIn(v1part2g.selectAll(".v1part2ytitle"), "BUDGET BY AGENCY", 0, "showV1Part2AxisLabels()")
}

function showV1Part2TitlesAndAxesNoTransition() {
	v1part2g.selectAll(".v1dot").classed("noclick", false).classed("clickable", true);
	v1part2g.selectAll([".v1part2ytitle"]).attr("opacity", 1);
	v1part2g.selectAll(".v1part2ytitle").text("BUDGET BY AGENCY");
	v1part2g.selectAll(".v1part2ytitle2").text("Dot size represents number of employees");
	v1part2g.selectAll([".v1part2yaxislabel", ".v1part2ytitle"])
		.attr("opacity", 1)
	v1part2g.selectAll(".v1part2xaxis").attr("opacity", .5)
		.attr("x2", v1part2xscale(2019));
}

var v1part2yaxeslabels = [0, 5, 10, 15];
var v1part2xaxeslabels = [1996, 2004, 2013];

function unshowV1Part2() {
		hideV1Part2Titles(0);
		svg1.selectAll(".v1part2datag").transition().duration(0);//.attr("gdsefds", 10)//.each("end", function() {console.log("hiiiiiii")});
		svg1.selectAll(".v1dot").transition().duration(0);
		v1barsg.classed("noclick", false);
		v1part2g.classed("noclick", true);
		svg1.select("#v1bartitle1").text("").attr("opacity", 1);
		svg1.select("#v1bartitle2").text("").attr("opacity", 1);
		v1part2g.selectAll([".v1part2ytitle"]).transition().duration(0).attr("opacity", 0);
		buildIn(v1part2g.selectAll(".v1part2ytitle"), "", 0, "")
		buildIn(v1part2g.selectAll(".v1part2ytitle2"), "", 0, "")
		v1part2g.selectAll(".v1part2yaxis").transition().duration(0).attr("y2", 0).attr("opacity", 0)
		v1part2g.selectAll(".v1part2xaxislabel")
			.transition().duration(0).attr("opacity", 0);
		v1part2g.selectAll(".v1part2xaxislabel").classed("highlighteddotlabel", false);
		v1part2g.selectAll([".v1part2yaxislabel", ".v1part2ytitle"]).transition().duration(0).attr("opacity", 0)
		v1part2g.selectAll(".v1dot").classed("highlighteddot", false).classed("noclick", true).classed("clickable", false)
			.classed("secondaryhighlighteddot", true).attr("r", 0).attr("opacity", 0);
		v1part2g.selectAll(".dotlabelg").attr("opacity", 0)
		svg1.selectAll(".v1part2xaxislabel").attr("opacity", 0);
		svg1.selectAll(".v1part2xaxislabel").classed("highlighteddotlabel", false);
		svg1.selectAll(".v1part2xaxis")
			.transition()
			.duration(100)
			.delay(500)
			.attr("x2", 0)
			.attr("opacity", 0)
}

/**

function animateAgencyData(i) {
	v1selectedyear = validyears[i];
	//mouseoverV1BarPart2(1000);
	v1part2g.selectAll([".v1dotlabel", ".v1dot", ".v1yearlabel"]).classed("highlighted", true)
	if (i<validyears.length-1) {
		
		setTimeout(function(){animateAgencyData(i+1)}, 1000);
	}
}**/

var v1part2dotstimeout = "";
function showV1Part2AxisLabels() {
	buildIn(v1part2g.selectAll(".v1part2ytitle2"), "Dot size represents number of employees", 0, "");
	v1part2g.selectAll(".v1part2xaxis").attr("x2", 0)
	v1part2g.selectAll([".v1part2yaxislabel", ".v1part2ytitle"])
		.transition()
		.duration(500)
		.attr("opacity", 1)
	v1part2g.selectAll(".v1part2xaxis").attr("opacity", .5)
		.transition()
		.delay(500)
		.duration(1000)
		.attr("x2", v1part2xscale(2019));		
}

function hideV1Part2() {
	hideV1Part2Titles(1000);
	svg1.selectAll(".v1part2datag").transition().duration(0).attr("gdsefds", 10)
	v1barsg.classed("noclick", false);
	v1part2g.classed("noclick", true);
	svg1.select("#v1bartitle1").text("").attr("opacity", 1);
	svg1.select("#v1bartitle2").text("").attr("opacity", 1);
	v1part2g.selectAll([".v1part2ytitle"]).transition().duration(1000).attr("opacity", 0);
	buildIn(v1part2g.selectAll(".v1part2ytitle"), "", 0, "")
	buildIn(v1part2g.selectAll(".v1part2ytitle2"), "", 0, "")
	svg1.selectAll(".v1part2xaxis")
		.transition().delay(1000).duration(1000).attr("x2", 0).attr("opacity", 0)
	v1part2g.selectAll(".v1part2yaxis").transition().duration(1000).attr("y2", 0).attr("opacity", 0)
	v1part2g.selectAll(".v1part2xaxislabel").transition().duration(1000).attr("opacity", 0);
	v1part2g.selectAll(".v1part2xaxislabel").classed("highlighteddotlabel", false);
	v1part2g.selectAll([".v1part2yaxislabel", ".v1part2ytitle"]).transition().duration(1000).attr("opacity", 0)
	v1part2g.selectAll(".v1dot").classed("highlighteddot", false).classed("noclick", true).classed("clickable", false)
		.classed("secondaryhighlighteddot", true).transition().duration(1000).attr("r", 0).attr("opacity", 0);
	v1part2g.selectAll(".dotlabelg").attr("opacity", 0)
	svg1.selectAll(".v1part2xaxislabel").attr("opacity", 0);
	svg1.selectAll(".v1part2xaxislabel").classed("highlighteddotlabel", false);
	svg1.selectAll(".v1part2xaxis")
			.transition()
			.duration(100)
			.delay(500)
			.attr("x2", 0)
			.attr("opacity", 0)
}

function clickProgressbar(e) {
	var clickProgress = Math.max(0, Math.min((e.pageX)/($(window).width()), 1));
	var newSeek = clickProgress*(totalT);
	noClickZones[vidid].forEach(function(d, i) {
		if ((newSeek<d[1])&&(newSeek>=d[0])) {
			newSeek=d[0];
		}
	})
	thisPlayer.currentTime(newSeek);
}

function updateVis() {
	if (playing) {
		animations = allanimations[vidid];
		var currT = thisPlayer.currentTime();
		if (!(renderAllFunctions[vidid][0])) {
			eval(renderAllFunctions[vidid][1])
			renderAllFunctions[vidid][0]=true;
		}
		var inAnimationInterval = false;
		animations.forEach(function(d, i) {
			if ((currT>=d[0])&&(currT<d[4])) {
				inAnimationInterval = true;
				hideAllFunctions[vidid][0]=false;
				if (d[1]==false) {
					d[1]=true;
					eval(d[2]);
				}
			} else {
				d[1]=false;
			}
			if ((i==(animations.length-1))&&(!inAnimationInterval)) {
				if (!(hideAllFunctions[vidid][0])) {
					//console.log("hiding all")
					eval(hideAllFunctions[vidid][1])
					hideAllFunctions[vidid][0]=true;
					animations.forEach(function(d, i) {
						d[1]=false;
					});
				}
			}
		});
	}
}

var agencyToDrunk = "NSA";
var yearToDrunkV2 = 2013;
var mouseoverDrunkElementV2 = false;

function drunkButtonV2() {
	drunkButtonMode = true;
	var seldot = v1part2g.selectAll(".v1dot").filter(function(d, i) {if ((d.year==yearToDrunkV2)&&(d.name==agencyToDrunk)){return true;} return false;})
	var selg = v1part2g.selectAll(".dotlabelg").filter(function(d, i) {if ((d.year==yearToDrunkV2)&&(d.name==agencyToDrunk)){return true;} return false;});
	seldot.classed("secondaryhighlighteddot", false).classed("highlighteddot", false).attr("fill-opacity", 1)
	flashDrunkButtonV2(seldot, selg, true);

}

function flashDrunkButtonV2(drunkdot, drunklabelg, makehighlight) {
	if (!drunkButtonMode) {
		if (!mouseoverDrunkElementV2) {
			drunkdot.classed("secondaryhighlighteddot", true);
			drunklabelg.transition()
			.duration(200).attr("opacity", 0);
			mouseoverDrunkElementV2 = true;
		} else {
			drunkdot.classed("highlighteddot", true);
			drunklabelg.transition()
			.duration(200).attr("opacity", 1);
		}
		return;
	} else {
		drunkdot.transition()
		.duration(500)
		.attr("fill-opacity", function() {
			if (makehighlight) {
				return 1;
			} 
			return .5;
		})
		.each("end", function() {
			flashDrunkButtonV2(drunkdot, drunklabelg, !makehighlight);
		});
		drunklabelg.transition()
			.duration(500)
			.attr("opacity",function(d, i) {
				if (makehighlight) {
					return 1;
				}
				return .5;
			})
	}
}


var drunkButtonMode = false;
var barToDrunk = 12;
var yearToDrunk = 2001;

function drunkButton() {
	drunkButtonMode = true;
	svg1.selectAll([".v1bar", ".v1ticklabel", ".v1baramt", ".v1bartype", ".v1ticklabel"]).classed("highlighted", false)
	var selection = svg1.selectAll(["#v1-drunk-"+barToDrunk, "#v1bar-"+barToDrunk, "#v1baramt"+yearToDrunk, "#v1bartype"+yearToDrunk, "#labelg-"+yearToDrunk]);
	selection.attr("opacity", 1).classed("defaultdatacolor", false)
	flashDrunkButton(selection, true);
	
}

var mouseoverDrunkElement = false;
function flashDrunkButton(drunk, makehighlight) {
	if (!drunkButtonMode) {
		if (!mouseoverDrunkElement) {
			drunk.selectAll([".v1baramt", ".v1bartype"]).attr("opacity", 1);
			svg1.selectAll("#v1-drunk-"+barToDrunk).classed("highlighted", false).classed("defaultdatacolor", true).attr("opacity", 0);
			svg1.selectAll("#v1bar-"+barToDrunk).classed("highlighted", false).classed("defaultdatacolor", true);
			svg1.selectAll("#labelg-"+yearToDrunk).attr("opacity", 0);
			mouseoverDrunkElement = true;
		}
		drunk.selectAll([".v1baramt", ".v1bartype"]).classed("highlighted", true)
		return;
	}
	drunk.transition()
		.duration(500)
		.attr("fill", function() {
			if (makehighlight) {
				return "#fac800";
			} 
			return "#bcbbad";
		})
		.each("end", function() {
			flashDrunkButton(drunk, !makehighlight);
		});
}

// VIS 1 PARMS
var vis1x0 = .5*w;
var vis1xmargin = 300;
var vis1x1 = Math.max(vis1x0+500, Math.min(.8*w, vis1x0+700));
var vis1titlesgy = .15*h;
var validyears = [1996, 2001, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013];
var v1barsg;
var vis1xspace = 8;
var vis1x1space = 250;
var vis1graphwidth = 310;
var maxvis1x = vis1x1-(vis1x0+vis1xspace);
var v1aspectratio = .6;
var v1part2aspectratio = .9;
var v1x2 =Math.min(vis1graphwidth, maxvis1x); // vis1x1-vis1x0; //
var vis1y0 = h*.65; //vis1titlesgy+150+v1x2*v1aspectratio //250+v1x2*v1aspectratio;
var vis1y1 =  h*.25; //vis1titlesgy+170+(h*.4);
var v1scale = d3.scale.linear().domain([1989, 2014]).range([0,vis1x1-vis1x0]);
var v1heightscale = d3.scale.linear().domain([0, 85]).range([0, vis1y1]);
var vis1part2y0 = h*.8;
var vis1part2yspace = 120;
var v1part2heightscale = d3.scale.linear().domain([0, 16.5]).range([0, h*.5]);
var v1barwidth = 5;
var v1barduration = 1000;
var v1part2xscale = d3.scale.linear().domain([1990, 2019]).range([0,Math.min(vis1graphwidth, maxvis1x)]);
var v1part =0;
var v1part2g;

var totspendingdata = [{"year":1989, "amt": 47.1, "type":"Commission"},
{"year":1990, "amt": 45.6, "type":"CRS"},
{"year":1991, "amt": 44.0, "type":"CRS"},
{"year":1992, "amt": 42.4, "type":"CRS"},
{"year":1993, "amt": 40.9, "type":"CRS"},
{"year":1994, "amt": 39.3, "type":"CRS"},
{"year":1995, "amt": 37.7, "type":"CRS"},
{"year":1996, "amt": 37.7, "type":"CRS"},
{"year":1997, "amt": 37.7, "type":"Actual"},
{"year":1998, "amt": 37.4, "type":"Actual"},
{"year":1999, "amt": 37.4, "type":"CRS"},
{"year":2000, "amt": 37.4, "type":"CRS"},
{"year":2001, "amt": 37.4, "type":"CRS"},
{"year":2002, "amt": 43.1, "type":"CRS"},
{"year":2003, "amt": 48.9, "type":"CRS"},
{"year":2004, "amt": 54.6, "type":"CRS"},
{"year":2005, "amt": 60.4, "type":"CRS"},
{"year":2006, "amt": 66.1, "type":"CRS"},
{"year":2007, "amt": 71.9, "type":"Actual"},
{"year":2008, "amt": 77.9, "type":"Actual"},
{"year":2009, "amt": 83.3, "type":"Actual"},
{"year":2010, "amt": 86.6, "type":"Actual"},
{"year":2011, "amt": 83.3, "type":"Actual"},
{"year":2012, "amt": 78.4, "type":"Actual"},
{"year":2013, "amt": 73.3, "type":"Actual"},
{"year":2014, "amt": 67.9, "type":"Actual"}];

var spendingdata = [
{"name":"CIA", "year":1996, "budget":3.1, "staff":17.5},
{"name":"CIA", "year":2004, "budget":9.4, "staff":17.3},
{"name":"CIA", "year":2013, "budget":14.7, "staff":21.5},
{"name":"NRO", "year":1996, "budget":6.2, "staff":1.7},
{"name":"NRO", "year":2004, "budget":9.2, "staff":2.6},
{"name":"NRO", "year":2013, "budget":10.3, "staff":2.8},
{"name":"NSA", "year":1996, "budget":3.6, "staff":21},
{"name":"NSA", "year":2004, "budget":7.1, "staff":21}, 
{"name":"NSA", "year":2013, "budget":10.8, "staff":40}]

// Vis 2 PARMS
// V2 parms
var v2margin = .05;
var v2x0 = w*v2margin;
var v2x1 = w*(1-v2margin);
var v2y0 = h -110;
var v2lineheight = h*.1;
var bratio = .7;
var cratio = .4;
var a = (v2x1-v2x0)/(2+(2*cratio)+(10*bratio));
var b = bratio*a;
var c = cratio*a;
var wduration = 800;
var vistitleduration = 1000;

var imnames = {"Lawrence Franklin": "franklin", "Thomas Drake": "drake", "Chelsea Manning": "manning", "John Kiriakou": "kiriakou", "Stephen Kim": "kim", "Samuel Morison": "morison", 
"Edward Snowden": "snowden", "Daniel Ellsberg": "ellsberg", "James Hitselberger": "hitselberger", "Jeffrey Sterling": "sterling", "Shamai Leibowitz": "leibowitz"}

var wdescs = {"Lawrence Franklin": "Passed classified documents on U.S. policy//toward Iran to Israeli lobby group", 
"Thomas Drake": "Revealed abuse within NSA  //that occurred post–9/11", 
"Chelsea Manning": "Gave military and diplomatic//documents to WikiLeaks", 
"John Kiriakou": "Provided name of covert//CIA officer to a reporter", 
"Stephen Kim": "Disclosed to a reporter that North//Korea might test a nuclear bomb", 
"Samuel Morison": "Gave spy-satellite photos to//a British military magazine", 
"Edward Snowden": "Gave information on NSA mass//surveillance to journalists", 
"Daniel Ellsberg": "Famous for publishing//the Pentagon Papers", 
"James Hitselberger": "Took classified documents from//U.S. military base where he worked", 
"Jeffrey Sterling": "Revealed details of U.S. plan to delay Iran’s//nuclear weapons program to a journalist", 
"Shamai Leibowitz": "Gave information from FBI wiretaps of//the DC Israeli Embassy to a blogger"}


var wnone = [];

var w0 = [{"pres":"OBAMA ADMINISTRATION", "rank":0, "whistleblowers":[{"name":"Thomas Drake", "rank": 0}]}];
//var w1 = [{"pres":"BUSH JR", "rank":0, "whistleblowers":[{"name":"Lawrence Franklin", "rank": 0}]},{"pres":"REAGAN", "rank":1, "whistleblowers":[{"name":"Samuel Morison", "rank": 0}]},{"pres":"NIXON", "rank":2, "whistleblowers":[{"name":"Daniel Ellsberg", "rank": 0}]}];
var w1 = [{"pres":"OBAMA ADMINISTRATION", "rank":0, "whistleblowers":[{"name":"Chelsea Manning", "rank": 0}, {"name":"Thomas Drake", "rank": 1}]}];
var w2 = [{"pres":"OBAMA ADMINISTRATION", "rank":0, "whistleblowers":[{"name":"Stephen Kim", "rank": 0},
{"name":"Chelsea Manning", "rank": 1}, {"name":"Thomas Drake", "rank": 2}]}];
var w3 = [{"pres":"OBAMA ADMINISTRATION", "rank":0, "whistleblowers":[{"name":"Jeffrey Sterling", "rank": 0},
{"name":"Stephen Kim", "rank": 1},{"name":"Chelsea Manning", "rank": 2}, {"name":"Thomas Drake", "rank": 3}]}];
var w4 = [{"pres":"OBAMA ADMINISTRATION", "rank":0, "whistleblowers":[{"name":"John Kiriakou", "rank": 0, "desc":""},
{"name":"Jeffrey Sterling", "rank": 1},{"name":"Stephen Kim", "rank": 2},{"name":"Chelsea Manning", "rank": 3}, {"name":"Thomas Drake", "rank": 4}]}];
var w5 = [{"pres":"OBAMA ADMINISTRATION", "rank":0, "whistleblowers":[{"name":"Edward Snowden", "rank": 0},{"name":"John Kiriakou", "rank": 1, "desc":""},
{"name":"Jeffrey Sterling", "rank": 2},{"name":"Stephen Kim", "rank": 3},{"name":"Chelsea Manning", "rank": 4}, {"name":"Thomas Drake", "rank": 5}]}];
var w6 = [{"pres":"OBAMA ADMINISTRATION", "rank":0, "whistleblowers":[{"name":"Edward Snowden", "rank": 0},
{"name":"James Hitselberger", "rank": 1},{"name":"John Kiriakou", "rank": 2},
{"name":"Jeffrey Sterling", "rank": 3, "desc":""},{"name":"Stephen Kim", "rank": 4},
{"name":"Chelsea Manning", "rank": 5},{"name":"Thomas Drake", "rank": 6}]}];
var w7 = [{"pres":"OBAMA ADMINISTRATION", "rank":0, "whistleblowers":[{"name":"Edward Snowden", "rank": 0},
{"name":"James Hitselberger", "rank": 1},{"name":"John Kiriakou", "rank": 2},
{"name":"Jeffrey Sterling", "rank": 3, "desc":""},{"name":"Stephen Kim", "rank": 4},
{"name":"Chelsea Manning", "rank": 5},{"name":"Thomas Drake", "rank": 6},
{"name":"Shamai Leibowitz", "rank": 7}]}];
var w8 = [{"pres":"OBAMA ADMINISTRATION", "rank":0, "whistleblowers":[{"name":"Edward Snowden", "rank": 0},
{"name":"James Hitselberger", "rank": 1},{"name":"John Kiriakou", "rank": 2},
{"name":"Jeffrey Sterling", "rank": 3, "desc":""},{"name":"Stephen Kim", "rank": 4},
{"name":"Chelsea Manning", "rank": 5},{"name":"Thomas Drake", "rank": 6},
{"name":"Shamai Leibowitz", "rank": 7}]}, 
{"pres":"ALL OTHER ADMINISTRATIONS", "rank":1, "whistleblowers":[]}]
var w9 = [{"pres":"OBAMA ADMINISTRATION", "rank":0, "whistleblowers":[{"name":"Edward Snowden", "rank": 0},
{"name":"James Hitselberger", "rank": 1},{"name":"John Kiriakou", "rank": 2},
{"name":"Jeffrey Sterling", "rank": 3, "desc":""},{"name":"Stephen Kim", "rank": 4},
{"name":"Chelsea Manning", "rank": 5},{"name":"Thomas Drake", "rank": 6},
{"name":"Shamai Leibowitz", "rank": 7}]}, 
{"pres":"ALL OTHER ADMINISTRATIONS", "rank":1, "whistleblowers":[{"name":"Lawrence Franklin", "rank": 0}]}]
var w10 = [{"pres":"OBAMA ADMINISTRATION", "rank":0, "whistleblowers":[{"name":"Edward Snowden", "rank": 0},
{"name":"James Hitselberger", "rank": 1},{"name":"John Kiriakou", "rank": 2},
{"name":"Jeffrey Sterling", "rank": 3, "desc":""},{"name":"Stephen Kim", "rank": 4},
{"name":"Chelsea Manning", "rank": 5},{"name":"Thomas Drake", "rank": 6},
{"name":"Shamai Leibowitz", "rank": 7}]}, 
{"pres":"ALL OTHER ADMINISTRATIONS", "rank":1, "whistleblowers":[{"name":"Lawrence Franklin", "rank": 0}, 
{"name":"Samuel Morison", "rank": 1}]}]
var w11 = [{"pres":"OBAMA ADMINISTRATION", "rank":0, "whistleblowers":[{"name":"Edward Snowden", "rank": 0},
{"name":"James Hitselberger", "rank": 1},{"name":"John Kiriakou", "rank": 2},
{"name":"Jeffrey Sterling", "rank": 3, "desc":""},{"name":"Stephen Kim", "rank": 4},
{"name":"Chelsea Manning", "rank": 5},{"name":"Thomas Drake", "rank": 6},
{"name":"Shamai Leibowitz", "rank": 7}]}, 
{"pres":"ALL OTHER ADMINISTRATIONS", "rank":1, "whistleblowers":[{"name":"Lawrence Franklin", "rank": 0}, 
{"name":"Samuel Morison", "rank": 1}, {"name":"Daniel Ellsberg", "rank": 2}]}]

var wdata = wnone;
var wgroupg;
var wg;
var faceradius = a*.33
var facefilteropacity = .3;



function startInteractiveMode(speed) {
	interactiveMode = true;
	interactiveNav();
	if (speed==0) {
		thisPlayer.volume(0);
		thisPlayer.pause();
	} else {
		fadeVolume(1, function(){
		thisPlayer.pause();
		}, true);
	}
}



function endInteractiveMode(speed) {
	interactiveMode = false;
	interactiveNav();
	thisPlayer.play();
	drunkButtonMode = false;
	if (speed==0) {
		thisPlayer.volume(1);
	} else {
		fadeVolume(0, function(){
		}, false);
	}
}

var navdur = 1000;
function interactiveNav() {
	resizeNavs(navdur);	
}


function fadeVolume(volume, callback, isfadeout) {
	if (thisPlayer==undefined) {
		return;
	}
	if (cancelVolumeFade) {
		thisPlayer.volume(1);
		cancelVolumeFade = false;
		return;
	}

    if (((volume > fadevolumefactor)&&(isfadeout))||((volume<1)&&(!isfadeout))) {
    	thisPlayer.volume(volume);
        setTimeout(function(){
        	if (isfadeout) {
            	fadeVolume((volume -= fadevolumefactor), callback, isfadeout);   
            } else {
            	fadeVolume((volume += fadevolumefactor), callback, isfadeout);   
            }      
        }, fadevolumespeed);
    } else {
        (typeof(callback) !== 'function') || callback();
    }
}

var v4x0 = .2*w;
var v4x1 = .8*w;
var v4y0 = h*.7;
var v4y1 = h*.5;
var v4xscale = d3.scale.linear().domain([1979, 2010]).range([0, (v4x1-v4x0)])
var v4yscale = d3.scale.linear().domain([0, 3]).range([0, (v4y1-v4y0)])
var v4datalabelyspace = 12;
var timelineimagesloaded = false;

// STUFF FOR TIMELINE VIS – VIS 4
function renderVis4() {
	drunkButtonMode = false;
	renderV4Axis();
	renderV4Titles();
	renderTimelineData();
	updateAllV4(0);
	setTimeout(function(){loadTimelineImages();}, 5000)
	
}

function loadTimelineImages() {		
		imageLoading("img/timelinebackgrounds_airforce.png", "timelinebackgroundid")
		imageLoading("img/timelinebackgrounds_nsa.png", "timelinebackgroundid")
		imageLoading("img/timelinebackgrounds_navy.png", "timelinebackgroundid")
		imageLoading("img/timelinebackgrounds_cia.png", "timelinebackgroundid")
		imageLoading("img/timelinebackgrounds_nsacontract.png", "timelinebackgroundid")
		imageLoading("img/careertimeline_airforce.png", "timelinebackgroundid")
		imageLoading("img/careertimeline_navy.png", "timelinebackgroundid")
		imageLoading("img/careertimeline_nsacontract.png", "timelinebackgroundid")
		imageLoading("img/careertimeline_nsa.png", "timelinebackgroundid")
		imageLoading("img/careertimeline_airforceachievementmedal.png", "timelinebackgroundid")
		imageLoading("img/careertimeline_theairmedal.png", "timelinebackgroundid")
		imageLoading("img/careertimeline_meritorious.png", "timelinebackgroundid")
		imageLoading("img/careertimeline_cia.png", "timelinebackgroundid")
		imageLoading("img/careertimeline_espionage.png", "timelinebackgroundid")
		imageLoading("img/careertimeline_whistleblowing.png", "timelinebackgroundid")

}

function imageLoading(src, id) {
  	var img=document.createElement("img");
    img.src=src;
    img.id="picture"+src;
    var foo = document.getElementById(id);
    foo.appendChild(img);
}

function addTimelinePoint(newdata, p2dur, tldur) {
if (!(newdata.length==0)) {
	}
	timelinedur = tldur;
	v4data = newdata;
	renderTimelineData();
	unHighlightAllTimelineStuff();
	showTimelineTextLine(timelinedur, true, newdata[newdata.length-1], p2dur);		
}


function getDescY() {
	return -2.2*getV4BarHeight()	
}

function getSelectedTimelineG(d, i) {
	return svg4.selectAll(".timelineg").filter(function(thisd, thisi) {
		if ((thisd.org==d.org)&&(thisd.startyear==d.startyear)&&(thisd.endyear==d.endyear)) {
			return true;
		} else {
			return false;
		}
	});
}	

var bartimeout = "";
function unHighlightAllTimelineStuff() {
	clearTimeout(timelineptimeout);
	clearTimeout(bartimeout);
	$(".timelinep").html("<span class='timelinep2' style='opacity:0;'></span>");
	svg4.selectAll([".v4axislabel", ".v4axislabel2"]).attr("opacity", 0);
	svg4.selectAll(".v4hoverstuff").attr("display", "none");
	svg4.selectAll([".v4bar", ".datatitle"]).classed("unhighlightedbar", true).classed("defaultdatacolor", false);


}

function mouseoverV4Bar(d, i) {
	if (interactiveMode) {
		drunkButtonMode = false;
		unHighlightAllTimelineStuff();
	
		var seltlg = getSelectedTimelineG(d, i);
		seltlg.moveToFront();
		seltlg.selectAll(".v4hoverstuff").attr("display", "block");
		seltlg.selectAll([".v4axislabel", ".v4axislabel2"]).attr("opacity", function (){
			return 1;
		}).classed("defaultaxislabelcolor", false).classed("defaultdatacolor", true);
		seltlg.selectAll([".v4axislabel", ".v4axislabel2", ".v4bar", ".datatitle"]).classed("unhighlightedbar", false).classed("defaultdatacolor", true);
	
		clearTimeout(hoverstufftimeout);
	}
}
var hoverstufftimeout;
function mouseoutV4Bar(d, i) {
	if (interactiveMode) {
	hoverstufftimeout = setTimeout(function() {
	unHighlightAllTimelineStuff();
	}, 200)
	}
}
var selectedv4pt = "";
function renderTimelineData() {
	selectedv4pt = v4data[v4data.length-1];
	unHighlightAllTimelineStuff();
	var updatev4 = svg4.selectAll(".timelineg")
		.data(v4data, function(d, i) {return d.org+d.startyear;});
	var entv4g = updatev4.enter().append("g").attr("class", "timelineg");
	entv4g.append("svg:rect")
		.attr("class", "v4bar")
		.attr("y", 0).attr("x", 0)
		.classed("unhighlightedbar", true)
		.classed("clickable", true)
		.on("mouseover", mouseoverV4Bar)
		.on("mouseout", mouseoutV4Bar);
	

	entv4g.append("svg:image")
		.attr("class", "dataim")
    	.classed("v4hoverstuff", true)
    	.attr('x',0)
    	.attr("opacity", 1)
   		.attr('y', getImageY)
   		.attr('width', imageWidth)
   		.attr('height', imageHeight)
   		.attr("display", "none")
   		.attr("xlink:href", imagePath)
   		.classed("clickable", true)
		.on("mouseover", mouseoverV4Bar)
		.on("mouseout", mouseoutV4Bar);

	entv4g.each(function(d, i) {
		var thisd = d3.select(this)[0][0].__data__
		var descarray = (thisd.desc).split("-");
		for (j = 0; j<descarray.length; j++) {
		d3.select(this).append("svg:text")
			.attr("class", "datadesc")
			.attr("x", 0)
			.classed("v4hoverstuff", true)
			.classed("defaultdatacolor", true)
			.attr("display", "none")
			.attr("y", function(d, i) {
				return getDescY();})
			.text(function() {
				return descarray[j]})
			.attr("opacity", 1)
			.classed("clickable", true)
			.on("mouseover", mouseoverV4Bar)
			.on("mouseout", mouseoutV4Bar);
		}
	});
	
	entv4g.append("svg:text")
		.attr("class", "datatitle")
		.attr("x", 0)
		.attr("y", -5)
		.classed("defaultdatacolor", true)
		.classed("unhighlightedbar", true)
		.text(function(d, i) {return d.org})
		
		.classed("clickable", true)
		.on("mouseover", mouseoverV4Bar)
		.on("mouseout", mouseoutV4Bar);

		
	entv4g.append("svg:text")
		.attr("class", "v4axislabel")
		.classed("serif", true)
		.classed("defaultaxislabel", true)
		.classed("defaultaxislabelcolor", true)
		.attr("opacity", 0)
		.attr("x", 0)
		.text(function(d, i) {
			return (d.startyear.toString()).split(".")[0];
			return d.startyear});
	entv4g.append("svg:text")
		.attr("class", "v4axislabel2")
		.classed("serif", true).attr("opacity", 0)
		.classed("defaultaxislabel", true)
		.classed("defaultaxislabelcolor", true)
		.text(function(d, i) {
			if ((d.org==cia.org)||(d.startyear==2010)||(d.org==whistleblowing.org)||((parseInt(d.startyear)-parseInt(d.endyear))==0)) {
				return "";
			}
			return (d.endyear.toString()).split(".")[0];
			});

	updatev4.exit().remove();
	
	updateAllV4(0);
}


function updateAllV4(dur) {
	svg4.selectAll(".timelineg").attr("transform", function(d, i) {
		return "translate("+(v4x0+v4xscale(d.startyear))+", +"+(v4y0+v4yscale(d.y))+")";
	})
	
	svg4.select(".vistitleg").attr("transform", function() {
		return "translate("+(v4x0+v4xscale(1979))+", "+v4titley+")";
	})
	
	
	svg4.selectAll(".v4axis").attr("x1", v4x0+v4xscale(1979))
		.attr("x2", v4x0+v4xscale(2010))
		.attr("y1", getV4AxisY)
		.attr("y2",getV4AxisY);
	svg4.selectAll(".v4xaxislabel")
		.attr("x", function(d, i) {return v4x0+v4xscale(d)})
		.attr("y", getV4AxisLabelY)
	svg4.selectAll(".v4bar").transition().duration(dur)
		.attr("width", function(d, i) { 
			if (d==selectedv4pt) {
				return 0;
			} else {
			return getV4BarWidth(d, i);
			}})
		.attr("height", getV4BarHeight)
	svg4.selectAll([".v4axislabel", ".v4axislabel2"])
		.attr("y", function(d, i) {
		return getV4AxisY()-v4y0+v4axislabelyspace-(v4yscale(d.y));
		});
	svg4.selectAll(".v4axislabel2").attr("x", function(d, i) {return v4xscale(d.endyear)-v4xscale(d.startyear)})
	svg4.selectAll(".datatitle").attr("opacity", function(d, i) {
			if (d==selectedv4pt) {
				return 0;
			} else {	
				return 1;
			}
		
		})
	
	selectedv4pt = "";
}

var v4titley = h*.15;
function showV4Titles() {
	svg4.select(".vistitleg").attr("transform", function() {
		return "translate("+(v4x0+v4xscale(1979)-5)+", "+v4titley+")";
	}).attr("display", "block").transition().duration(1000)
		.attr("opacity", 1)
		.attr("transform", function() {
			return "translate("+(v4x0+v4xscale(1979))+", "+v4titley+")";
			})
	
	
}

function showV4TitlesNoTransition() {
	svg4.select(".vistitleg")
		.attr("opacity", 1).attr("display", "block")
		.attr("transform", function() {
			return "translate("+(v4x0+v4xscale(1979))+", "+v4titley+")";
			})
}

function unshowV4Titles() {
	svg4.select(".vistitleg").attr("opacity", 0).attr("display", "none");
}

function renderV4Titles() {
	var gr = svg4.append("g");
	gr.attr("class", "vistitleg").attr("opacity", 0)//.attr("display", "none");
	doTitleComponents(gr, "", "The Life of a Whistleblower", ["Drake went from the highest levels of government service to", "indictment under the Espionage Act, one of the most serious", "charges an American can face."], 0);
	
}

function unhighlightTimelinePoint(pt) {
	var selg = getSelectedTimelineG(pt);
	d3.select(".timelinep2").transition()
		.duration(300)
		.style("opacity", 0);
	d3.select(".timelinep").transition()
		.duration(300)
		.style("opacity", 0);
	selg.selectAll([".v4axislabel", ".v4axislabel2"])
		.classed("defaultaxislabelcolor", true)
		.classed("defaultdatacolor", false);
	selg.selectAll([".v4bar", ".datatitle"]).classed("unhighlightedbar", true).classed("defaultdatacolor", false);
	svg4.selectAll([".v4axislabel", ".v4axislabel2"]).attr("opacity", 0)
	
}

var ey, allv4elabels, minv4axis, maxv4axis;
function showV4XAxisEndpoints() {
	maxv4axis = 0;
	svg4.selectAll(".v4axislabel2").each(function(d,i) {
		ey = d.endyear;
		if (maxv4axis<ey) {
			maxv4axis = ey;
		}
		if (i==((svg4.selectAll(".v4axislabel2")[0]).length-1)) {
			svg4.selectAll(".v4axislabel2").attr("opacity", function(thisd, thisi) {
				if (thisd.endyear==maxv4axis) {
					return 1;
				} else {
					return 0;
				}
			});
			svg4.selectAll(".v4axislabel").attr("opacity", function(thisd, thisi) {
				if (thisd.startyear==1979) {
					return 1;
				} else {
					return 0;
				}
			});
		}

	});
	
}



var timelineptimeout = "";
function showTimelineTextLine(timelinedur, callback, pt, p2dur) {
	if (pt==undefined) {
		$(".timelinep").html("<span class='timelinep2' style='opacity:0;'></span>");
		return;
	}

	var timelinet = pt.title.split("//"); 
	if ((!(pt.org==airforce.org))&&(!(pt.org==whistleblowing.org))) {
			updateTimelineBackgroundIm(pt, timelinedur);
	}
	$(".timelinep").html(timelinet[0]+"<span class='timelinep2' style='opacity:0;'>"+timelinet[1]+"</span>")
	d3.select(".timelinep")
		.transition()
		.duration(.5*timelinedur)
		.style("opacity", 1)
		.each("end", function() {
		});

	timelineptimeout = setTimeout(function() {
	d3.select(".timelinep2").transition()
			.duration(.5*timelinedur)
			.style("opacity", 1)
			.each("end", function() {
				if (callback) {
					if (pt.org==airforce.org) {
						updateTimelineBackgroundIm(pt, timelinedur);
					}
					svg4.selectAll(".v4axislabel2").attr("opacity", function() {
						var currop = d3.select(this).attr("opacity");
						if (currop==1) {
							var currtxt = d3.select(this).text();
							if (Math.abs(pt.startyear-currtxt)<3) {
								return 0;
							}
						}
						return currop;
					})
					showTimelineBar(pt, timelinedur);
				}
			})
	}, p2dur)

}

function emptyTimelineBackgroundIm() {
	d3.select("#timelinebgim").attr("src", "");
}

function updateTimelineBackgroundIm(pt, timelinedur) {

	var bgsrc = "img/timelinebackgrounds_"+pt.backgroundim+".png";
	if(pt.backgroundim=="") {
		bgsrc = "";
	}
	d3.select("#timelinebgim").attr("src", bgsrc);

	d3.select("#timelinebgim").style("transform", "scale(1) translate(0px)")
		.transition()
		.duration(2*timelinedur)
		.style("opacity", 1)
		.style("transform", "scale(1.035) translate(-8px)")
}

function getSelectedTimelineG(pt) {
	return svg4.selectAll(".timelineg").filter(function(d, i) {
		return matchesTimelineDataPt(d, i, pt);
		});
}


function showTimelineBar(pt, timelinedur) {
	selectedv4pt = "";
	var selg = getSelectedTimelineG(pt);
	selg.selectAll([".v4bar", ".datatitle"]).attr("width", 0).attr("opacity", 1)
		.classed("unhighlightedbar", false).classed("defaultdatacolor", true);
	selg.select(".v4axislabel").classed("defaultaxislabelcolor", false)
		.classed("defaultdatacolor", true).attr("opacity", 1);
	updateAllV4(timelinedur);
	selg.selectAll(".datatitle").attr("opacity", 1).classed("defaultaxislabelcolor", false).classed("defaultdatacolor", true).attr("display", "block");
	bartimeout = setTimeout(function() {
		
		selg.select(".v4axislabel2").classed("defaultaxislabelcolor", false).classed("defaultdatacolor", true).attr("opacity", 1);
		
	}, timelinedur);
}

function matchesTimelineDataPt(d, i, pt) {
		if ((d.org==pt.org)&&(d.startyear==pt.startyear)) {
			return true;
			} else {
				return false;
			}
}

function imagePath(d) {
	if (hasImage(d)) {
		return "img/"+d.im+".png";
	}
	return "img/noim.png";
}

function hasImage(d) {
	return !(d.im=="");
}

function imageWidth(d) {
	if (hasImage(d)) {
		return 262;
	}
	return 0;
}

function imageHeight(d) {
	if (hasImage(d)) {
		return 295;
	}
	return 0;
}

function getImageY(d) {
	return getDescY()-imageHeight(d)-v4imyspace;

}


function showV4Axis(dur, delay) {
	svg4.selectAll(".v4axis").attr("x2", v4x0).attr("opacity", 1)
		.transition()
		.duration(dur)
		.attr("x2", v4x0+v4xscale(2010))
	svg4.selectAll(".v4xaxislabel")
		.transition()
		.duration(dur)
		.delay(function(d, i) {return i*delay;})
		.attr("opacity", 1)
}



function unshowV4Axis() {
	svg4.selectAll(".v4axis").attr("opacity", 0);
	svg4.selectAll(".v4xaxislabel").attr("opacity", 0);
}

var v4axisyspace = 50;
var v4axislabelyspace = 20;
var v4axislabeldata = [1979, 2010]
function renderV4Axis() {
	svg4.append("svg:line")
		.attr("class", "v4axis")
		.classed("axis", true).attr("opacity", 0);
		
	svg4.selectAll(".v4xaxislabel")
		.data(v4axislabeldata)
		.enter().append("svg:text")
		.attr("class", "v4xaxislabel")
		.classed("defaultaxislabel", true)
		.classed("defaultaxislabelcolor", true)
		.attr("opacity", 0)
		.text(function(d, i) {return d;});
}

function unrenderV4Axis() {
	svg4.selectAll(".v4xaxislabel").remove();
	svg4.selectAll(".v4axis").remove();
}

function getV4AxisLabelY() {
	return getV4AxisY()+v4axislabelyspace;
}

function getV4AxisY() {
	return v4y0+v4axisyspace;
}


function getV4BarWidth(d, i) {
	return v4xscale(d.endyear)-v4xscale(d.startyear)
}

function getV4BarHeight() {
	return 10;
}

function showTimelineBackgroundIm() {
	d3.selectAll(".timelinebackground").transition().duration(2000).style("opacity", 1);
}

function showTimelineBackgroundImNoTransition() {
	d3.selectAll(".timelinebackground").style("opacity", 1);
}

function hideTimelineBackgroundIm() {
	d3.selectAll(".timelinebackground").transition();
	d3.selectAll(".timelinebackground").style("opacity", 0);
	d3.select("#timelinebgim").transition().style("opacity", 0);
	d3.selectAll(".timelinebackground").transition().duration(3000).style("opacity", 0);
}

function unrenderVis4() {
	d3.selectAll(".timelinebackground").transition();
	d3.selectAll(".timelinebackgroundimageclass").style("opacity", 0)
	$(".timelinebackground").css({opacity: 0})
	$(".timelinep").css({opacity: 0})
	$(".timelinep2").css({opacity: 0})
	v4data = [];
	renderTimelineData();
	unrenderV4Axis();
	updateAllV4(0);
	hideTimelineBackgroundIm();
}

var v2wtitleyspace = 10; 
var v2textyspace = 17;
var allvistitledescy = 27;
var allvistitleyspace = 35;
var allvistitledescyspace = 68;
var v1subtitleyspace = 17;
var v1y0titlepos = 50;

updateVisTypeParms();
function updateVisTypeParms() {
	if ((h>=800)&&(w>=1500)) {
    	v2wtitleyspace = 13; 
		v2textyspace = 19;
		
		allvistitledescy = 31;
		allvistitleyspace = 42;
		allvistitledescyspace = 81;

		v1subtitleyspace = 21;
    
    } else {
    	v2wtitleyspace = 11; 
		v2textyspace = 17;
		
		allvistitledescy = 27;
		allvistitleyspace = 35;
		allvistitledescyspace = 68;
	
		v1subtitleyspace = 17;
    }
}

function updateWindow(){
	g = d.getElementById('vis');
    w = g.clientWidth;
    h = g.clientHeight
    vis0x2=w-vis0xmargin;
    vis0y=.94*h;
    svgall.attr("width", w).attr("height", h);
    
	updateVisTypeParms();
    if (vidid==2) {
    	v4x0 = .2*w;
    	v4x1 = .8*w;
    	v4y0 = h*.7;
    	v4y1 = h*.5;
    	v4titley = h*.15;
    	v4xscale.range([0, (v4x1-v4x0)]);
     	v4yscale.range([0, (v4y1-v4y0)])
    	updateAllV4(0);
    } else if (vidid==1) {
			vis1x0 = .5*w;
			vis1x1 = Math.max(vis1x0+500, Math.min(.8*w, vis1x0+700)); //w-vis1xmargin;
			vis1titlesgy = .15*h;
			maxvis1x = vis1x1-(vis1x0+vis1xspace)
			v1x2 = Math.min(vis1graphwidth, maxvis1x);
			vis1y0 = h*.65;
			vis1y1 =  h*.25;
			v1scale.range([0,vis1x1-vis1x0]);
			v1heightscale.range([0, vis1y1]);
			vis1part2y0 = h*.8;
			v1part2xscale.range([0,Math.min(vis1graphwidth, maxvis1x)]);
			v1part2heightscale.range([0, h*.5]);	
			updateAllV1(0);
    } else if (vidid==3) {
    	v2x0 = w*v2margin;
		v2x1 = w*(1-v2margin);
		a = (v2x1-v2x0)/(2+(2*cratio)+(10*bratio));
		b = bratio*a;
		c = cratio*a;
		v2y0 = h -110;
		v2lineheight = h*.1;
		faceradius = a*.33
	    updateV2(0);
    }
    

    
}
function cancelV2() {
	showWhistleblowerData('none');
	unshowV2Titles();
	overlay(false);
	unshowWhistleblowerTitles();
}

function cancelV4() {

	unrenderVis4();
	hideTimelineBackgroundIm();
}

function cancelV1() {
	mouseoverDrunkElementV2 = false;
	mouseoverDrunkElement = false;
	hideTooltip(); 
}

var animations;

function cancel() {
	cancelVis = true;
	svg.selectAll("g").remove();
	svg1.selectAll("g").remove();
	svg2.selectAll("g").remove();
	svg3.selectAll("g").remove();
	svg4.selectAll("g").remove();
	cancelV1();
	cancelV2();
	cancelV4();
	renderAllFunctions.forEach(function(d, i) {
		d[0]=false;
	});
	hideAllFunctions.forEach(function(d, i) {
		d[0]=false;
	});
}

// STUFF FOR V2 – OBAMA'S WAR ON WHISTLEBLOWERS
function renderVis2() {
	overlay(true);
}

function showWhistleblowerData(k) {
	wdata = eval("w"+k);
	renderV2Data();
	updateV2(1000);
}

function highlightWhistleblower(n) {
	unhighlightWhistleblowers();
	svg3.selectAll(".v2datalabel").attr("opacity", function(d, i) {
		if (d.name==n) {
			return 1;
		} else {
			return 0;
		}
	})
}

function unhighlightWhistleblowers() {
	svg3.selectAll(".v2datalabel").attr("opacity", 0);
	svg3.selectAll(".v2datalabeldesc").attr("opacity", 0);
}

function updateV2(dur) {
	updateV2Data(dur);
	updateV2Labels(dur);
	updateV2VisTitles(dur);
}
var v2titleyspace = 35;
var titlesubtitlespace = 22;
function updateV2Labels(dur) {
	svg3.selectAll(".v2titlelabel").attr("y", v2y0+v2titleyspace);
	svg3.selectAll(".v2subtitlelabel").attr("y", v2y0+v2titleyspace+titlesubtitlespace);
	
}

function renderV2() {
	drunkButtonMode = false;
	renderV2VisTitles();
}
var v2titledesccontent = ["The Obama Administration has prosecuted more", "whistleblowers under the Espionage Act than all", "previous administrations combined."];
function renderV2VisTitles() {
	var gr = svg3.append("g");
	gr.attr("class", "vistitleg").attr("opacity", 0).attr("display", "none");
	doTitleComponents(gr, "INTERACTIVE", "Obama's War on Whistleblowers", v2titledesccontent, 0);
}

function updateV2VisTitles(dur) {		
	svg3.selectAll(".vistitleg").transition()
		.duration(dur).attr("transform", "translate("+(getV2VisTitlesX())+", "+getV2TitleY()+")").attr("opacity", 1);
	svg3.selectAll(".interactivelabel")
		.attr("y", 0);	
	svg3.selectAll(".vistitle")
		.attr("y",allvistitleyspace);	
	svg3.selectAll(".visdesc").attr("y", function(thisd, thisi) {return allvistitledescyspace+(thisi*allvistitledescy)});
}

function unshowWhistleblowerTitles() {
	svg3.selectAll(".vistitleg").attr("opacity", 0).attr("display", "none")
	updateV2VisTitles(0);
}

function hideWhistleblowerVis() {
	console.log("hiding whistleblower vis")
	svg3.selectAll(".vistitleg").transition()
		.duration(1000)
		.attr("transform", "translate("+(getV2VisTitlesX()-5)+", "+getV2TitleY()+")")
		.attr("opacity", 0)
		.each("end", function() {
			svg3.selectAll(".vistitleg").attr("display", "none");
			wdata=wnone;	
		});

	svg3.selectAll(".v2presline").transition().duration(1000).attr("y2", 0);
	svg3.selectAll(".v2circle").attr("opacity", 0);
	svg3.selectAll(".v2axislabel").transition().duration(1000).attr("display", "none");
	svg3.selectAll(".v2circleim").transition().duration(1000).attr('width', 0).attr('height', 0)
}

function showWhistleblowerTitles() {
	svg3.selectAll(".vistitleg").attr("opacity", 0).attr("display", "block")
		.attr("transform", "translate("+(getV2VisTitlesX()-5)+", "+getV2TitleY()+")").attr("opacity", 1);
	
	updateV2VisTitles(vistitleduration);
		startInteractiveMode(fadevolumespeed);
		showWhistleblowerData(11);
		highlightWhistleblower('');
}



function getV2TitleY() {
	return Math.max(h*.3, 130);
}

function getV2VisTitlesX() {
	return v2x0;
}

function showV2Titles() {
	buildIn(svg3.select(".v2titlelabel"), "Whistleblowers Charged with Espionage", 0, "buildIn(svg3.select('.v2subtitlelabel'), 'by prosecuting administration', 0, '')");
}

function unshowV2Titles() {
	svg3.selectAll([".v2titlelabel", ".v2subtitlelabel"]).text("");
}

function getV2PresGroupTranslate(d, i) {

		if ((d.rank==0)||(wdata.length==0)) {
			return "translate("+(v2x0)+", "+(v2y0)+")";
		} else {
			var bpart;
			if (wdata[0].pres=="OBAMA ADMINISTRATION") {
			bpart = (wdata[0].whistleblowers.length)*b;
			} else {
				bpart = 0;
			}
			var xoff = v2x0+(a*d.rank)+(c*d.rank)+bpart;
			return "translate("+(xoff)+", "+(v2y0)+")";
		}
}

function getV2WGTranslate(d, i, off) {
	return "translate("+(c+(d.rank*b)+off)+", 0)";
}

function updateV2Data(dur) {
		var easetype = "back-out";
		svg3.selectAll(".presg")
			.transition()
				.ease(easetype)
				.duration(dur)
				.attr("transform", getV2PresGroupTranslate);
		
		svg3.selectAll(".wbg")
			.transition()
				.ease(easetype)
				.duration(dur)
					.attr("transform", function(d, i) {
						return getV2WGTranslate(d, i, 0);
					})
					.attr("opacity", 1);
		
		svg3.selectAll(".v2presline").attr("y2", -v2lineheight);
		svg3.selectAll([".v2circleim", ".v2circle"]).attr("r", faceradius).transition().duration(dur/2).attr("y", -v2lineheight-faceradius).attr('x',-faceradius).attr('width', 2*faceradius).attr('height', 2*faceradius).attr("cy", -v2lineheight)
		svg3.selectAll(".v2datalabel")
			.attr("x", -faceradius)
			.attr("y", -v2lineheight-faceradius-v2wtitleyspace);
		svg3.selectAll(".v2datalabeldesc")
				.attr("x", -faceradius)
				.attr("y", function(d, i) {
					return -v2lineheight-faceradius-(2*v2wtitleyspace)-(v2textyspace*(2-(d3.select(this).attr("k"))));
				});
	
}


function renderV2Data() {
		var update_sel = svg3.selectAll(".presg")
			.data(wdata, function(d, i) {return d.pres;});
		var ent = update_sel.enter().append("g");
		ent.attr("class", "presg")
			.attr("transform", getV2PresGroupTranslate);
		
		update_sel.exit().remove();

		ent.append("svg:line")
			.attr("class", "v2presline")
			.attr("x1", 0)
			.attr("x2", 0)
			.attr("y1", 0)
		ent.append("svg:text").attr("x", 5).attr("y", 0).attr("class", "v2axislabel")
			.attr("text-anchor", "start").attr("display", "block")
			.text(function(d, i) {return d.pres;})
			
		
		var updatew = update_sel.selectAll(".wbg")
			.data(function(d, i) {
				return d.whistleblowers;
			}, function(d, i) {
				return d.name});
		var entw = updatew.enter().append("g")
		.attr("class", "wbg")
		.attr("transform", function(d, i) {
				return getV2WGTranslate(d, i, -10);
			}).attr("opacity", 0);
		
		updatew.exit().remove();
		
		entw.append("svg:text")
			.attr("class", "v2datalabel").attr("opacity", 0)
			.text(function(d, i) {return d.name;});
			
		for (var k=0;k<3;k++) {
			entw.append("svg:text")
				.attr("class", "v2datalabeldesc")
				.attr("k", k)
				.attr("opacity", 0)
				.text(function(d, i) {
					var descarray = wdescs[d.name].split("//")
					if (!(descarray[k]==undefined)) {
						return descarray[k];
					}
					return "";
				})
		}
		
		entw.append("svg:image")
			.attr("class", "v2circleim")
			.attr('width', 2*faceradius)
			.attr('height', 2*faceradius)
			.attr("xlink:href",function(d, i) {return "img/faces-big_"+imnames[d.name]+".png";})
			.classed("clickable", true)
		   .on("mouseover", mouseoverface)
		   .on("mouseout", mouseoutface);
		entw.append("svg:circle")
			.attr("class", "v2circle")
			.attr("r", 0).classed("noclick", true).attr("opacity", facefilteropacity);	

}

function mouseoverface(d, i) {
	drunkButtonMode = false;
	svg3.selectAll([".v2datalabel", ".v2datalabeldesc"]).attr("opacity", 0);
	var parent = d3.select(this.parentNode);
	parent.select(".v2circle").transition().duration(50).attr("opacity", 0)
	parent.selectAll([".v2datalabel", ".v2datalabeldesc"]).transition().duration(200).attr("opacity", 1)
	parent.transition().duration(200).attr("transform", function(d, i) {
		return getV2WGTranslate(d, i, 0);
	})
}

function mouseoutface(d, i) {
	var parent = d3.select(this.parentNode);
	parent.select(".v2circle").transition().duration(50).attr("opacity", facefilteropacity);
	parent.selectAll([".v2datalabel", ".v2datalabeldesc"]).transition().duration(200).attr("opacity", 0);
	parent.transition().duration(200).attr("transform", function(d, i) {
		return getV2WGTranslate(d, i, 0);
	})
}



function renderV2Labels() {
	svg3.append("svg:text")
		.attr("class", "v2titlelabel")
		.classed("v1titlelabel", true)
		.classed("defaultdatacolor", true)
		.attr("x", v2x0)
		.text("")
	svg3.append("svg:text")
		.attr("class", "v2subtitlelabel")
		.classed("v1subtitlelabel", true)
		.classed("defaultdatacolor", true)
		.attr("x", v2x0)
		.text("");

}


var buildinTimeout;
function buildIn(e, str, index, callback) {
	e.text(str.substring(0, index))
	if (index<str.length) {
		buildinTimeout = setTimeout(function() {buildIn(e, str, index+1, callback)}, 20)
	} else {
		if (!(callback=="")) {
			eval(callback);
		}
	}
}

// STUFF FOR VIS 1
function renderVis1() {
	drunkButtonMode = false;
	v1part2g = svg1.append("g")
	v1barsg = svg1.append("g")
	v1part2g.attr("transform", "translate("+(vis1x0+vis1xspace)+", "+vis1part2y0+")");//.attr("opacity", 0);
	renderV1Axis();
	renderV1Data();
	renderV1Titles();
	updateAllV1(0);	
	renderV1Part2();
	
}


var interruptbargraph = false;

function unshowV1BarGraph() {
	clearTimeout(buildinTimeout);
	clearTimeout(v1tickstimeout);
	v1tickstimeout = "";
	svg1.selectAll([".v1baramt", ".v1bartype"]).attr("opacity", 0);	
	v1barsg.classed("noclick", true);
	
	v1barsg.selectAll(".v1bar").transition().each("end", function(d, i) {
		if (i==totspendingdata.length-1) {
			v1barsg.selectAll(".v1bar").attr("y", 0).classed("highlighted", false).attr("height", 0);
			buildIn(svg1.select("#v1bartitle1"), "", 0, "buildIn(svg1.select('#v1bartitle2'), '', 0, '')");
			v1barsg.selectAll([".v1axislabel", ".v1axis", ".v1ticklabel"])
			.classed("noclick", true)
				.attr("opacity", 0);
			interruptbargraph = false;
			v1barchartshowing = false;
			}
			
	});
	hideV1Titles(0);
	hideTooltip(); 
	
}

function startV1BarGraph() {
	v1part=0;
	v1barsg.classed("noclick", false);
	svg1.selectAll(["#v1bartitle1", "#v1bartitle2"]).text("").attr("opacity", 1)
	buildIn(svg1.select("#v1bartitle1"), "TOTAL INTELLIGENCE SPENDING", 0, "buildIn(svg1.select('#v1bartitle2'), 'actual and estimated', 0, '')");
	var bars = svg1.selectAll(".v1bar");
	bars.attr("height", 0).attr("y", 0).attr("opacity", 1)
		.classed("highlighted", false)
		.classed("clickable", true)
		.classed("noclick", false);
	svg1.selectAll(".v1datag").attr("opacity", 1);
}

function setupV1BarGraph() {
	v1part=0;
	v1barsg.classed("noclick", false);
	svg1.selectAll(["#v1bartitle1", "#v1bartitle2"]).text("").attr("opacity", 1)
	svg1.selectAll("#v1bartitle1").text("TOTAL INTELLIGENCE SPENDING")
	svg1.selectAll("#v1bartitle2").text("actual and estimated")

	svg1.selectAll(".v1bar").classed("highlighted", false)
		.classed("clickable", true)
		.classed("noclick", false);
	svg1.selectAll(".v1datag").attr("opacity", 1);
}

var v1tickstimeout = "";
function showV1Bars(year, dur) {
	prioritizeV1Part1();
	overlay(false);
	setupV1BarGraph();
	v1barsg.selectAll(".v1datag")
		.data(totspendingdata, function(d, i) {return d.year;})
		.attr("opacity", function(d, i) {
		if (d.year<=year) {
			return 1;
		} else {
			return 0;
		}
	
	})
	v1barsg.selectAll(".v1bar").attr("opacity", function(d, i) {
		if (d.year<year) {
			return 1;
		} else {
			return 0;
		}
		})
		.attr("height", getV1BarHeight).attr("y", getV1BarY)
		.classed("highlighted", function(d, i) {
			return ((d.year>=2001)||(d==hoveredv1bardata));
		})
	.transition().duration(dur)
		.attr("height", getV1BarHeight)
		.attr("y", getV1BarY)
		.attr("opacity", function(d, i) {
		if (d.year<=year) {
			return 1;
		} else {
			return 0;
		}
		})
	.each("start", function(d, i) {
			showSelectV1Ticks(year);
	
	})
	.each("end", function() {
		v1barsg.selectAll(".v1axislabel").attr("opacity", 1)
	})
	
	
	if (!(dur==0)) {
		hideV1Titles(0);
	}
	
}

function showSelectV1Ticks(year) {
	v1barsg.selectAll(".v1ticklabel").attr("opacity", function(d, i) {
			if ((isIn([1989, 2001, 2014], d.year))&&(d.year<=year)) {
				return 1;
			} else {
				return 0;
			}
		})
}
/**
function showV1Bar(index, numbars) {
	if ((index==numbars)||(interruptbargraph)) {
		return;
	} else {
		svg1.select("#v1bar-"+index)
			.transition()
				.duration(function(d, i) {
					if (index<=11) {
						return 500;
					} else {
						return 1000;
					}
				})
				.delay(function(d, i) {
					if (index<=11) {
						return 200;
					} else {
						return 500;
					}
				
				})
				.attr("height", getV1BarHeight)
				.attr("y", getV1BarY)
				.each("start", function(d, i) {
					setTimeout(function() {showV1Bar(index+1, numbars);}, 100)
					var p = (d3.select(this)[0][0]).parentNode;
					if ((d.year==1989)||(d.year==2001)||(d.year==2014)) {
						d3.select(p).select(".v1ticklabel").attr("opacity", 1)//.classed("highlighted", false)
					}
					if (d.year>=2001) {
						d3.select(p).select(".v1bar").classed("highlighted", true)
					}	
				})
				.each("end", function(d, i) {
					if (d.year==1989) {
						v1barsg.selectAll(".v1axis")
							.attr("x2", 0).classed("invisible", false)
							.transition()
								.duration(v1barduration)
								.attr("x2", v1scale(2014))
						v1barsg.selectAll(".v1axislabel").attr("opacity", 1)
					}
					if (d.year==2014) {
						svg1.select(".v1titlesg")
							.transition()
							.delay(200)
							.duration(1000)
							.attr("opacity", 1)
							.attr("transform", "translate("+(vis1x0+5)+", "+vis1titlesgy+")")
						//	.each("end", function() {v1bargraphrendering = false;});
					}
				});
	}
}**/

function showV1Titles(dur) {
	svg1.select(".v1titlesg").attr("display", "block")
		.transition()
		.delay(200)
		.duration(dur)
		.attr("opacity", 1)
		.attr("transform", "translate("+(vis1x0+5)+", "+vis1titlesgy+")");
}



function showV1BarGraph() {
	v1part=0;
	v1barsg.classed("noclick", false);
	svg1.selectAll(["#v1bartitle1", "#v1bartitle2"]).text("").attr("opacity", 1)
	buildIn(svg1.select("#v1bartitle1"), "TOTAL INTELLIGENCE SPENDING", 0, "buildIn(svg1.select('#v1bartitle2'), 'actual and estimated', 0, 'timedShowV1BarGraph();')");
}

function timedShowV1BarGraph() {
	var bars = svg1.selectAll(".v1bar");
	bars.attr("height", 0).attr("y", 0).attr("opacity", 1)
		.classed("highlighted", false)
		.classed("clickable", true)
		.classed("noclick", false);
	svg1.selectAll(".v1datag").attr("opacity", 1);
	v1barsg.selectAll([".v1axislabel", ".v1axis", ".v1ticklabel", "#v1bartitle1", "#v1bartitle2"])
	.classed("noclick", false);
	var baroffset = 1000;	
	showV1Bar(0, totspendingdata.length)
}

function hideV1BarGraph() {
	hideV1Titles(1000);
	clearTimeout(v1tickstimeout);
	v1tickstimeout = "";
	svg1.selectAll([".v1baramt", ".v1bartype"]).classed("noclick", true).classed("clickable", false).attr("opacity", 0);	
	v1part2g.classed("noclick", false);

	v1barsg.classed("noclick", true);
	v1barsg.classed("clickable", false);
	v1part = 1;
	v1barsg.selectAll([".v1axislabel", ".v1axis", ".v1ticklabel", "#v1bartitle1", "#v1bartitle2"])
	.classed("noclick", true).classed("clickable", false)
		.transition()
		.duration(300)
		.attr("opacity", 0)
		
	v1barsg.selectAll(".v1bar").classed("highlighted", false)
		.classed("noclick", true)
		.classed("clickable", false)
		.transition().duration(1000)
			.attr("y", 0)
			.attr("height", 0)
			.attr("opacity", 0);
	v1barchartshowing = false;
	hideTooltip(); 

}

function hideV1Titles(dur) {
		svg1.select(".v1titlesg")
		.transition()
		.duration(dur)
		.attr("opacity", 0)
		.attr("transform", "translate("+(vis1x0)+", "+vis1titlesgy+")").each("end", function() {
			svg1.select(".v1titlesg").attr("display", "none")
		})
	
}

var spendingcolors = {"CRS":"#bcbbad", "Commission":"#bcbbad", "Actual": "#bcbbad"};
var spendingcolorspart2 = {"active":"#bcbbad", "inactive":"#1E1C1E"};

function fillSpendingBars(d, i) {
	return spendingcolors[d.type];

}

function fillSpendingBarsPart2(d, i) {
	if (isIn(validyears, d.year)) {
	return spendingcolorspart2.active;
	} 
	return spendingcolorspart2.inactive;
}


function isIn(array, element) {
	return (!(array.indexOf(element)==-1));
}

function renderV1Part2() {

	renderV1Part2Axes();
	renderV1Part2DotGroups();
	
	renderV1Part2Titles();
	
	updateV1Part2(0);
}
// LOOK HERE
function renderV1Part2Titles() {
	var v1p2group = v1part2g.append("g").attr("class", "v1part2titlesg").attr("opacity", 0);

	doTitleComponents(v1p2group, "INTERACTIVE", "Writing Blank Checks", 
	["After 9/11, intelligence agencies experienced", 
	"staff growth and massive budget increases.", 
	"This graph shows real data for years it was ", 
	"declassified, and expert estimates otherwise."], 0)

}
var hoveredv1bardata = "";
function mouseoverV1Bar(d, i) {
	if (v1barchartshowing) {
		hideTooltip(); 
		//if (interactiveMode) {
		hoveredv1bardata = d;
		drunkButtonMode = false;
		if (d.year==yearToDrunk) {
			mouseoverDrunkElement = true;
		}
		if (v1part==0) {
			var selectedg = svg1.select("#v1datag-"+d.year);
			hoverV1G(selectedg);
		}
	}
}

function mouseoutV1Bar(d, i) {
	if (v1barchartshowing) {
		hoveredv1bardata = "";
		if (v1part==0) {
		 unhoverV1G(svg1.select("#v1datag-"+d.year));
		}
	}
}

function renderV1Part2DotGroups() {
	var v1part2datag = v1part2g.selectAll(".v1part2datag")
		.data(spendingdata)
		.enter().append("g");
	v1part2datag.attr("class", "v1part2datag");
	renderV1Part2Dots(v1part2datag);
	renderV1Part2Labels(v1part2datag);
	
	
}

var agencydesc = {"NSA":"Signals intelligence ", "CIA":"Foreign intelligence, covert ops", "NRO":"Reconnaissance satellites"}
var agencyfullnames = {"NSA":"NSA", "CIA":"CIA", "NRO":"NATL. RECON. OFFICE"}

var dotlabelyspace = 17
var dotlabelyoffset = 5;
function renderV1Part2Labels(g) {
var dotlabelg = g.append("g").attr("class", "dotlabelg").attr("opacity", 0).classed("noclick", true);
	dotlabelg.append("svg:text")
		.attr("class", "dotlabel")
		.classed("noclick", true)
		.classed("dotlabelname", true)
		.classed("noclick", true)
		.attr("x", function(d, i) {return 0})//-getDotR(d,i);})
		.attr("y", function(d, i) {return -getDotR(d,i)-dotlabelyoffset-(0*dotlabelyspace);})
		.attr("text-anchor", "middle")
		.classed("defaultdatacolor", true)
		.classed("sansserif", true)
		.text(function(d, i) {return agencyfullnames[d.name];})
	dotlabelg.append("svg:text")
		.attr("class", "dotlabel")
		.classed("noclick", true)
		.classed("noclick", true)
		.classed("dotlabeldesc", true).attr("opacity", 0)
		.attr("x", function(d, i) {return 0})//-getDotR(d,i);})
		.attr("y", function(d, i) {return -getDotR(d,i)-dotlabelyoffset-(1*dotlabelyspace);})
		.attr("text-anchor", "middle")
		.classed("defaultdatacolor", true)
		.classed("sansserif", true)
		.text(function(d, i) { 
			if ((d.name=="NSA")&&(d.year==2004)) {
				return "$"+d.budget+"b, "+"unknown number of employees";
			} else {
				return "$"+d.budget+"b, "+d.staff+"k employees"
			}	
		});
}

function updateV1Part2DotGroups(dur) {
	v1part2g.selectAll(".v1part2datag")
		.transition()
		.duration(dur)
		.attr("transform", function (d, i) {return "translate("+getDotGroupX(d,i)+", "+getDotGroupY(d,i)+")"});
		
		
}

function showV1Part2Titles() {
	v1part2g.selectAll(".v1part2titlesg").attr("opacity", 1).attr("display", "block")
	.attr("transform", function (d, i) {return "translate("+(getV1Part2TitlesX()-5)+", "+(getV1Part2TitlesY())+")"})
		.transition()
		.duration(1000)
		.attr("opacity", 1)
		.attr("transform", function (d, i) {return "translate("+(getV1Part2TitlesX())+", "+(getV1Part2TitlesY())+")"});
}

function showV1Part2TitlesNoTransition() {
	v1part2g.selectAll(".v1part2titlesg").attr("display", "block").attr("opacity", 1).attr("transform", function (d, i) {return "translate("+getV1Part2TitlesX()+", "+getV1Part2TitlesY()+")"});
}

function hideV1Part2Titles(dur) {
	v1part2g.selectAll(".v1part2titlesg").transition().duration(dur).attr("opacity", 0).each("end", function() {
			v1part2g.select(".v1part2titlesg").attr("display", "none")
		}).each("end", function() {
			v1part2g.selectAll(".v1part2titlesg").attr("display", "none");
		})
}

function getV1Part2TitlesX() {
	return (-w*.48);
}

function getV1Part2TitlesY() {
	
	return Math.min((-h*.109), -150);
}

var v1selectedyear = 1996;

function mouseoverDot(d, i) {
	drunkButtonMode = false;
	if ((d.year==yearToDrunkV2)&&(d.name==agencyToDrunk)) {
		mouseoverDrunkElementV2 = true;
	}
	
	v1part2g.selectAll(".v1part2xaxislabel").classed("highlighteddotlabel", function(thisd, thisi) {if (thisd==d.year){return true;} else {return false;}});
	v1part2g.selectAll(".v1dot").classed("highlighteddot", function(thisd, thisi) {if (thisd.name==d.name){return 1;} else {return 0;}})
	v1part2g.selectAll(".dotlabelg").attr("opacity", function(thisd, thisi) {if (thisd==d){return 1;} else {return 0;}});
	v1part2g.selectAll(".dotlabelg").selectAll(".dotlabeldesc").attr("opacity", function(thisd, thisi) {if (thisd==d){return 1;} else {return 0;}});
}

function mouseoutDot(d, i) {
	v1part2g.selectAll(".v1dot").classed("highlighteddot", false)//.classed("secondaryhighlighteddot", false);
	v1part2g.selectAll(".v1part2xaxislabel").classed("highlighteddotlabel", false);
	v1part2g.selectAll(".dotlabelg").attr("opacity", 0);
	v1part2g.selectAll(".dotlabelg").selectAll(".dotlabeldesc").attr("opacity", 0);
}
var dotcolors = {"NSA":"#9C2363", "CIA":"#2277B9", "NRO":"#8CC349"}

function fillDots(d, i) {
	return dotcolors[d.name];
}

function renderV1Part2Dots(g) {
	g.append("svg:circle")
		.attr("class", "v1dot")
		.attr("r", 0)
		.attr("fill", fillDots)
		.classed("clickable", true).on("mouseover", mouseoverDot).on("mouseout", mouseoutDot);

}
var minr = 4;
var maxr = 25;
var ascale = d3.scale.sqrt().domain([1.7, 40]).range([minr, maxr]);
function getDotR(d, i) {
	return ascale(d.staff);
}

function updateV1Part2Dots() {
	v1part2g.selectAll(".v1dot").attr("cx", 0).attr("cy", 0);
}

function getDotGroupY(d, i) {
	return -v1part2heightscale(d.budget);
}

function getDotGroupX(d, i) {
	return v1part2xscale(d.year);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getClosestExistingData(d, selectedyear) {
	var tmpyear = selectedyear;
	if (tmpyear<1996) {
		return 1996;
	}
	while (tmpyear>1990) {
		if (dataExists(d, tmpyear)) {
			return tmpyear;
		}
		
		tmpyear=tmpyear-1;
	}
	
}

function dataExists(d, selectedyear) {
	return !(d[selectedyear]==undefined);
}

function renderV1Part2Axes() {

	v1part2g.append("svg:line")
		.attr("class", "v1part2xaxis")
		.classed("axis", true).attr("opacity", 0);

	v1part2g.append("svg:text")
		.attr("class", "v1part2ytitle")
		.attr("text-anchor", "start")
		.classed("sansserif", true)
		.classed("v1titlelabel", true)
		.text("")
		.classed("v1label", true).attr("opacity", 0)
	v1part2g.append("svg:text")
		.attr("class", "v1part2ytitle2")
		.attr("text-anchor", "start")
		.classed("sansserif", true)
		.classed("v1subtitlelabel", true)
		.text("")
		.classed("v1label", true)
		
	v1part2g.selectAll(".v1part2yaxislabel")
		.data(v1part2yaxeslabels)
		.enter().append("svg:text")
		.attr("class", "v1part2yaxislabel")
		.classed("v1label", true)
		.classed("v1axislabel", true)
		.classed("defaultaxislabel", true)
		.text(function(d, i){
			if (d==0) {
				return d;
			}
			return "$"+d+"b";}).attr("opacity", 0)
	v1part2g.selectAll(".v1part2xaxislabel")
		.data(v1part2xaxeslabels)
		.enter().append("svg:text")
		.attr("class", "v1part2xaxislabel")
		.classed("v1label", true)
		.classed("v1axislabel", true)
		.classed("defaultaxislabel", true)
		.text(function(d, i) {
			return d;}).attr("opacity", 0);
}

function updateV1Axes(dur) {
	v1part2g.select(".v1part2xaxis").attr("x1", 0).attr("y1", 0).attr("y2", 0).attr("x2", v1part2xscale(2019));
	v1part2g.select(".v1part2yaxis").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", -v1part2heightscale(17.5))
	v1part2g.selectAll(".v1part2yaxislabel").attr("x", -4)
		.attr("y", function(d, i) {
			return -v1part2heightscale(d)+4;})
			
	v1part2g.selectAll(".v1part2xaxislabel").attr("x", function(d, i) {
			return v1part2xscale(d)+5;})
		.attr("y", 25)
		
		
	v1part2g.select(".v1part2ytitle").attr("x", 0)
		.attr("y",  -v1part2heightscale(19))
	
	v1part2g.select(".v1part2ytitle2").attr("x", 0)
		.attr("y",  -v1part2heightscale(19)+v1subtitleyspace)
	v1part2g.select(".v1part2xtitle").attr("x", v1part2xscale(2013))
		.attr("y",  35)
}

function updateV1Part2(dur) {
	//updateV1Part2Nav(dur);
	updateV1Axes(dur);
	updateV1Part2Dots(dur);
	updateV1Part2DotGroups(dur);
	v1part2g.attr("transform", "translate("+(vis1x0+vis1xspace)+", "+vis1part2y0+")");

	v1part2g.selectAll(".v1part2titlesg")
	.attr("transform", function (d, i) {return "translate("+(getV1Part2TitlesX())+", "+(getV1Part2TitlesY())+")"});

	
}

function fadeInText(e, str, dur) {
		e.attr("opacity", 0).text(str)
						.transition()
						.duration(dur)
						.attr("opacity", 1)
}

function fadeOutText(e, dur) {
		e.attr("opacity", 1)
						.transition()
						.duration(dur)
						.attr("opacity", 0)
}


function renderV1Titles() {
	
	var grp = svg1.append("g").attr("class", "v1titlesg").attr("opacity", 0);

	doTitleComponents(grp, "INTERACTIVE", "Intelligence Industry Boom, Post 9/11", ["The total intelligence budget is officially classified for certain years.", "The graph below shows actual data for years it has been declassified,", "and estimates from experts for the rest."], 0)
	updateV1Titles(0);
}

function renderV1Axis() {


	v1barsg.append("svg:text")
		.attr("class", "v1axislabel")
		.classed("defaultdatacolor", true)
		.attr("opacity", 0)
		.text("$"+totspendingdata[0].amt+"b");
	
	v1barsg.append("svg:text")
		.attr("class", "v1titlelabel")
		.attr("id", "v1bartitle1")
		.classed("defaultdatacolor", true)
		.attr("x", 0)
		.attr("y", v1y0titlepos)
	v1barsg.append("svg:text")
		.attr("class", "v1subtitlelabel")
		.attr("id", "v1bartitle2")
		.classed("defaultdatacolor", true)
		.attr("x", 0)
		.attr("y", v1y0titlepos+v1subtitleyspace)
		
	updateV1Axis(0);
}

function updateV1Axis(dur) {
	v1barsg.selectAll(".v1axis")
		.attr("x2", v1scale(2014))
		.attr("y1", -v1heightscale(totspendingdata[0].amt))
		.attr("y2", -v1heightscale(totspendingdata[0].amt));
	v1barsg.selectAll(".v1axislabel").attr("x", -7).attr("y", -v1heightscale(totspendingdata[0].amt)+10)
	v1barsg.selectAll(".v1subtitlelabel")
		.attr("y", v1y0titlepos+v1subtitleyspace)
}


function updateV1Titles(dur) {

	svg1.select(".v1titlesg").attr("transform", "translate("+vis1x0+", "+vis1titlesgy+")");
	svg1.selectAll([".v1ticklabel", ".v1barlabelg"]).attr("transform", "translate("+getV1BarWidth()/2.0+", 0)");
	
	svg1.selectAll(".interactivelabel")
		.attr("y", 0);	
	svg1.selectAll(".vistitle")
		.attr("y",allvistitleyspace);	
	v1barsg.selectAll(".visdesc").attr("y", function(thisd, thisi) {return allvistitledescyspace+(thisi*allvistitledescy)});
	
	
}


function doTitleComponents(gr, t1, t2, t3, ypos) {
	gr.append("svg:text")
		.attr("class", "vist")
		.classed("interactivelabel", true)
		.attr("fill", "#fac800")
		.classed("sansserif", true)
		.attr("y", ypos)
		.text(t1)
		
	gr.append("svg:text")
		.attr("class", "vist")
		.classed("vistitle", true)
		.classed("serif", true)
		.attr("y", ypos+allvistitleyspace)
		.text(t2)
	
	t3.forEach(function(thisd, thisi){
		gr.append("svg:text")
		.attr("class", "vist")
		.classed("visdesc", true)
		.classed("serif", true)
		.attr("y", ypos+allvistitledescyspace+(thisi*allvistitledescy))
		.text(thisd)
	})
	
	gr.append("svg:image")
		.attr("class", "tinyshare")
		.classed("tinysharefacebook", true)
		.attr("xlink:href", "img/smallsharebuttons-01.png")
		.attr("width", 24)
		.attr("height", 19)
		.classed("tinyshareyoffset", function() {return tinyShareOffset(t3.length);})
		.attr("x", 0)
		.classed("clickable", true)
		.on("click", function(d, i) { 
			d3.event.preventDefault()
			interactivesPostToTwitter(getHashtag(), getLongTitle());});
		
	gr.append("svg:image")
		.attr("class", "tinyshare")
		.classed("tinysharetwitter", true)
		.attr("xlink:href", "img/smallsharebuttons-02.png")
		.attr("width", 24)
		.attr("height", 19)
		.classed("tinyshareyoffset", function() {return tinyShareOffset(t3.length);})
		.attr("x", 40)
		.classed("clickable", true)
		.on("click", function(d, i) { 
			d3.event.preventDefault()
			interactivesPostToFacebook(getHashtag());
		});
		
	gr.append("svg:image")
		.attr("class", "tinyshare")
		.classed("tinysharecopylink", true)
		.attr("xlink:href", "img/smallsharebuttons-03.png")
		.attr("width", 24)
		.attr("height", 19)
		.classed("tinyshareyoffset", function() {return tinyShareOffset(t3.length);})
		.attr("x", 77)
		.classed("clickable", true)
		.on("click", function(d, i) { 
			d3.event.preventDefault()
			openInNewTab(getHashtag());
		});
		
	gr.append("svg:text")
		.classed("sharetext", true)
		.classed("sansserif", true)
		.classed("sharetextyoffset", function() {
			return tinyShareOffset(t3.length);})
		.text("SHARE THIS GRAPHIC")	
		.classed("clickable", true)
		.attr("x", 113)
		.on("click", function(d, i) { 
			d3.event.preventDefault()
			openInNewTab(getHashtag());
		});
	
}

function tinyShareOffset(descl) {
	if (descl==4) { 
		return true;
	} else {
		return false;
	}
}


function openInNewTab(hashtag) {
  var win = window.open(basurl+"#"+hashtag, '_blank');
  win.focus();
}

function getHashtag() {
	if (vidid==1) {
		if (v1part==0) {
			return "budget";
		} else {
			return "agencies";
		}
	} else if (vidid==2) {
		return "timeline";
	} else if (vidid==3) {
		return "whistleblowers";
	} else {
		return "";
	}
}

function getLongTitle() {
	if (vidid==1) {
		if (v1part==0) {
			return "Post–9/11 intelligence budget boom, visualized via @ajplus";
		} else {
			return "Post–9/11 intelligence agencies boom, visualized via @ajplus";
		}
	} else if (vidid==2) {
		return "See Thomas Drake's journey from the highest levels of government service to an espionage charge, via @ajplus";
	} else if (vidid==3) {
		return "Obama has prosecuted more whistleblowers for espionage than all previous presidents combined, via @ajplus";
	} else {
		return "";
	}
}



function renderV1Data() {
	var g = v1barsg.selectAll(".v1datag")
		.data(totspendingdata, function(d, i) {return d.year;})
		.enter().append("g").attr("opacity", 0)
		.attr("class", "v1datag").attr("id", function(d, i) {return "v1datag-"+d.year;});
		
		var grp = v1barsg.selectAll(".v1datag")
		
	updateEachBarG(0);
	renderBarsV1(grp);
	renderBarsV1Titles(grp);
	v1barsg.selectAll(["#v1axis1989", "#v1axis2014"]).classed("highlighted", false);
}

function renderBarsV1Titles(g) {
	g.append("svg:text")
		.attr("class", "v1ticklabel")
		.classed("defaultdatacolor", true)
		.attr("id", function(d, i) {
			if (d.year==1989) {
				return "v1axis1989";
			} else if (d.year==2001) {
				return "v1axis2001";
			} else if (d.year==2014) {
				return "v1axis2014";
			}
			return "v1-drunk-"+i;
		})
		.attr("opacity", 0)
		.classed("highlighted", true)
		.attr("y", function(d, i) {
			if (isIn([1990, 1991, 1999, 2000, 2002, 2003, 2012, 2013], d.year)) {
				return 25;
			} else {
			return 15;
			}
		})
		.text(function(d, i) {return d.year;})
		
	var labelg = g.append("g");
	labelg.attr("class", "v1barlabelg")
		.attr("opacity", 0)
		.attr("id", function(d, i) {return "labelg-"+d.year;});
	
	labelg.append("svg:text")
		.attr("class", "v1baramt")
		.classed("sansserif", true)
		.classed("highlighted", true)
		.attr("text-anchor", getV1LabelTextAnchor)
		.attr("id", function(d, i) {return "v1baramt"+d.year})
		.attr("x", getV1LabelX)
		.attr("y", function(d, i) {return -1*(v1heightscale(d.amt)+25)})
		.text(function(d, i) {return "$"+d.amt+"b";});
	labelg.append("svg:text")
		.attr("class", "v1bartype")
		.classed("sansserif", true)
		.classed("highlighted", true)
		.attr("id", function(d, i) {return "v1bartype"+d.year})
		.attr("x", getV1LabelX)
		.attr("y", function(d, i) {return -1*(v1heightscale(d.amt)+10)})
		.attr("text-anchor", getV1LabelTextAnchor)
		.text(function(d, i) {
			if (d.type=="Actual") {
				return "actual";
			} else {
				return "estimate";
			}
			});
}

function getV1LabelTextAnchor(d, i) {
	if ((d.year>2010)||(d.year<1995)) {
		return "start";
	} else if ((d.year<2010)&&(d.year>2000)) {
		return "end";
	} else {
		return "middle";
	}
}

function getV1LabelX(d, i) {
	if ((d.year>2010)||(d.year<1995)) {
		return (-.5*getV1BarWidth())+2;
	} else if ((d.year<2010)&&(d.year>2000)) {
		return (.5*getV1BarWidth())-2;
	} else {
		return 0;
	}

}

function hoverV1G(selectedg) {
	selectedg.moveToFront();
	selectedg.selectAll([".v1barlabelg", ".v1ticklabel", ".v1bar"]).attr("opacity", 1).classed("highlighted", true)
	selectedg.selectAll([".v1baramt", ".v1bartype"]).attr("opacity", 1);	
}

function unhoverV1G(selectedg) {
	selectedg.selectAll([".v1barlabelg", ".v1ticklabel"]).attr("opacity", 0)
	v1barsg.selectAll(["#v1axis1989", "#v1axis2001", "#v1axis2014"]).attr("opacity", 1).classed("highlighted", false);
	v1barsg.selectAll([".v1bar"]).attr("opacity", 1).classed("highlighted", false).classed("defaultdatacolor", true);;
}

function updateEachBarG(dur) {
	v1barsg.selectAll(".v1datag").attr("transform", function(d, i) {
		return "translate("+v1scale(d.year)+", 0)";
	});
}

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

function renderBarsV1(g) {
	g.append("svg:rect")
		.attr("class", "v1bar")
		.attr("id", function(d, i) {return "v1bar-"+i})
		.attr("x", 0)
		.attr("fill", fillSpendingBars)
		.classed("clickable", true)
		.on("mouseover", mouseoverV1Bar)
		.on("mouseout", mouseoutV1Bar);
	updateBarsV1(0);
}

function updateBarsV1(dur) {
	svg1.selectAll(".v1bar")
		.attr("width", getV1BarWidth)
		.attr("y", getV1BarY)
		.attr("height", getV1BarHeight)
		
		
	svg1.selectAll(".v1baramt")
		.attr("y", function(d, i) {return -1*(v1heightscale(d.amt)+25)})
		.attr("x", getV1LabelX)
		.text(function(d, i) {return "$"+d.amt+"b";});
	svg1.selectAll(".v1bartype").attr("x", getV1LabelX).attr("y", function(d, i) {return -1*(v1heightscale(d.amt)+10)})
	
}

function getV1BarY(d, i) {
	return -1*getV1BarHeight(d, i);
}

function getV1BarHeight(d, i) {
	return (v1heightscale(d.amt));
}

function getV1BarWidth() {
	return (v1scale.range()[1] - v1scale.range()[0])/(totspendingdata.length);
}


function updateBarsG(dur) {
	v1barsg.attr("transform", "translate("+(vis1x0+vis1xspace)+", "+vis1y0+")");
}

function updateAllV1(dur) {
	updateV1Axis(dur);
	updateBarsG(dur);
	updateBarsV1(dur);
	updateEachBarG(dur);
	updateV1Titles(dur);
	updateV1Part2(dur);
	
	updateTooltip();
	
}


setup();

function setup() {
	setInterval(updateVis, 10);
	
	$(document).click(function() {
		hideTooltip();
		unhoverInteractiveMenu();
	});

}

function setupV2() {
	svg3.attr("opacity", 0);
	wdata = w11;
	renderV2Data();
	renderV2Labels();
	updateV2(0);
	setTimeout(function() {
		showWhistleblowerData('none');
		svg3.attr("opacity", 1);

	}, 500)

}

function overlay(show) {

	if (show) {
		d3.select("#overlayid").transition().duration(3000).style("opacity", 1);
	} else {
		d3.select("#overlayid").transition().duration(3000).style("opacity", 0);
	}
}

function overlayNoTransition(show) {
	if(show) {
		d3.select("#overlayid").style("opacity", 1);
	} else {
		d3.select("#overlayid").style("opacity", 0);
	}	
}
