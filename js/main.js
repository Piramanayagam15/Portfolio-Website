 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $toggle = $(this);
			setTimeout(function() {
				if ( $('#ftco-nav').hasClass('show') ) {
					$toggle.addClass('active');
				} else {
					$toggle.removeClass('active');
				}
			}, 350);
		});

		$('#ftco-nav').on('hidden.bs.collapse', function() {
			$('.js-fh5co-nav-toggle').removeClass('active');
		});

		$('#ftco-nav').on('shown.bs.collapse', function() {
			$('.js-fh5co-nav-toggle').addClass('active');
		});

	};
	burgerMenu();


	var onePageClick = function() {

		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
			event.preventDefault();

			var href = $(this).attr('href');
			var target = $(href);

			if (target.length) {
				$('html, body').stop().animate({
					scrollTop: target.offset().top - 70
				}, 500);
			}

			// Auto-collapse mobile navbar after click
			var $nav = $('#ftco-nav');
			if ($nav.hasClass('show')) {
				$nav.collapse('hide');
				$('.js-fh5co-nav-toggle').removeClass('active');
			}
		});

	};

	onePageClick();
	

	var carousel = function() {
		var $slider = $('.home-slider');
		if ($slider.length > 0) {
			var slideCount = $slider.find('.slider-item').length;
			if (slideCount > 1) {
				$slider.owlCarousel({
					loop: true,
					autoplay: true,
					margin: 0,
					animateOut: 'fadeOut',
					animateIn: 'fadeIn',
					nav: false,
					autoplayHoverPause: false,
					items: 1,
					navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
					responsive:{
						0:{ items: 1 },
						600:{ items: 1 },
						1000:{ items: 1 }
					}
				});
			} else {
				// Single slide: keep static without infinite fade-to-black cycling
				$slider.owlCarousel({
					loop: false,
					autoplay: false,
					margin: 0,
					nav: false,
					dots: false,
					items: 1,
					touchDrag: false,
					mouseDrag: false,
					responsive:{
						0:{ items: 1 },
						600:{ items: 1 },
						1000:{ items: 1 }
					}
				});
			}
		}
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		$('#section-counter, .ftco-about, .ftco-counter').each(function() {
			var $section = $(this);
			$section.waypoint(function(direction) {
				if (direction === 'down' && !$section.hasClass('ftco-counter-animated')) {
					$section.addClass('ftco-counter-animated');
					var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
					$section.find('.number').each(function() {
						var $this = $(this),
							num = parseInt($this.data('number'), 10) || 0;
						$this.animateNumber(
						  {
						    number: num,
						    numberStep: comma_separator_number_step
						  }, 2000
						);
					});
				}
			}, { offset: '90%' });
		});
	};
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });





})(jQuery);

