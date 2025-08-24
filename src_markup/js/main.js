$(document).ready(function () {
  /** Глобальные переменные */
  var WIN = $(window),
    DOC = $(document),
    HTML = $('html'),
    BODY = $('body')

  /** Определяем браузеры Internet Explorer 11 и Edge */
  let ua = window.navigator.userAgent,
    edge_ua = ua.indexOf('Edge/'),
    ie_ua = ua.indexOf('Trident/7.0'),
    edge = 'edge',
    ie = 'ie'
  if (edge_ua > 0) {
    HTML.addClass(edge)
  }
  if (ie_ua + 1) {
    HTML.addClass(ie)
  }
  /** End **/

  /** Profile меню **/

  function userMenu() {
    let opener = $('[data-user-menu]')
    let wrapper = $('[data-user-menu-wrapper]')
    opener.on('click', function (e) {
      e.preventDefault()
      let that = $(e.target)
      if (!that.hasClass('close')) {
        wrapper.toggleClass('opened')
        opener.toggleClass('active')
      } else {
        wrapper.removeClass('opened')
        opener.removeClass('active')
      }
    })
  }

  userMenu()

  /** Profile меню **/

  function profileMenu() {
    let opener = $('[data-profile-menu]')
    let wrapper = $('[data-profile-menu-wrapper]')
    opener.on('click', function (e) {
      e.preventDefault()
      let that = $(e.target)
      if (!that.hasClass('close')) {
        wrapper.toggleClass('opened')
        opener.toggleClass('active')
      } else {
        wrapper.removeClass('opened')
        opener.removeClass('active')
      }
    })
  }

  profileMenu()

  const textSlider = new Swiper('[data-slider-text]', {
    loop: true,
    speed: 1000,
    autoplay: true,
    slidesPerView: 2,
    freeMode: true,
    slidesPerGroup: 1,
    spaceBetween: 12,
    breakpoints: {
      980: {
        loop: true,
        speed: 1000,
        autoplay: true,
        slidesPerView: 5,
        freeMode: true,
        slidesPerGroup: 1,
        spaceBetween: 12,
      },
    },
  })

  const programSlider = new Swiper('[data-slider-program]', {
    loop: false,
    speed: 1000,
    slidesPerView: 'auto',
    freeMode: true,
    slidesPerGroup: 1,
    spaceBetween: 12,
    // If we need pagination
    pagination: {
      el: '.lessons-slider__pagination',
    },
    breakpoints: {
      980: {
        slidesPerView: 'auto',
        slidesPerGroup: 4,
        spaceBetween: 30,
        // Navigation arrows
        navigation: {
          nextEl: '.slider-button__next',
          prevEl: '.slider-button__prev',
        },
      },
    },
  })

  const feedbackSlider = new Swiper('[data-slider-feedback]', {
    loop: false,
    autoplay: true,
    speed: 1000,
    slidesPerView: 1,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })

  const teacherSlider = new Swiper('[data-slider-feedback-teacher]', {
    loop: true,
    autoplay: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 40,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
  })

  const feedbackLandingSlider = new Swiper('[data-slider-feedback-landing]', {
    loop: false,
    autoplay: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 20,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      980: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  })

  const librarySlider = new Swiper('[data-slider-library]', {
    loop: false,
    speed: 1000,
    slidesPerView: 'auto',
    freeMode: true,
    slidesPerGroup: 1,
    spaceBetween: 12,
    // If we need pagination
    pagination: {
      el: '.lessons-slider__pagination',
    },
    breakpoints: {
      980: {
        slidesPerView: 'auto',
        slidesPerGroup: 4,
        spaceBetween: 30,
        // Navigation arrows
        navigation: {
          nextEl: '.slider-button__next',
          prevEl: '.slider-button__prev',
        },
      },
    },
  })

  const libraryAudioSlider = new Swiper('[data-slider-library-audio]', {
    loop: false,
    speed: 1000,
    freeMode: true,
    spaceBetween: 12,
    slidesPerView: 'auto',
    grid: {
      rows: 4,
      fill: 'row',
    },
    // Navigation arrows
    navigation: {
      nextEl: '.slider-button__next',
      prevEl: '.slider-button__prev',
    },
  })

  /** Иниализация отложенной подгрузки изображений + замена битого изображения логотипом проекта */
  function lazyLoad() {
    $('[data-lazy] img[data-src]').Lazy({
      scrollDirection: 'vertical',
      effect: 'fadeIn',
      effectTime: 200,
      onError: function (element) {
        element
          .attr('src', '../img/logos/logo.svg')
          .parent()
          .addClass('no-photo')
      },
    })
  }
  lazyLoad()
  /** End **/

  /** Мобильное меню **/
  // десктоп
  DOC.on('click', '[data-mobile-nav]:not(.opened) i', function (event) {
    event.preventDefault()
    $('[data-mobile-nav]').addClass('opened')
  })
  DOC.on(
    'click',
    '[data-mobile-nav].opened [data-mobile-nav-opener]',
    function () {
      $('[data-mobile-nav]').removeClass('opened')
    }
  )

  // мобильное меню бургер
  function mobileMenu() {
    let opener = $('[data-burger-menu-opener]')
    let wrapper = $('[data-burger-menu]')
    let closer = $('[data-burger-menu-closer]')
    opener.on('click', function (e) {
      e.preventDefault()
      let that = $(e.target)
      if (!that.hasClass('close')) {
        wrapper.addClass('opened')
        $('body').addClass('fixed')
      } else {
        wrapper.removeClass('opened')
        $('body').removeClass('fixed')
      }
    })
    closer.on('click', function (e) {
      e.preventDefault()
      wrapper.removeClass('opened')
      $('body').removeClass('fixed')
    })
  }

  mobileMenu()

  DOC.on('click', '[data-burger-menu]', function (e) {
    var mobmenu_wrapper = $('[data-burger-menu]')
    if (mobmenu_wrapper.hasClass('opened')) {
      if (!$(e.target).closest('.burger-menu').length) {
        mobmenu_wrapper.removeClass('opened')
        $('body').removeClass('fixed')
      }
      e.stopPropagation()
    }
  })
  /** END Мобильное меню **/

  /** Инициализация типовых модалок **/
  $('[data-modal]').magnificPopup({
    type: 'ajax',
    removalDelay: 100,
  })
  /** End Инициализация модалок **/

  /**
   * Инициализация select menu
   * Используется в формах, которые подгружаются на ajax
   * Для этого вынесен в функцию для использования внутри ajaxSuccess
   **/
  function selectInit() {
    $('[data-select-menu]').each(function () {
      if (!$(this).parent().hasClass('selectric-hide-select')) {
        $(this).selectric({
          maxHeight: 320,
          disableOnMobile: false,
          nativeOnMobile: false,
          arrowButtonMarkup:
            '<b class="selectric__button icon-arrow-down"></b>',
          onInit: function () {
            var current_option = $(this),
              current_option_value = current_option.val(),
              selectric_container = $(this)
                .parents('.selectric-wrapper')
                .find('.selectric')

            // проверка для вывода поля с секретным ответом
            if (
              typeof current_option.attr('data-secret-question') !==
                typeof undefined &&
              current_option.attr('data-secret-question') !== false
            ) {
              if (current_option_value) {
                secret_answer.show()
              } else {
                secret_answer.hide()
              }
            }

            //  эмуляция placeholder'a для селектрика
            if (current_option_value) {
              selectric_container.removeClass('selectric--placeholder')
            } else {
              selectric_container.addClass('selectric--placeholder')
            }

            // проверка на количество эллементов, если 1 - то добавляем класс,
            // который скрывает всю навигацию
            if (current_option.find('option').length === 1) {
              current_option
                .parents('.selectric-wrapper')
                .addClass('selectric--void')
            }
          },
          onChange: function (element) {
            var current_option = $(this),
              current_option_value = current_option.val(),
              selectric_container = $(this)
                .parents('.selectric-wrapper')
                .find('.selectric')

            // проверка для вывода поля с секретным ответом
            if (
              typeof current_option.attr('data-secret-question') !==
                typeof undefined &&
              current_option.attr('data-secret-question') !== false
            ) {
              if (current_option_value) {
                secret_answer.show()
              } else {
                secret_answer.hide()
              }
            }

            //  эмуляция placeholder'a для селектрика
            if (current_option_value) {
              selectric_container.removeClass('selectric--placeholder')
            } else {
              selectric_container.addClass('selectric--placeholder')
            }
          },
        })
      }
    })
  }
  selectInit()
  /** End **/

  /**
   * Закрытие блока при клике вне его пределов
   * */
  DOC.on('click', function (e) {
    // меню quicklinks
    if (
      !$(e.target).closest('[data-user-menu-wrapper], [data-user-menu]').length
    ) {
      $('[data-user-menu-wrapper]').removeClass('opened')
      $('[data-user-menu]').removeClass('active')
    }
    e.stopPropagation()
  })

  /** Событие смены видимости пароля в инпуте */
  var passwordToggler = '[data-password-toggler]'
  DOC.on('click', passwordToggler, function () {
    var btn = $(this),
      input = btn.siblings('input')
    btn.toggleClass('icon-view')
    btn.toggleClass('icon-hide')
    if (input.attr('type') == 'text') {
      input.attr('type', 'password')
    } else {
      input.attr('type', 'text')
    }
  })
  /** End **/

  /**
   * Инициализация модального окна, inline type
   */

  $('[data-modal-inline]').magnificPopup({
    type: 'inline',
    midClick: true,
  })

  /** Событие срабатывает в случае успешного выполнения ajax запроса **/
  $(document).on('ajaxSuccess', function () {
    selectInit()
  })

  /**
   * Удаление пробелов из инпута при вводе
   * */
  DOC.on('change', '[data-trim]', function () {
    $(this).val($(this).val().trim())
  })

  // при ресайзе (только горизонтальном) эмулируем клик на body, из-за этого срабатывает скрипт закрытия блока меню
  var w = $(window).width()

  WIN.on('resize', function () {
    if ($(window).width() == w) return
    w = $(window).width()
    BODY.trigger('click')
  })
})
