/**
	* @package Necromancers HTML
	* @version 1.4.1
	* Template Scripts
	* Created by Dan Fisher
*/

;(function ($){
	'use strict';

	$.fn.exists = function () {
		return this.length > 0;
	};

	var reRenderSVG = function reRenderSVG() {
		document.querySelectorAll('use').forEach(function (u) {
			return u.replaceWith(u.cloneNode());
		});
	};

	var _windowWidth = $( window ).width();

	$( window ).on( 'resize', function() {
		_windowWidth = $( window ).width();
	});

	/* ----------------------------------------------------------- */
	/*  Predefined Variables
	/* ----------------------------------------------------------- */
	var mpIframe = $('.mp_iframe');

	var Core = {

		initialize: function () {

			this.stickyHeader();

			this.SvgPolyfill();

			this.headerNav();

			this.dlNav();

			this.mobileNav();

			this.headerMenuPanel();

			this.headerCart();

			this.headerSearch();

			this.headerTopBar();

			this.headerBlogFilter();

			this.checkoutRedeemPopup();

			this.countDown();

			this.isotope();

			this.slickCarousel();

			this.googleMap();

			this.progressBar();

			this.magnificPopupInit();

			this.horizontalScroll();

			this.socialGlitchEffect();

			this.miscScripts();

		},

		onload: function () {
			this.preloader();

			this.customCursor();
		},

		stickyHeader: function () {

			$('.site-header:not(.site-header--landing)').jPinning({

				offset: 100,

			});

		},

		SvgPolyfill: function() {
			svg4everybody();
		},

		preloader: function () {
			var preloaderOverlay = $( '.preloader-overlay' ),
				body             = $( 'body' );

			if (preloaderOverlay.exists()) {
				if ( body.hasClass( 'preloader-is--active' ) ) {
					body.removeClass( 'preloader-is--active' );
					setTimeout( function () {
						body.addClass( 'scroll-is--active' );
					}, 1300);
				}
			}
		},

		headerNav: function () {

			var mainNav = $('.main-nav');

			if (mainNav.exists()) {
				var navList = $('.main-nav__list'),
					navListLi = $('.main-nav__list > li'),
					megaMenu = $( '.main-nav__megamenu', navList );

				// Add toggle button and class if menu has submenu
				navListLi.has('.main-nav__sub').addClass('has-children').append('<span class="main-nav__toggle">&nbsp;</span>');
				navListLi.has('.main-nav__megamenu').addClass('has-children').append('<span class="main-nav__toggle">&nbsp;</span>');

				// Add toggle button and class if submenu has sub-submenu
				$('.main-nav__list > li > ul > li').has('.main-nav__sub').addClass('has-children').prepend('<span class="main-nav__toggle">&nbsp;</span>');
				$('.main-nav__list > li > ul > li > ul > li').has('.main-nav__sub').addClass('has-children').prepend('<span class="main-nav__toggle">&nbsp;</span>');
			}
		},

		dlNav: function () {
			var dlNav = $( '.dl-menuwrapper' );
			if ( dlNav.exists() ) {
				var navList = $('.dl-menu'),
					navListLi = $('.dl-menu > li'),
					megaMenu = $( '.dl-megamenu', navList );

				navListLi.has('.dl-submenu').addClass('has-children').append('<span class="dl-toggle">&nbsp;</span>');
				$('.dl-menu > li > ul > li').has('.dl-submenu').addClass('has-children').append('<span class="dl-toggle">&nbsp;</span>');
				$('.main-nav__list > li > ul > li > ul > li').has('.dl-submenu').addClass('has-children').append('<span class="dl-toggle">&nbsp;</span>');
			}
		},

		mobileNav: function () {

			var mobileNav = $('.mobile-nav');

			if (mobileNav.exists()) {

				var navList = $('.mobile-nav__list'),
					navListLi = $('.mobile-nav__list > li');

				// Add toggle button and class if menu has submenu
				navListLi.has('.mobile-nav__sub').addClass('has-children').prepend('<span class="mobile-nav__toggle">&nbsp;</span>');
				navListLi.has('.mobile-nav__megamenu').addClass('has-children').prepend('<span class="mobile-nav__toggle">&nbsp;</span>');

				$('.mobile-nav__toggle').on('click', function (){
					$(this).toggleClass('active').parent().siblings().children().removeClass('active');

					$('.mobile-nav__sub, .mobile-nav__megamenu').not($(this).siblings('.mobile-nav__sub, .mobile-nav__megamenu')).slideUp('normal');
					$(this).siblings('.mobile-nav__sub').slideToggle('normal');
					$(this).siblings('.mobile-nav__megamenu').slideToggle('normal');
				});

				// Add toggle button and class if submenu has sub-submenu
				$('.mobile-nav__list > li > ul > li').has('.mobile-nav__sub-2').addClass('has-children').prepend('<span class="mobile-nav__toggle-2">&nbsp;</span>');
				$('.mobile-nav__list > li > ul > li > ul > li').has('.mobile-nav__sub-3').addClass('has-children').prepend('<span class="mobile-nav__toggle-2">&nbsp;</span>');

				$('.mobile-nav__toggle-2').on('click', function (){
					$(this).toggleClass('active');
					$(this).siblings('.mobile-nav__sub-2').slideToggle('normal');
					$(this).siblings('.mobile-nav__sub-3').slideToggle('normal');
				});
			}
		},

		headerMenuPanel: function () {
			var menuToggle      = $( '.header-menu-toggle' ),
				siteWrapper     = $( '.site-wrapper' ),
				cartToggle      = $( '.header-cart-toggle' ),
				searchToggle    = $( '.header-search-toggle' ),
				socialToggle    = $( '.header-social-toggle' ),
				account         = $( '.header-account' ),
				headerPagnav    = $( '.header-pagination' ),
				playerInfoNav   = $( '.header-player-info-navigation' ),
				filterToggle    = $( '.header-filter-toggle'),
				teamToggle      = $( '.header-filter-toggle'),
				topBarToggle    = $( '.header-top-bar-toggle' ),
				topBar          = $( '.menu-panel__top-bar' ),
				dlMenu          = $( '.dl-menuwrapper ul.dl-menu' ),
				dlMenuItems     = $( '.dl-menuwrapper ul.dl-menu li:not(.dl-back)' );

			if ( menuToggle.exists() ) {

				var toggleMenu = function () {

					var horizontalLayout = $( '.site-layout--horizontal' );

					if (menuToggle.hasClass('toggled') && horizontalLayout.exists()) {
							var scrollSpeed,
									OSName;

							siteWrapper.mousewheel(function(e, delta) {

								if ( _windowWidth > 991 ) {

									scrollSpeed = delta;

									if ( navigator.appVersion.indexOf( "Win" ) != -1 ) {
										OSName = "Windows";
										scrollSpeed = delta * 40;
									}

									this.scrollLeft -= scrollSpeed;
									e.preventDefault();
								}

							});

					} else {
						siteWrapper.unmousewheel();
					}

					menuToggle.toggleClass('toggled');

					if ( siteWrapper.hasClass( 'site-wrapper--has-search-overlay' ) ) {
						searchToggle.toggleClass( 'toggled' );
						siteWrapper.toggleClass( 'site-wrapper--has-search-overlay' );
					}

					if ( siteWrapper.hasClass('site-wrapper--has-overlay') ) {
						cartToggle.toggleClass('toggled');
						siteWrapper.toggleClass('site-wrapper--has-overlay');
					}

					if ( _windowWidth > 767 ) {
						cartToggle.toggleClass('hide');
						searchToggle.toggleClass('hide');
						socialToggle.toggleClass('hide');
						account.toggleClass('hide');
						headerPagnav.toggleClass('hide');
					}

					if (_windowWidth < 768) {
						topBarToggle.toggleClass('hide');

						if ( topBarToggle.hasClass('toggled') ) {
							topBarToggle.removeClass('toggled');
						}

						if ( topBar.hasClass('toggled') ) {
							topBar.removeClass('toggled');
						}
					}

					if ( playerInfoNav.exists() ) {
						playerInfoNav.toggleClass('hide');
					}

					if ( filterToggle.exists() ) {
						filterToggle.toggleClass('hide');
					}

					dlMenu.removeClass( 'dl-subview' );
					dlMenuItems.removeClass( 'dl-subview dl-subviewopen' );

					siteWrapper.toggleClass('site-wrapper--has-menu-overlay');
				};

				menuToggle.on('click', function (){
					toggleMenu();
				});

				$(document).keyup( function(e) {
					if ( e.keyCode === 27 && menuToggle.hasClass( 'toggled' ) ) {
						toggleMenu();
					}
				});
			}
		},

		headerCart: function () {
			var cartToggle   = $('.header-cart-toggle'),
				searchToggle = $( '.header-search-toggle' ),
				menuToggle   = $('.header-menu-toggle'),
				topBarToggle = $('.header-top-bar-toggle'),
				topBar       = $( '.menu-panel__top-bar' ),
				siteWrapper  = $('.site-wrapper'),
				siteOverlay  = $('.site-overlay');

			if ( cartToggle.exists() ) {

				var toggleCart = function () {

					cartToggle.toggleClass('toggled');
					siteWrapper.toggleClass('site-wrapper--has-overlay');

					if ( siteWrapper.hasClass( 'site-wrapper--has-search-overlay' ) ) {
						searchToggle.toggleClass( 'toggled' );
						siteWrapper.toggleClass( 'site-wrapper--has-search-overlay' );
					}

					if ( _windowWidth < 768 && siteWrapper.hasClass( 'site-wrapper--has-menu-overlay' ) ) {
						menuToggle.toggleClass('toggled');
						topBarToggle.toggleClass('hide');
						siteWrapper.toggleClass('site-wrapper--has-menu-overlay');

						if ( topBarToggle.hasClass('toggled') ) {
							topBarToggle.removeClass('toggled');
						}

						if ( topBar.hasClass('toggled') ) {
							topBar.removeClass('toggled');
						}
					}
				};

				cartToggle.on('click', function () {
					toggleCart();
				});

				siteOverlay.on( 'click', function () {
					if ( cartToggle.hasClass( 'toggled' ) ) {
						toggleCart();
					}
				});

				$(document).keyup( function(e) {
					if ( e.keyCode === 27 && cartToggle.hasClass( 'toggled' ) ) {
						toggleCart();
					}
				});
			}
		},

		headerSearch: function () {
			var searchToggle = $( '.header-search-toggle' ),
				cartToggle   = $('.header-cart-toggle'),
				menuToggle   = $('.header-menu-toggle'),
				topBarToggle = $('.header-top-bar-toggle'),
				topBar       = $( '.menu-panel__top-bar' ),
				siteWrapper  = $( '.site-wrapper' );

			if ( searchToggle.exists() ) {

				var toggleSearch = function () {

					searchToggle.toggleClass( 'toggled' );
					siteWrapper.toggleClass( 'site-wrapper--has-search-overlay' );

					if ( siteWrapper.hasClass('site-wrapper--has-overlay') ) {
						cartToggle.toggleClass('toggled');
						siteWrapper.toggleClass('site-wrapper--has-overlay');
					}

					if ( _windowWidth < 768 && siteWrapper.hasClass( 'site-wrapper--has-menu-overlay' ) ) {
						menuToggle.toggleClass('toggled');
						topBarToggle.toggleClass('hide');
						siteWrapper.toggleClass('site-wrapper--has-menu-overlay');

						if ( topBarToggle.hasClass('toggled') ) {
							topBarToggle.removeClass('toggled');
						}

						if ( topBar.hasClass('toggled') ) {
							topBar.removeClass('toggled');
						}
					}
				};

				searchToggle.on( 'click', function () {
					toggleSearch();
					if ( searchToggle.hasClass( 'toggled' ) ) {
						$( '#header-search-form input' ).focus();
					}
				});

				$(document).keyup( function(e) {
					if ( e.keyCode === 27 && searchToggle.hasClass( 'toggled' ) ) {
						toggleSearch();
					}
				});
			}
		},

		headerTopBar: function () {
			var topBarToggle  = $( '.header-top-bar-toggle' );
			var topBar        = $( '.menu-panel__top-bar' );

			if ( topBarToggle.exists() ) {

				topBarToggle.on( 'click', function (){
					$(this).toggleClass( 'toggled' );

					if (_windowWidth < 768) {
						topBar.toggleClass( 'toggled' );
					}
				});
			}
		},

		headerBlogFilter: function () {
			var blogFilterTrigger  = $('.df-icon--filter');
			var blogFilter         = $('.filter-menu');

			if ( blogFilterTrigger.exists() && blogFilter.exists() ) {

				blogFilterTrigger.on( 'click', function (){
					blogFilter.toggleClass( 'filter-menu--active' );
				});
			}
		},

		checkoutRedeemPopup: function () {
			var checkoutRedeem      = $('.checkout-redeem'),
				checkoutRedeemPopup = $('.checkout-redeem-popup'),
				siteWrapper         = $('.site-wrapper'),
				siteOverlay         = $('.site-overlay');

			if ( checkoutRedeem.exists() ) {

				checkoutRedeem.on('click', function (){
					siteWrapper.addClass('site-wrapper--has-redeem-overlay');
				});

				siteOverlay.on('click', function (){
					siteWrapper.removeClass('site-wrapper--has-redeem-overlay');
				});
			}
		},

		countDown: function() {

			var countdown = $('.countdown-counter');
			var count_time = countdown.data('date');
			countdown.countdown({
				date: count_time,
				render: function(data) {
					$(this.el).html("<div class='countdown-counter__item countdown-counter__item--days'>" + this.leadingZeros(data.days, 2) + " <span class='countdown-counter__label'>Days</span></div><div class='countdown-counter__item countdown-counter__item--hours'>" + this.leadingZeros(data.hours, 2) + " <span class='countdown-counter__label'>Hours</span></div><div class='countdown-counter__item countdown-counter__item--mins'>" + this.leadingZeros(data.min, 2) + " <span class='countdown-counter__label'>Mins</span></div><div class='countdown-counter__item countdown-counter__item--secs'>" + this.leadingZeros(data.sec, 2) + " <span class='countdown-counter__label'>Secs</span></div>");
				}
			});
		},


		isotope: function () {
			var streams = $('.streams-archive'),
				matches = $('.matches-scores'),
				isotopeGrid;

			if (streams.exists() ) {

				var $filter = $('.js-filter'),
					windowWidth = $(window).width(),
					layout;

				if ( windowWidth > 991 ) {
					layout = 'fitColumns';
				} else {
					layout = 'fitRows';
				}

				isotopeGrid = streams.imagesLoaded(function () {

					isotopeGrid.isotope({
						layoutMode: layout,
							itemSelector: '.stream'
					});

					isotopeGrid.isotope( 'layout' );

					// filter items on button click
					$filter.on('click', 'button', function () {
						var filterValue = $(this).attr('data-filter');
						$filter.find('button').removeClass('active').addClass('');
						$(this).removeClass('').addClass('active');
						isotopeGrid.isotope({
							filter: filterValue
						});
					});
				});

				$( window ).on( 'resize', function() {
					windowWidth = $(window).width();

					isotopeGrid.isotope('destroy');

					if ( windowWidth > 991 ) {
						layout = 'fitColumns';
					} else {
						layout = 'fitRows';
					}

					isotopeGrid.isotope({
						layoutMode: layout,
						itemSelector: '.stream',
					});

					isotopeGrid.isotope( 'layout' );
				});
			}

			if (matches.exists() ) {
				isotopeGrid = matches.imagesLoaded(function () {

					var $filter = $('.js-filter');

					// init Isotope after all images have loaded
					isotopeGrid.isotope({
						// filter: '*',
						layoutMode: 'fitRows',
							itemSelector: '.col-md-12'
						// masonry: {
						// 	columnWidth: '.stream'
						// }
					});

					// filter items on button click
					$filter.on('click', 'li', function () {
						var filterValue = $(this).attr('data-filter');
						$filter.find('li').removeClass('active').addClass('');
						$(this).removeClass('').addClass('active');
						isotopeGrid.isotope({
							filter: filterValue
						});
					});
				});
			}

		},

		slickCarousel: function() {

			var slick_widget_carousel          = $( '.widget-carousel' ),
				slick_top_bar_carousel         = $( '.top-bar-carousel' ),
				slick_widget_partners          = $( '.widget-partners-carousel' ),
				slick_widget_mobile_partners   = $( '.widget-partners-mobile-carousel' ),
				slick_product_thumbnail        = $( '.product__thumbnail.slick-slider' ),
				slick_matches_score_pagination = $( '.matches-scores__navigation' ),
				slick_team_carousel            = $( '.team-carousel__content' ),
				slick_player_info_carousel_1   = $( '#player-info-carousel-1' ),
				slick_player_info_carousel_2   = $( '#player-info-carousel-2' ),
				slick_player_slider            = $( '.js-team-player__slider' ),
				slick_team_slider               = $( '.js-team-selection-slider' );


			// Team Slider
			if ( slick_team_slider.exists() ) {

				slick_team_slider.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: false,
					autoplaySpeed: 5000,
					arrows: true,
					dots: false,
					fade: true,
					infinite: true,
					prevArrow: $('.js-team-selection-slider__nav-prev'),
					nextArrow: $('.js-team-selection-slider__nav-next'),
					asNavFor: '.js-header-team-nav'
				});
				$('.js-header-team-nav').slick({
					slidesToShow: 4,
					slidesToScroll: 1,
					asNavFor: slick_team_slider,
					dots: false,
					arrows: false,
					vertical: true,
					focusOnSelect: true
				});

				$('.header-team-toggle .df-icon').on('click', function () {
					$(this).parent().toggleClass('header-team-toggle--active');
				});
			}

				// Player Slider
			if ( slick_player_slider.exists() ) {

				slick_player_slider.slick({
					slidesToShow: 2,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					arrows: true,
					dots: false,
					infinite: false,
					prevArrow: $('.js-team-player__nav-prev'),
					nextArrow: $('.js-team-player__nav-next'),

					responsive: [
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 1,
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2,
							}
						},
						{
							breakpoint: 576,
							settings: {
								slidesToShow: 1,
							}
						},
					]
				});
			}

			// Widget Posts Carousel
			if ( slick_widget_carousel.exists() ) {

				slick_widget_carousel.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					arrows: false,
					dots: true,
					centerPadding: 0
				});
			}

			// Top Bar Carousel
			if ( slick_top_bar_carousel.exists() ) {
				slick_top_bar_carousel.slick({
					infinite: true,
					slidesToShow: 4,
					variableWidth: true,
					prevArrow:"<button class='slick-prev'><svg role='img' class='df-icon df-icon--left-arrow'><use xlink:href='assets/img/necromancers.svg#left-arrow'/></svg></button>",
					nextArrow:"<button class='slick-next'><svg role='img' class='df-icon df-icon--right-arrow'><use xlink:href='assets/img/necromancers.svg#right-arrow'/></svg></button>",
					responsive: [
						{
							breakpoint: 768,
							settings: "unslick"
						}
					]
				});

				$(document).ready(function(){
					var csSelect = $( '.top-bar-filter .cs-options' );

					var filtered = false,
						selectedItem,
						dataValue;

					var data = csSelect.on('click', function() {
						if (filtered === false) {
							selectedItem = $( '.cs-selected', this );
							dataValue = selectedItem.attr('data-value');

							slick_top_bar_carousel.slick('slickFilter', '.' + dataValue);
							filtered = true;

							reRenderSVG();
						} else {
							slick_top_bar_carousel.slick('slickUnfilter');

							selectedItem = $( '.cs-selected', this );
							dataValue = selectedItem.attr('data-value');

							if ( dataValue != 'all' ) {
								slick_top_bar_carousel.slick('slickFilter', '.' + dataValue);
								filtered = true;
								reRenderSVG();
							} else {
								filtered = false;
								reRenderSVG();
							}
						}
					});
				});
			}

			// Widget Partners Carousel
			if ( slick_widget_partners.exists() ) {

				$('ul', slick_widget_partners).slick({
					slidesToShow: 3,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					arrows: true,
					dots: false,
					centerPadding: 0,
					prevArrow:"<button class='slick-prev'><svg role='img' class='df-icon df-icon--left-arrow'><use xlink:href='assets/img/necromancers.svg#left-arrow'/></svg></button>",
					nextArrow:"<button class='slick-next'><svg role='img' class='df-icon df-icon--right-arrow'><use xlink:href='assets/img/necromancers.svg#right-arrow'/></svg></button>",

					responsive: [
						{
							breakpoint: 1199,
							settings: {
								slidesToShow: 2,
							}
						},
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 1,
							}
						},
					]
				});

				var widgetTitleWidth = $('.widget__title', slick_widget_partners).width() + 34;

				$(document).ready(function(){
					$('.slick-arrow', slick_widget_partners).appendTo(slick_widget_partners).css({ "left": widgetTitleWidth });
				});

				var posLeft = function(){
					$('.slick-arrow', slick_widget_partners).appendTo(slick_widget_partners).css({ "left": widgetTitleWidth });
				};

				$('ul', slick_widget_partners).on('breakpoint', function(e){
					posLeft();
				});
			}

			// Widget Partners Carousel
			if ( slick_widget_mobile_partners.exists() ) {
				var collapseItem = slick_widget_mobile_partners.parents('.collapse');

				collapseItem.addClass('show');

				setTimeout( function () { slick_widget_mobile_partners.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					dots: false,
					refresh: true,
					prevArrow:"<button class='slick-prev'><svg role='img' class='df-icon df-icon--left-arrow'><use xlink:href='assets/img/necromancers.svg#left-arrow'/></svg></button>",
					nextArrow:"<button class='slick-next'><svg role='img' class='df-icon df-icon--right-arrow'><use xlink:href='assets/img/necromancers.svg#right-arrow'/></svg></button>"
				});  }, 500);

				setTimeout( function () { collapseItem.removeClass('show'); }, 1500);
			}

			// Product Thumbnail Carousel
			if ( slick_product_thumbnail.exists() ) {

				slick_product_thumbnail.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					arrows: true,
					dots: false,
					centerPadding: 0,
					prevArrow:"<button class='slick-prev'><svg role='img' class='df-icon df-icon--left-arrow'><use xlink:href='assets/img/necromancers.svg#left-arrow'/></svg></button>",
					nextArrow:"<button class='slick-next'><svg role='img' class='df-icon df-icon--right-arrow'><use xlink:href='assets/img/necromancers.svg#right-arrow'/></svg></button>"
				});
			}

			// Matches Score Pagination
			if ( slick_matches_score_pagination.exists() ) {

				slick_matches_score_pagination.slick({
					slidesToShow: 9,
					slidesToScroll: 3,
					autoplay: false,
					arrows: true,
					centerPadding: 0,

					responsive: [
						{
							breakpoint: 992,
							settings: {
								arrows: true,
								centerPadding: 0,
								slidesToShow: 6
							}
						},
						{
							breakpoint: 768,
							settings: {
								arrows: true,
								centerPadding: 0,
								slidesToShow: 4
							}
						},
						{
							breakpoint: 576,
							settings: {
								arrows: true,
								centerPadding: 0,
								slidesToShow: 4
							}
						},
					]
				});
			}

			if ( slick_team_carousel.exists() ) {

				var slideNum = 0,
					tmp = document.location.search.match(/slide=(\d+)/);

				if (tmp && tmp[1]) {
					slideNum = tmp[1];
				}

				slick_team_carousel.slick({
					initialSlide: slideNum,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: false,
					vertical: true,
					verticalSwiping: true,
					centerPadding: 0,
					arrows: false,
					dots: true,
					adaptiveHeight: true,
					customPaging: function(slick,index) {
						var icon = slick.$slides.get(index).dataset.icon;
						return '<svg role="img" class="df-icon df-icon--' + icon + '"><use xlink:href="assets/img/necromancers.svg#' + icon + '"/></svg>';
					},

					responsive: [
						{
							breakpoint: 1200,
							settings: {
								vertical: false,
								verticalSwiping: false,
							}
						}
					]
				});

				slick_team_carousel.on('breakpoint', function(e){
					reRenderSVG();
				});

			}

			if ( slick_player_info_carousel_1.exists() ) {

				slick_player_info_carousel_1.on("init", function(event, slick){
					var pagination = (slick.currentSlide+1) + '/' + slick.slideCount;
					slick_player_info_carousel_1.append('<div class="slick-custom-pagination">' + pagination + '</div>');
				});

				slick_player_info_carousel_1.slick({
					slidesToShow: 1,
					centerPadding: 0,
					arrows: true,
					prevArrow:"<button class='slick-prev'><svg role='img' class='df-icon df-icon--left-arrow'><use xlink:href='assets/img/necromancers.svg#left-arrow'/></svg></button>",
					nextArrow:"<button class='slick-next'><svg role='img' class='df-icon df-icon--right-arrow'><use xlink:href='assets/img/necromancers.svg#right-arrow'/></svg></button>"
				});

				slick_player_info_carousel_1.on("afterChange", function(event, slick, currentSlide){
					var pagination = ( slick.currentSlide + 1 ) + '/' + slick.slideCount;
					var paginationContainer = $('#player-info-carousel-1 .slick-custom-pagination');
					paginationContainer.html( pagination );
				});
			}

			if ( slick_player_info_carousel_2.exists() ) {

				slick_player_info_carousel_2.on("init", function(event, slick){
					var pagination = (slick.currentSlide+1) + '/' + slick.slideCount;
					slick_player_info_carousel_2.append('<div class="slick-custom-pagination">' + pagination + '</div>');
				});

				slick_player_info_carousel_2.slick({
					slidesToShow: 1,
					centerPadding: 0,
					arrows: true,
					prevArrow:"<button class='slick-prev'><svg role='img' class='df-icon df-icon--left-arrow'><use xlink:href='assets/img/necromancers.svg#left-arrow'/></svg></button>",
					nextArrow:"<button class='slick-next'><svg role='img' class='df-icon df-icon--right-arrow'><use xlink:href='assets/img/necromancers.svg#right-arrow'/></svg></button>"
				});

				slick_player_info_carousel_2.on("afterChange", function(event, slick, currentSlide){
					var pagination = ( slick.currentSlide + 1 ) + '/' + slick.slideCount;
					var paginationContainer = $( '#player-info-carousel-2 .slick-custom-pagination' );
					paginationContainer.html( pagination );
				});
			}
		},

		progressBar: function() {

			var progressBar = $('.player-info-detail__bar');

			if ( progressBar.exists() ) {

				var arr = $(document).find(progressBar);

				arr.each(function( index ) {
					var value        = $(this).attr('data-value');
					var id           = '#' + $(this).attr('data-id');

					var bar = new ProgressBar.Path(id, {
						easing: 'easeInOut',
						duration: 1400
					});

					bar.set(0);
					bar.animate(value / 100); // Number from 0.0 to 1.0
				});
			}
		},

		googleMap: function () {
			// Google Map
			var gmap = $('.gm-map');
			if (gmap.exists()) {
				gmap.each(function () {

					var $elem = $(this);
					var mapAddress = $elem.attr('data-map-address') ? $elem.attr('data-map-address') : 'New York, USA';
					var mapZoom = $elem.attr('data-map-zoom') ? $elem.attr('data-map-zoom') : '15';
					var mapIcon = $elem.attr('data-map-icon') ? $elem.attr('data-map-icon') : '';
					var mapStyle = $elem.attr('data-map-style');
					var mapInfo = $elem.children().html() ? $elem.children().html() : false;

					var stylesOutput = '';

					// Skins
					if (mapStyle === 'necromancers') {
						// Skin: Necromancers
						stylesOutput = [{ "elementType": "labels.text.fill", "stylers": [ { "color": "#ffffff" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#222430" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "color": "#222430" } ] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "color": "#5e627e" } ] }, { "featureType": "poi", "elementType": "geometry.stroke", "stylers": [ { "color": "#717595" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#a3ff12" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#323545" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "color": "#222430" } ] }, { "featureType": "road.local", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#4545fa" } ] } ];

					} else if (mapStyle === 'ultra-light') {
						// Skin: Ultra Light
						stylesOutput = [{'featureType': 'water', 'elementType': 'geometry', 'stylers': [{'color': '#e9e9e9'}, {'lightness': 17}]}, {'featureType': 'landscape', 'elementType': 'geometry', 'stylers': [{'color': '#f5f5f5'}, {'lightness': 20}]}, {'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}, {'lightness': 17}]}, {'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#ffffff'}, {'lightness': 29}, {'weight': 0.2}]}, {'featureType': 'road.arterial', 'elementType': 'geometry', 'stylers': [{'color': '#ffffff'}, {'lightness': 18}]}, {'featureType': 'road.local', 'elementType': 'geometry', 'stylers': [{'color': '#ffffff'}, {'lightness': 16}]}, {'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{'color': '#f5f5f5'}, {'lightness': 21}]}, {'featureType': 'poi.park', 'elementType': 'geometry', 'stylers': [{'color': '#dedede'}, {'lightness': 21}]}, {'elementType': 'labels.text.stroke', 'stylers': [{'visibility': 'on'}, {'color': '#ffffff'}, {'lightness': 16}]}, {'elementType': 'labels.text.fill', 'stylers': [{'saturation': 36}, {'color': '#333333'}, {'lightness': 40}]}, {'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'transit', 'elementType': 'geometry', 'stylers': [{'color': '#f2f2f2'}, {'lightness': 19}]}, {'featureType': 'administrative', 'elementType': 'geometry.fill', 'stylers': [{'color': '#fefefe'}, {'lightness': 20}]}, {'featureType': 'administrative', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#fefefe'}, {'lightness': 17}, {'weight': 1.2}]}];

					} else if (mapStyle === 'light-dream') {
						// Skin: Light Dream
						stylesOutput = [{'featureType': 'landscape', 'stylers': [{'hue': '#FFBB00'}, {'saturation': 43.400000000000006}, {'lightness': 37.599999999999994}, {'gamma': 1}]}, {'featureType': 'road.highway', 'stylers': [{'hue': '#FFC200'}, {'saturation': -61.8}, {'lightness': 45.599999999999994}, {'gamma': 1}]}, {'featureType': 'road.arterial', 'stylers': [{'hue': '#FF0300'}, {'saturation': -100}, {'lightness': 51.19999999999999}, {'gamma': 1}]}, {'featureType': 'road.local', 'stylers': [{'hue': '#FF0300'}, {'saturation': -100}, {'lightness': 52}, {'gamma': 1}]}, {'featureType': 'water', 'stylers': [{'hue': '#0078FF'}, {'saturation': -13.200000000000003}, {'lightness': 2.4000000000000057}, {'gamma': 1}]}, {'featureType': 'poi', 'stylers':[{'hue': '#00FF6A'}, {'saturation': -1.0989010989011234}, {'lightness': 11.200000000000017}, {'gamma': 1}]}];

					} else if (mapStyle === 'shades-of-grey') {
						// Skin: Shades of Grey
						stylesOutput = [{'featureType': 'all', 'elementType': 'labels.text.fill', 'stylers': [{'saturation': 36}, {'color': '#000000'}, {'lightness': 40}]}, {'featureType': 'all', 'elementType': 'labels.text.stroke', 'stylers': [{'visibility': 'on'}, {'color': '#000000'}, {'lightness': 16}]}, {'featureType': 'all', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'administrative', 'elementType': 'geometry.fill', 'stylers': [{'color': '#000000'}, {'lightness': 20}]}, {'featureType': 'administrative', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#000000'}, {'lightness': 17}, {'weight': 1.2}]}, {'featureType': 'landscape', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 20}]}, {'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 21}]}, {'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{'color': '#000000'}, {'lightness': 17}]}, {'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#000000'}, {'lightness': 29}, {'weight': 0.2}]}, {'featureType': 'road.arterial', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 18}]}, {'featureType': 'road.local', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 16}]}, {'featureType': 'transit', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 19}]}, {'featureType': 'water', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 17}]}];

					} else if (mapStyle === 'blue-water') {
						// Skin: Blue Water
						stylesOutput = [{'featureType': 'administrative', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#444444'}]},{'featureType': 'landscape', 'elementType': 'all', 'stylers': [{'color': '#f2f2f2'}]}, {'featureType': 'poi', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'road', 'elementType': 'all', 'stylers': [{'saturation': -100}, {'lightness': 45}]}, {'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{'visibility': 'simplified'}]}, {'featureType': 'road.arterial', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'transit', 'elementType': 'all', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'water', 'elementType': 'all', 'stylers': [{'color': '#46bcec'}, {'visibility': 'on'}]}];

					} else {
						// Skin: Default
						stylesOutput = [{'featureType': 'administrative.country','elementType': 'geometry','stylers': [{'visibility': 'simplified'},{'hue': '#ff0000'}]}];
					}

					if ( mapInfo !== false ) {
						$elem.gmap3({
							zoom: Number(mapZoom),
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							scrollwheel: false,
							address: mapAddress,
							styles: stylesOutput,

						}).marker({
							address: mapAddress,
							icon: mapIcon,
						}).infowindow({
							position: mapAddress,
							content: mapInfo,
						}).then(function (infowindow) {
							var map = this.get(0);
							var marker = this.get(1);
							marker.addListener('click', function() {
								infowindow.open(map, marker);
							});
						});
					} else {
						$elem.gmap3({
							zoom: Number(mapZoom),
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							scrollwheel: false,
							address: mapAddress,
							styles: stylesOutput,

						}).marker({
							address: mapAddress,
							icon: mapIcon,
						});
					}
				});
			}
		},

		magnificPopupInit: function (){

			if (mpIframe.exists() ) {
				// Iframe (video, maps)
				$('.mp_iframe').magnificPopup({
					type: 'iframe',
					removalDelay: 300,
					mainClass: 'mfp-fade',
					autoFocusLast: false,

					patterns: {
						youtube: {
							index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

							id: 'v=', // String that splits URL in a two parts, second part should be %id%
							// Or null - full URL will be returned
							// Or a function that should return %id%, for example:
							// id: function(url) { return 'parsed id'; }

							src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
						},
						vimeo: {
							index: 'vimeo.com/',
							id: '/',
							src: '//player.vimeo.com/video/%id%?autoplay=1'
						},
						gmaps: {
							index: '//maps.google.',
							src: '%id%&output=embed'
						}
					},

					srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".

				});
			}
		},

		horizontalScroll: function() {
			var horizontalLayout = $( '.site-layout--horizontal' ),
				scrollSpeed,
				OSName;

			if ( horizontalLayout.exists() ) {

				$( '.site-wrapper' ).mousewheel(function(e, delta) {

					if ( _windowWidth > 991 ) {

						scrollSpeed = delta;

						if ( navigator.appVersion.indexOf( "Win" ) != -1 ) {
							OSName = "Windows";
							scrollSpeed = delta * 40;
						}

						this.scrollLeft -= scrollSpeed;
						e.preventDefault();

					}

				});
			}
		},


		customCursor: function() {

			if ( _windowWidth > 992 ) {
				var $ = document.querySelector.bind(document);
				var $on = document.addEventListener.bind(document);

				var xmouse, ymouse;
				$on('mousemove', function (e) {
					xmouse = e.clientX || e.pageX;
					ymouse = e.clientY || e.pageY;
				});

				var ball = $('#df-custom-cursor');
				var x = void 0,
						y = void 0,
						dx = void 0,
						dy = void 0,
						tx = 0,
						ty = 0,
						key = -1;

				var followMouse = function followMouse() {
						key = requestAnimationFrame(followMouse);

						if(!x || !y) {
							x = xmouse;
							y = ymouse;
						} else {
							dx = (xmouse - x) * 0.25;
							dy = (ymouse - y) * 0.25;
							if(Math.abs(dx) + Math.abs(dy) < 0.1) {
								x = xmouse;
								y = ymouse;
							} else {
								x += dx;
								y += dy;
							}
						}
						ball.style.transform = "translate("+ x +"px, " + y + "px)";
				};

				followMouse();
			}
		},

		socialGlitchEffect: function () {
			var socialMenuLandingGlitch = $('.social-menu--landing-glitch');

			if ( socialMenuLandingGlitch.exists( ) ) {
				$('.social-menu--landing-glitch > li > a').each(function() {
					var iconClone = $(this).find('[class*="fa-"]').clone().addClass('glitch-layer');
					var iconCloneLayer1 = iconClone.clone().addClass('glitch-layer--1');
					var iconCloneLayer2 = iconClone.clone().addClass('glitch-layer--2');
					$(this).prepend(iconCloneLayer1, iconCloneLayer2);
				});
			}
		},

		miscScripts: function() {
			[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
				new SelectFx(el);
			} );

			$( '#accordionFaqs' ).collapse( {
				toggle: false
			} );

			$( '#paymentMethods' ).collapse( {
				toggle: true
			} );

			$( '.counter__number' ).counterUp({
				delay: 10,
				time: 1000
			});

			$( '.nano' ).nanoScroller();

			$( '.matches-tabs__navigation a' ).on( 'click', function () {
				setTimeout( function () { $( '.nano' ).nanoScroller(); }, 200 );
			});

			$( '#dl-menu' ).dlmenu({
				animationClasses : { classin : 'dl-animate-in-1', classout : 'dl-animate-out-1' },
				backLabel: '<svg role="img" class="df-icon df-icon--left-arrow"><use xlink:href="assets/img/necromancers.svg#left-arrow"></use></svg>' + ' ' + 'Back',
			});

			// Selects
			$('.widget--sidebar').find('label').addClass('control-label');
			$('.widget--sidebar select').wrap('<div class="select-wrapper"></div>');
		},

	};

	$(document).on('ready', function () {
		Core.initialize();
	});

	$(window).on('load', function () {
		Core.onload();
	});

})(jQuery);
