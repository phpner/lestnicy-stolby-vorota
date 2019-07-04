

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

    $('#s5_scrolltop_a, #s5_responsive_mobile_scroll').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 1600);
        return false;
    });

    $('.thumbnail, .imgblock a, .imgSingl, .imgSinglRight, .imgSinglCenter').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }

    });

    $("#menuTop").mmenu({
        navbar: {
            title: "Металлмастер"
        }
    });

    $("#ext_callback_id_1").on("submit",function (event) {
        event.preventDefault();
        console.log(this);

        var form = this;

        $.ajax({
            url: form.action,
            type: form.method,
            data: $(form).serialize(),
            beforeSend: function() {
                $("#ext_callback_id_1")[0].reset();
            },
            success: function(response) {
                console.log(response);

                $("#sendForm").fadeIn(400).delay(2000).fadeOut(800);

            }
        });

        });

});