// Main javascript entry point
// Should handle bootstrapping/starting application
(function () {

  'use strict';

  window.$ = window.jQuery = require('jquery');

/*
  dependency
*/

  var dropit = require('dropit');
  var cloud9carousel = require('cloud9carousel');
  var bxslider = require('bxslider');


  $(document).ready(function(){



    //bx-slider
    var slider = $('.bxslider').bxSlider({
      nextText: "",
      prevText: "",
      mode: 'fade',
      infiniteLoop: true,
      pagerCustom: '#bx-pager',
      onSliderLoad: toggleToDescription,
      onSlideAfter: toggleToDescription
    });

    function toggleToDescription() {
      var currentSlide = this.getCurrentSlide();
      $('.index-block-slider__description').removeClass('index-block-slider__description_active');
      $( "div[slide='" + currentSlide + "']" ).addClass('index-block-slider__description_active');
    }







    //features carousel
    $("#carousel").Cloud9Carousel( {
      buttonLeft: $("#buttons > .left"),
      buttonRight: $("#buttons > .right"),
      autoPlay: 0,
      yRadius: -50,
      itemClass: "cloud9-item",
      transforms: true,
      bringToFront: true
    } );



    //faq-category toggler
    $('.faq-list-item__category').click(function() {
      $(this).next('.category-wrapper').toggleClass('display-none');
    });


    //modal video
    var videoUrl = 'https://www.youtube.com/embed/lbv1ShVEmw8?autoplay=1';

    $('.video__play-button').click(function(){
      $('.modal-video').toggleClass('display-none');
      $('<iframe id="youtube-video" width="560" height="315" src="https://www.youtube.com/embed/lbv1ShVEmw8?autoplay=1" frameborder="0" allowfullscreen></iframe>').appendTo('.modal-video');
    });

    $('.modal-video').click(function(){
      $('.modal-video').toggleClass('display-none');
      $('#youtube-video').remove();
    });



    //navbar dropdown
    $('.navbar-links').dropit({
      action: 'mouseenter'
    });



    //dropdown-menu
    $('.dropdown-menu__button').click(function(){
      $('.dropdown-menu__dropdown').toggleClass('display-none');
    });



    //faq toggler
    $('.faq-list-item-question').click(function(){
      $(this).parent().children( ".faq-list-item__answer" ).toggleClass("faq-list-item__answer_invisible")
    });



    //tab toggling
    $('.simple-faq__tab').click(function(){
      var tab_id = $(this).attr('data-tab');

      $('.simple-faq__tab').removeClass('simple-faq__tab_current');
      $('.simple-faq__tabs-content').removeClass('simple-faq__tabs-content_current');
      $(this).addClass('simple-faq__tab_current');
      $("#"+tab_id).addClass('simple-faq__tabs-content_current');
    });



    //common questions
    $('.common-question__column-question-button').click(function(){
      $(this).parent().children( ".common-question__column-answer" ).toggleClass('display-none');
    });



    //call-back-form
    $('.call-back-form__check').click( function() {
      $('.call-back-form__set-time').toggleClass('call-back-form__set-time_closed');
    } );



    //toogle map
    var toogleMap = function() {
      $('.map-form')
        .toggleClass('map-form_transition')
        .toggleClass('map-form_transition-normal');
      $('.map-circle').toggleClass('map-circle_transition');
      $('.height-normal').toggleClass('height-0');
      $('.contacts__map-background').toggleClass('display-none');
    };

    $('.map-circle').click(toogleMap);
    $('.contacts__map-background').click(toogleMap);



    //card block
    $('.index-block__card').mouseover( function() {
      $('.index-block__card-detail').toggleClass('index-block__card-detail_open');
    } );
    $('.index-block__card-detail').mouseleave( function() {
      $('.index-block__card-detail').toggleClass('index-block__card-detail_open');
    } );



    //modal screenshot
    var action = function(){
      var isNext = $(this).next('div').length;

      $(this).addClass('index-block__image_modal');
      if( !isNext ) {
        $('.index-block__image_modal').after('<div class="index-block__image_modal-after"></div>');
      }
    }

    $('.index-block__image').click(action);
    $('.feature-block__image').click(action);

    $('body').on('click', '.index-block__image_modal-after', function () {
      $('.index-block__image').removeClass('index-block__image_modal');
      $('.feature-block__image').removeClass('index-block__image_modal');
      $(this).remove();
    });




    //function square toggler
    $('.function-square').hover(function() {
      $(this).find('.function-square-description').toggleClass('function-square-description_visible');
    });



    //float menu
    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > 100)
{            $('.float-navbar')
            .removeClass("float-navbar_removeClass")
            .addClass("float-navbar_addClass");
        } else {
            $('.float-navbar')
            .removeClass("float-navbar_addClass");
        }
    });
  });



  //map config and init
  var map;
  var mapStyle = [
      {
          "featureType": "landscape",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 65
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 51
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 30
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.local",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 40
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "transit",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": -25
              },
              {
                  "saturation": -100
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#ffff00"
              },
              {
                  "lightness": -25
              },
              {
                  "saturation": -97
              }
          ]
      }
  ];
  window.initMap = function() {
    var position = {lat: 49.834458, lng: 23.995082};
    map = new google.maps.Map(document.getElementById('map'), {
      center: position,
      zoom: 15
    });
    map.setOptions({styles: mapStyle});
    var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: 'Click to zoom'
  });
  }

}());
