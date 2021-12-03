wideMenu = {
	create : function() {
		let mainBlock = $('.js_wide_menu');

		if (mainBlock.length) {
			let visibleElements = mainBlock.find('.visible-elements'),
				menuElements = mainBlock.find('.visible-elements span'),
				menuExtensionBlock,
				i = 0;

			menuElements.each(function () {

				let thisElement = $(this);

				if (i == 4) {

					visibleElements.after(`
					<div class="hidden-elements">
						<span class="menu-extension-button"><i class="fas fa-bars"></i></span>
						<div class="menu-extension-block"></div>
					</div>
				`);

					menuExtensionBlock = mainBlock.find('.menu-extension-block');
				}

				if (i >= 4) {
					menuExtensionBlock.append(`<span>${thisElement.html()}</span>`);
					thisElement.remove();
				}

				i++;
			});
		}
	},

	showHideMobile : function(params = {}) {

		let menuBlock = $('.js_wide_menu');

		if (menuBlock.length) {
			params.time = params.time ? params.time : 750;

			let elementWidth = menuBlock.outerWidth();

			if (menuBlock.is(':hidden')) {

				if (params.onlyHide != true) {
					menuBlock.css("margin-left", `-${elementWidth}px`).show();

					if (params.withOutAnimation == true) {
						menuBlock.css('marginLeft', "0");
					} else {
						menuBlock.animate(
							{marginLeft: "0"},
							params.time
						);
					}
				}
			} else {
				if (params.onlyShow != true) {
					if (params.withOutAnimation == true) {
						menuBlock.hide().css("margin-left", 0);
					} else {
						menuBlock.animate(
							{marginLeft: `-${elementWidth}px`},
							params.time,
							function () {
								menuBlock.hide().css("margin-left", 0);
							}
						);
					}
				}
			}
		}
	},
};

happyNewYear = {
	showPopup : (param, element) => {

		let main_element	= $('.popup'),
			overlay_element = $('.overlay');

		if (param) {
			let product_element = $(element);

			main_element.find('[name=product-id]').val(product_element.parents('.product-parent').data('id'));

			main_element.show();
			overlay_element.show();
		} else {
			main_element.hide();
			overlay_element.hide();
		}
	},

	sendOrder : () => {

		let url = '/ajax.php',
			data = {
				'id' : $('[name=product-id]').val(),
				'fio' : $('[name=fio]').val(),
				'phone' : $('[name=phone]').val(),
				'email' : $('[name=email]').val(),
				'comment' : $('[name=comment]').val(),
			};

		$.ajax({
			url: url,
			type: "POST",
			data: data,
			dataType: 'json',
			success: (response) => {

		      let errorsBlock = $('.js_error');

		      if (response.errors) {
		      	
		      	errorsBlock.html('');

		      	for (let key in response.errors) {
		      		errorsBlock.append(response.errors[key] + '<br>');
		      	}
		      } else {
		      	if (response.res == true) {
		      		errorsBlock.html('Заказ оформлен!');
		      	}
		      }
			}
		});
	},
};

/* Timer */
function getTimeRemaining(endtime) {
	var t = endtime - new Date().getTime();
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');

	function updateClock() {
		var t = getTimeRemaining(endtime);

		daysSpan.innerHTML = t.days;
		hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}

	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}

$(() => {
	wideMenu.create();

	let sliderBlock = $('.slider');

	if (sliderBlock.length) {
		$('.slider').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			prevArrow: $('.slider-block .nav-left'),
			nextArrow: $('.slider-block .nav-right'),
		});
	}

	if (secondTo) {
		var date = new Date();
		var utcCorrection = (-date.getTimezoneOffset() - 60 * 3) * 60 * 1000;
		var deadline = new Date((date.getTime() + secondTo * 1000) - utcCorrection);
		initializeClock('timer', deadline);
	}
});

$(window).resize(function() {
	let windowWidth = $(window).width();

	if (windowWidth > 768) wideMenu.showHideMobile({onlyShow : true, withOutAnimation: true});
	if (windowWidth <= 768) wideMenu.showHideMobile({onlyHide : true, withOutAnimation: true});
});

$(document)
	.on('click', '.js_mobile_menu_open_button', function() { wideMenu.showHideMobile() })
	.on('click', '.js_close_mobile_menu', function() { wideMenu.showHideMobile() })
	.on('click', '.js_buy', function () { happyNewYear.showPopup(true, this) })
	.on('click', '.js_close-popup', function () { happyNewYear.showPopup(false) })
	.on('click', '.js_overlay', function () { happyNewYear.showPopup(false) })
	.on('click', '.js_send', function () { happyNewYear.sendOrder(); });