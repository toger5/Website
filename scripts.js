/*was muss nun noc gemacht werden
also
wenn man rotate to next aufruft dann soll zu dem inspect string das element dazugamcht werden
über all wo ich dann den inspect strin aufrfe will ich dann immmer nur das letzte elemnt des string verwenden
das hat den vorteil dass ich jedes div dann immmer nur einmal drehen kann und dass ich alle divs wieder zurück drehen kann.

dann muss nich eine Funktin gschrieben werden die es ermöglicht dass alle elemente mit dem sleben namen (die zu einem gemiensamen artikel gehören)
gefunden werde und an die selbe stele bewegt werden.
*/


// TAGS
 var DESIGN = "design";
 var BLENDER = "blender";
 var HIGHSCHOOL = "highschool";
 var ENGINEERING = "engineering";
 var RC = "rc";
 var SWIFT = "swift";
 var INTERN = "intern";
 var GAMEDEV = "game development";
 var GODOT = "godot";
 var tags = [DESIGN,BLENDER,HIGHSCHOOL,ENGINEERING,RC,SWIFT,INTERN,GAMEDEV,GODOT];

//Liste Fuer alle artil und ihre anordnung:
var articleList = [{
        file: "long_board.html",
        tags: [HIGHSCHOOL,BLENDER,ENGINEERING,DESIGN]
    }, {
        file: "headphones1.html",
        tags: [BLENDER, DESIGN]
    }, {
        file: "hillClimbRacing.html",
        tags: [BLENDER,DESIGN,GAMEDEV]
    }, {
        file: "appStoreStats.html",
        tags: []
    }, {
        file: "fillColorApp.html",
        tags: []
    }];
//-----------------
var inspectmode = false;
var inspectID = [];

var page = 0;

/*setup von der seite (laden aller elemente)*/

var articleNumberCoutner = 0;
var innerHTMLtext = "";

function load_articles(number) {
    console.log(number);
    var article = articleList[number];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //document.getElementById("demo").innerHTML = xhttp.responseText;


            if (articleList.length > number) {
                console.log(xhttp.responseText);
                innerHTMLtext += xhttp.responseText;
            }
            if (articleList.length > number + 1) {
                articleNumberCoutner += 1;
                console.log("adsgsag");
                load_articles(articleNumberCoutner);

            } else {
                textInsideReady();
            }
            //document.getElementById("root_site").innerHTML = xhttp.responseText;//"Paragraph changed!";
        }
    };
    xhttp.open("GET", "http://timo.kandra.tech/articles/" + article.file, true);
    xhttp.send();
}

load_articles(articleNumberCoutner);

window.onscroll = testScroll;
//window.onclick = click
function textInsideReady() {
    console.log("done");
    console.log(innerHTMLtext);
    document.getElementById("root_site").innerHTML = innerHTMLtext;
    document.getElementById("hider").remove()
}

$(document).ready(function() {

    $("body").click(function(event) {
        var tar = $(event.target)
        page_click(tar);
    });
});
/*für jeden Artikel muss man eine zeile an code hinzufügen, damit die ganzen artik an die rihtige stelle verschoben werden. für jeden Artikel braucht es eine andere ID*/

function getInspected() {
    return inspectID[page]
}

function getInspectedNameOnly() {
    n = inspectID[0]
    return n.slice(0, n.length - 2)
}

function inspect() {
    if (inspectID.length == 0) {
        return false;
    }
    return true;
}

function page_click(target) {
    targetID = target.attr("id");
    while (targetID === undefined) {
        console.log("nnnnnnnnnnnnnnnn");
        targetID = target.parent().attr("id");
        target = target.parent()
    }
    console.log("page: " + page);
    console.log(targetID + "      ::       " + getInspected());
    console.log("parents: " + target);
    if (inspect()) {
        if (targetID == getInspected() /*|| target.parents("#"+getInspected()).attr("id") == getInspected()*/ ) {
            rotateToNextPage();
        } else if (targetID.slice(0, targetID.length - 2) == getInspectedNameOnly() /* || target.parent().attr("id").slice(0,target.parents("#"+getInspected()).attr("id").length - 2) == getInspectedNameOnly()*/ ) {
            gotoPage(parseInt(targetID.slice(-2)));
        }
    }
}

function rotateToNextPage() {
    if (page < inspectID.length - 1) {
        console.log("es wurde page: " + page + " gedreht")
        amount = 90 - 2.5 * (page + 1);
        $("#" + getInspected()).css({
            transformOrigin: '0px 0px'
        }).transition({
            rotate: "-=" + amount + "deg"
        }, 800);
        page += 1;
    }
}

function rotateToLastPage() {

    $("#" + inspectID[page - 1]).css({
        transformOrigin: '0px 0px'
    }).transition({
        rotate: "0deg"
    }, 800, "easeOutExpo");
    page -= 1;
    //console.log("laenge der liste: "  + inspectID.length + " somit: " + getInspected());
    //inspectID.pop();
    //console.log("laenge der liste: "  + inspectID.length + " somit: " + getInspected());

}

/*
function callToForeground(){
	newMainWindow = document.getElementById(getInspected());
	newMainWindow.onClick = function(){gotoPage(inspectID.length - 1)};
	coverobj = document.getElementById(inspectID[0]);
	lastobj = document.getElementById(inspectID[page - 1]);
	//alert(inspectID[inspectID.length - 2])
	/*alert(window.innerHeight);
	var strHeight = toString(window.innerHeight) + "px";
	alert(strHeight);

	newMainWindow.style.height = window.innerHeight.toString() + "px";
	newMainWindow.style.zIndex = lastobj.style.zIndex - 1;

	newMainWindow.style.top = coverobj.offsetTop + "px";
	console.log(lastobj.style.zIndex - 1);
}
*/

function gotoPage(numberToGo) {
    console.log("page " + page + "number to go : " + numberToGo)
    if (page != numberToGo && inspect()) {
        while (page < numberToGo) {
            rotateToNextPage();
        }
        while (page > numberToGo) {
            rotateToLastPage();
        }
    }
}

function testScroll(ev) {
    if (inspect()) {
        resetInspect(false);
    }
}


function resetInspect(scroll) {
    page = 0;
    for (index = inspectID.length - 1; index > -1; index--) {
        /*d = (inspectID.length - index - 1) * 150*/
        //document.getElementById(inspectID[index]).style.zIndex -= 100;
        if (index == 0) {
            $("#" + inspectID[index]).css({
                transformOrigin: '0px 0px'
            }).transition({
                height: "600px",
                /*, delay: d*/
                rotate: "0deg",
                /*, delay: d*/
            }, 800, "easeOutExpo");
            /*$("#"+inspectID[index]).css({ transformOrigin: '0px 0px' }).transition({
            	rotate : "0deg"/*, delay: d*/
            //}, 800, "easeOutExpo");

            if (scroll) {
                console.log("es scrollt")
                var e = document.getElementById(inspectID[0]);

                posTo = e.offsetTop - (window.innerHeight - 600) / 2;
                //setTimeout(function(){
                $("body,html").animate({
                    scrollTop: posTo
                }, 800, "easeOutExpo");
                //	}, 10);

                /*}else{
                	$("#"+inspectID[index]).css({ transformOrigin: '0px 0px' }).transition({
                		height : "600px"
                	}, 800, "easeOutExpo");*/
            }
        } else {

            $("#" + inspectID[index]).css({
                transformOrigin: '0px 0px'
            }).transition({
                rotate: "0deg" /*, delay: d*/
            }, 800, "easeOutExpo");
        }
    }
    /*if(scroll){
    	var e = document.getElementById(inspectID[0]);

    	posTo = e.offsetTop - 200 /*((parseInt(window.innerHeight) - parseInt(e.style.height))/2)*/
    ;
    /*$("body,html").animate({
			scrollTop : posTo, delay : 800
		},810,"easeOutExpo")
	}*/
    inspectID = [];
}

function scrollToItem(itemName) {
    if (!inspect()) {
        var e = document.getElementById(itemName);
        scrollAnimationTo(e.offsetTop);
        sizeToWindow(itemName);
        setTimeout(function() {
            fillInspectID(itemName);
        }, 600);
    }
}

function fillInspectID(Name0) {
    //inspectID.push(Name0);
    var name = Name0.slice(0, Name0.length - 2)
    var nummer = 0;
    leist = document.getElementsByClassName("ArtikelText")
    for (index = 0; index < leist.length; index++) {
        leist[index].style.zIndex = 0
            //alert(leist[index].id + " " + leist[index].style.zIndex)

    }
    var filling = true;
    while (filling) {
        //neue ID Nummer Bauen


        var nummerStr = nummer;
        if (nummerStr.toString().length == 1) {
            nummerStr = "0" + nummerStr;
        }

        //neuen IdNamen bauen
        var NeuID = name + nummerStr;

        //neuen Namen checken
        if (document.getElementById(NeuID) != null) {
            inspectID.push(NeuID);

            newMainWindow = document.getElementById(NeuID);
            coverobj = document.getElementById(inspectID[0]);
            newMainWindow.style.zIndex = 101 - nummer;
            if (nummer > 0) {
                newMainWindow.style.height = window.innerHeight.toString() + "px";
                newMainWindow.style.top = coverobj.offsetTop + "px";
            }
            console.log("zIndex: " + document.getElementById(NeuID).style.zIndex + " object: " + NeuID)
        } else {
            filling = false
        }
        nummer += 1;

    }

    console.log("das ist die erstellte isnepct liste für dieses kapitel:  " + inspectID)
}

function scrollAnimationTo(positionTo) {
    //scroll smooth
    console.log("_______________animation scroll soll zu pubkt " + positionTo + " ausgeführt werden")
    $("body,html").animate({
        scrollTop: positionTo
    }, 500, "easeOutExpo")
}

function sizeToWindow(iName) {

    $("#" + iName).animate({
        height: window.innerHeight
    }, 500, "easeOutExpo")
}


function gototop() {
    resetInspect(false);
    scrollAnimationTo(0);

}

/*
function changeUP(id){
	var Icon = document.getElementById(id);
	Icon.style.opacity = 1;
}
function changeDOWN(id){
	var Icon = document.getElementById(id);
	Icon.style.opacity = 0.5;
}
*/

/*
function getPosition(element) {
	var xPosition = 0;
	var yPosition = 0;
	console.log("das zu findendne element ist : " + element.id)
	while(element) {
		console.log("Rechunun: element.offsetTop - element.scrollTop + element.clientTop : " + element.offsetTop + "-" + element.scrollTop + "-" + element.clientTop)
		xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	}
	return { x: xPosition, y: yPosition };
}*/
