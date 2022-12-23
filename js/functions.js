$(() => {
	// Есть ли поддержка тач событий или это apple устройство
	if (!is_touch_device() || !/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) $('html').addClass('custom_scroll')


	// Ленивая загрузка
	setTimeout(() => {
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: (el) => el.classList.add('loaded')
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')





			// Основной слайдер на главной
		if ($('.first_section .swiper-container').length) {
		new Swiper('.first_section .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			
		})
	}



	const mySwiper = new Swiper('.staff .swiper-container', {
		loop: false,
		slidesPerView: 4,
		slidesPerColumn: 2,
		slidesPerColumnFill: 'row',
		spaceBetween: 30,	
		
		breakpoints: {
			0: {
			  slidesPerView: 1,
			  slidesPerColumn: 1,
			  spaceBetween: 0
			},
			479: {
			  slidesPerView: 2,
			  slidesPerColumn: 2,
			  spaceBetween: 25
			},
			767: {
				slidesPerView: 3,
				slidesPerColumn: 2,
				spaceBetween: 25
			},
			1023: {
			  slidesPerView: 4,
			  slidesPerColumn: 2,
			  spaceBetween: 25
			}
		  },
   
		navigation: {
		  nextEl: '.arrow-right',
		  prevEl: '.arrow-left',
		},
	   
	  });


	$(".hide-content").hide();
	$(".news_link").click(function(e) {
		e.preventDefault();
		$(this).next(".hide-content").slideToggle();
		$(".news_link").addClass("active");
	});


	// Скрол к пунктам меню
	$(".scroll").on("click", function(e){
		e.preventDefault();
		let id = $(this).attr("href");

		$("html, body").animate({
				scrollTop: $(id).offset().top - 90
			}, {
				duration: 1500,
				easing: "swing"
		});
	});




	// Моб. версия
	fiestResize = false

	if ($(window).width() < 360) {
		$('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')

		fiestResize = true
	}


	if (is_touch_device()) {
		// Закрытие моб. меню свайпом справо на лево
		let ts

		$('body').on('touchstart', (e) => { ts = e.originalEvent.touches[0].clientX })

		$('body').on('touchend', (e) => {
			let te = e.originalEvent.changedTouches[0].clientX

			if ($('body').hasClass('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				$('header .mob_menu_btn').removeClass('active')
				$('body').removeClass('menu_open')
				$('header .menu').removeClass('show')
				$('.overlay').fadeOut(300)
			} else if (ts < te - 50) {
				// Свайп слева на право
			}
		})
	}
})



$(window).resize(() => {
	// Моб. версия
	if (!fiestResize) {
		$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
		if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')

		fiestResize = true
	} else {
		fiestResize = false
	}
})



// Вспомогательные функции
const is_touch_device = () => !!('ontouchstart' in window)


const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}