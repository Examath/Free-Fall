/*  
		Elements.js (c) Paul Cyril 2019.
        Version 2.0 Variant A for FreeFall
        Use with jQuery
        Use with Elements.css (Paul Cyril 2019)
        Do not use this script. Refer to Elements.js 2.0 Original for original version, including referencing.
*/

$(function () {
    console.log("Loading Elements.js (c) Paul Cyril 2019. V2.0A for Free Fall");

    $("nav").load("Assets/Nav.html", findActive);
    $("nav").attr("id", "nav");
    $("footer").load("Assets/Footer.html");
    $("title").html($("title").html() + " - Free Fall");
});

function findActive() {
    var dir = $("head").data("navdir").split("-");
    var rcdir = "#n";
    for (let i = 0; i < dir.length; i++) {
        rcdir += "-" + dir[i];
        $(rcdir).addClass("active");
    }
    if (dir[1] == "X") {
        $("#n-L").append('<div class="active"><a class="active small">' + "Gravity from earth to space" + '<a>&#60;</a>' + "4/5" + '<a>&#62;</a></div>')
    };
}