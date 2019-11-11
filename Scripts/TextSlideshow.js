/*  
	TextSlideshow.js (c) Paul Cyril 2019. Created 07/11/2019
	V 2.0A for Free Fall
    Requires TextSlideshow.css (Paul Cyril 2019).
*/
var TextSlideshowAutoUpdateInterval;
$(function () {
    $(".TextSlideshow").each(function (i, element) {
        element.id = "TSs" + i;
        element.dataset.length = $(element).children().length;
        $(element).children().each(function (j, childelement) {
            childelement.id = "TSs" + i + "-" + j;
        })
        n = "#TSs" + i + "-" + Math.floor(Math.random() * Number(element.dataset.length));
        element.dataset.current = n;
        $(n).animate({opacity: "1", marginTop: "1em", marginBottom: "1em"});
    });
    TextSlideshowAutoUpdateInterval = setInterval(() => {
        $(".TextSlideshow").each(function (i, element) {
            n = "#TSs" + i + "-" + Math.floor(Math.random() * Number(element.dataset.length));
            if(n == element.dataset.current) return;
            $(n).css({opacity: "0", marginTop: "0em", marginBottom: "2em"});
            $(n).animate({opacity: "1", marginTop: "1em", marginBottom: "1em"});
            $(element.dataset.current).animate({opacity: "0", marginTop: "2em", marginBottom: "0em"});
            element.dataset.current = n;
        });
    }, 8000);
})