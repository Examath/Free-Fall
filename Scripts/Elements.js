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
    $("nav").attr("id","nav");
    $("footer").load("Assets/Footer.html");
});

function findActive() {
    var active = document.getElementById($("title").text().substr(0, 1));
    if(active != null) active.classList.add("active");
}