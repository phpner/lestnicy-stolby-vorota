

var s5_dropdowntext = "Open Gallery";
var s5_verticalhorizontal = "false";
var s5_slide_opacity = 1;

jQuery(document).ready(function() {
    var myMenu = new MenuMatic({
        tabletWidth: 1400,
        effect: "slide & fade",
        duration: 500,
        physics: 'easeOutCirc',
        hideDelay: 250,
        orientation: "horizontal",
        tweakInitial: {
            x: 0,
            y: 0
        },
        direction: {
            x: 'right',
            y: 'down'
        },
        opacity: 100
    });

    /**
     * slider
     */

});


$(document).ready(function ($) {

    $(".outline_button").on('click',function (event) {
        event.preventDefault();
        console.log(this);
        $(".ext_callback_form").slideToggle();
    });

    /**
     * slick
     */
    $('#s5_button_content').slick({
        dots: true,
        pauseOnDotsHover:true,
        arrows:false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        adaptiveHeight: true,
        //autoplay: true,
        autoplaySpeed: 3000,
    });

    var headerSlider = $('#myGalleryHeader');

   headerSlider.on('init', function(event, slick, currentSlide, nextSlide){
        var theSlid = slick.$slides.get(currentSlide);

       headerSlider.find(".right.first").css({
            "-webkit-transform":"translate(0,0%)",
            "-ms-transform":"translate(0,0%)",
            "transform":"translate(0,0%)",
            "opacity": "1"
        });

       headerSlider.find(".left.first").css({
           "-webkit-transform":"translate(0,0%)",
           "-ms-transform":"translate(0,0%)",
           "transform":"translate(0,0%)",
           "opacity": "1"
       });
    });

    headerSlider.slick({
        dots: true,
        pauseOnDotsHover:true,
        arrows:false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        adaptiveHeight: true,
        //autoplay: true,
        autoplaySpeed: 3000,
    });

    headerSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        var theSlid = slick.$slides.get(currentSlide);

        $(theSlid).find(".right").css({
            "-webkit-transform":"translate(0,104%)",
            "-ms-transform":"translate(0,104%)",
            "transform":"translate(0,104%)",
            "opacity": "0",
            " transition" : "all 2s;"
        });

        $(theSlid).find(".left").css({
            "-webkit-transform":"translate(-104%,0%)",
            "-ms-transform":"translate(-104%,0%)",
            "transform":"translate(-104%,0%)",
            "opacity": "0",
            " transition" : "all 2s;"
        });

        $(theSlid).find(".center").css({
            "-webkit-transform":"translate(0,-104%)",
            "-ms-transform":"translate(0,-104%)",
            "transform":"translate(0,-104%)",
            "opacity": "0",
            " transition" : "all 2s;"
        });

    });

    headerSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
        var theSlid = slick.$slides.get(currentSlide);

        $(theSlid).find(".right").css({
            "-webkit-transform":"translate(0,0%)",
            "-ms-transform":"translate(0,0%)",
            "transform":"translate(0,0%)",
            "opacity": "1"
        });

        $(theSlid).find(".left").css({
            "-webkit-transform":"translate(0,0%)",
            "-ms-transform":"translate(0,0%)",
            "transform":"translate(0,0%)",
            "opacity": "1"
        });

        $(theSlid).find(".center").css({
            "-webkit-transform":"translate(0,0%)",
            "-ms-transform":"translate(0,0%)",
            "transform":"translate(0,0%)",
            "opacity": "1"
        });

    });

    (function(a,c){var b=(function(){var d=c(a.documentElement),f=c(a.body),e;if(d.scrollTop()){return d}else{e=f.scrollTop();if(f.scrollTop(e+1).scrollTop()==e){return d}else{return f.scrollTop(e)}}}());c.fn.smoothScroll=function(d){d=~~d||400;return this.find('a[href*="#s5"]').click(function(f){var g=this.hash,e=c(g);if(location.pathname.replace(/^\//,'')===this.pathname.replace(/^\//,'')&&location.hostname===this.hostname){if(e.length){f.preventDefault();b.stop().animate({scrollTop:e.offset().top},d,function(){location.hash=g})}}}).end()}}(document,jQuery));

    jQuery(document).ready(function(){

        jQuery('html').smoothScroll(700);

    });

    function s5_page_scroll(obj){ if(jQuery.browser.mozilla) var target = 'html'; else var target='html body'; jQuery(target).stop().animate({scrollTop:jQuery(obj).offset().top},700,function(){location.hash=obj}); }

    function s5_hide_scroll_to_top_display_none() { if (window.pageYOffset < 300) { document.getElementById("s5_scrolltopvar").style.display = "none"; } }

    function s5_hide_scroll_to_top_fadein_class() { document.getElementById("s5_scrolltopvar").className = "s5_scrolltop_fadein"; }

    function s5_hide_scroll_to_top() {

        if (window.pageYOffset >= 300) {document.getElementById("s5_scrolltopvar").style.display = "block";

            document.getElementById("s5_scrolltopvar").style.visibility = "visible";

            window.setTimeout(s5_hide_scroll_to_top_fadein_class,300);}

        else {document.getElementById("s5_scrolltopvar").className = "s5_scrolltop_fadeout";window.setTimeout(s5_hide_scroll_to_top_display_none,300);}}

    jQuery(document).ready( function() {s5_hide_scroll_to_top();});

    jQuery(window).resize(s5_hide_scroll_to_top);

    if(window.addEventListener) {

        window.addEventListener('scroll', s5_hide_scroll_to_top, false);

    }

    else if (window.attachEvent) {
        window.attachEvent('onscroll', s5_hide_scroll_to_top);
    }



    $('.thumbnail').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }

    });


});