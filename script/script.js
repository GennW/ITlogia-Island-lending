$(function () {

    // slick
    //for block6 //////////////////////////////
    $('.block6-carousel-slick').slick({
        dots: false,
        // arrows: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        // назначаем свои стрелки по нажатию
        prevArrow: '.squere-btn-left',
        nextArrow: '.squere-btn-right'
    });
    // переключение картинок
    $('.squere-btn-left, .squere-btn-right').click(function () {  // Получение текущего активного изображения
        let currentImage = $('.block6-image .block6-img:not(.none)');

        // Получение следующего изображения в зависимости от нажатой кнопки
        let nextImage;
        if ($(this).hasClass('squere-btn-left')) {    // Если нажата кнопка "влево", получаем предыдущее изображение
            nextImage = currentImage.prev('.block6-img');

            // Если нет предыдущего изображения, выбираем последнее изображение
            if (nextImage.length === 0)
                nextImage = $('.block6-image .block6-img').last();
        } else {    // Если нажата кнопка "вправо", получаем следующее изображение
            nextImage = currentImage.next('.block6-img');

            // Если нет следующего изображения, выбираем первое изображение
            if (nextImage.length === 0)
                nextImage = $('.block6-image .block6-img').first();
        }

        // Обновление активного изображения
        currentImage.addClass('none');
        nextImage.removeClass('none');
    });

    //for block7 ////////////////////////////////////////
    $('.block7-carousel-slick').slick({
        dots: false,
        infinite: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        // назначаем свои стрелки по нажатию
        prevArrow: '.squere-btn-left-block7',
        nextArrow: '.squere-btn-right-block7'
    });

    //for block8 ////////////////////////////////////////



    function initSlider() {
        if ($(window).width() > 768) {
            // Показываем большую карусель
            if ($('.carousel-slick-mini').hasClass('slick-initialized')) {
                $('.carousel-slick-mini').slick('unslick');
            }
            if (!$('.carousel-slick-big').hasClass('slick-initialized')) {
                $('.carousel-slick-big').slick({
                    dots: true,
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                    prevArrow: '.slick-prev',
                    nextArrow: '.slick-next'
                });
            }
        } else {
            // Показываем мини-карусель
            if ($('.carousel-slick-big').hasClass('slick-initialized')) {
                $('.carousel-slick-big').slick('unslick');
            }
            if (!$('.carousel-slick-mini').hasClass('slick-initialized')) {
                $('.carousel-slick-mini').slick({
                    dots: true,
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                    prevArrow: '.slick-prev',
                    nextArrow: '.slick-next'
                });
            }
        }
    }

    // Инициализируем слайдер при загрузке страницы
    initSlider();

    // Отслеживаем изменение ширины экрана при изменении размера окна
    $(window).on('resize', function () {
        initSlider();
    });


    // magnificPopup
    // https://dimsemenov.com/plugins/magnific-popup/documentation.html
    $('.popup-img').magnificPopup({
        type: 'image',
        zoom: {
            enabled: true,
            duration: 500,
            easing: 'ease-in-out',
        }
    });

    $('.popup-img-mini').magnificPopup({
        type: 'image',
        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it
            duration: 500, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function
        }
    });



    // требования в ТЗ ///////////////////////////

    // burger

    $('#burger').on('click', () => {
        $('.menu').css('display', 'block');
        // Метод forEach должен вызываться на массиве toArray
        $('.menu-items').toArray().forEach((item) => {
            $(item).click(() => {
                $('.menu').hide();
            })
        })
    });


    // плавный переход по ссылкам
    //вариант 1
    $('.menu-item').eq(0).click(function () {
        $('.block2')[0].scrollIntoView({ behavior: 'smooth' })
    });
    // вариант 2
    $('.menu-item').eq(0).click(() => {
        $('html, body').animate({
            scrollTop: $('.block2').offset().top
        }, 800);
    });
    $('.menu-item').eq(1).click(() => {
        $('html, body').animate({
            scrollTop: $('.block6').offset().top
        }, 800);
    });
    $('.menu-item').eq(2).click(() => {
        $('html, body').animate({
            scrollTop: $('.block7').offset().top
        }, 800);
    });
    $('.menu-item').eq(3).click(() => {
        $('html, body').animate({
            scrollTop: $('.block8').offset().top
        }, 800);
    });
    $('.main-btn-book').click(() => {
        $('html, body').animate({
            scrollTop: $('.block9').offset().top
        }, 800);
    });
    $('.btn-play').eq(0).click(() => {
        $('html, body').animate({
            scrollTop: $('.block5').offset().top
        }, 800);
    });


    // блок с видео /////////////////////////
    $('.block5').on('click', function () {
        $('.block5-image').css({ 'opacity': '0', 'height': 'unset', 'margin-bottom': '35%' });
        $('.btn-play').css('display', 'none');
        $('.block5-video').css({ 'display': 'block', 'z-index': '5' });



        player.playVideo();
    });

    //валидация и отправка формы

    $('.request__btn').on('click', () => {
        let inputName = $('.base-input').eq(0);
        let inputPhone = $('.base-input').eq(1);
        let hasError = false;

        $('.input-error').hide();
        $('input').css('border-color', 'white');

        if (!inputName.val()) {
            inputName.css('border-color', 'red');
            inputName.next().show();
            hasError = true;
        }
        if (!inputPhone.val()) {
            inputPhone.css('border-color', 'red');
            inputPhone.next().show();
            hasError = true;
        }
        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: { name: inputName.val(), phone: inputPhone.val() }
            })
                .done((msg) => {
                    console.log(msg);
                    if (msg.success) {
                        $('.block9-form').hide();
                        $('.order-true').css('display', 'grid');
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                })
        }
    })
    //сделать новый заказ
    $('.text-block-btn').on('click', () => {
        $('.block9-form').show();
        $('.order-true').hide();
    })

    //     wow  wow wow  /////////////////////////////

    new WOW({
        animateClass: 'animate__animated',
    }).init();

    // маска телефона //////////////////////////////////////
    let phoneInput = $('.base-input').eq(1);
    phoneInput.on('input', function (e) {
        let input = e.target;
        let cleanedValue = input.value.replace(/[^\d]/g, ''); // Очистка от нецифровых символов

        if (cleanedValue.length > 11) {
            cleanedValue = cleanedValue.slice(0, 11);
        }

        let formattedValue = '+7 (' + cleanedValue.substring(1, 4) + ') ' + cleanedValue.substring(4, 7) + '-' + cleanedValue.substring(7, 9) + '-' + cleanedValue.substring(9, 11);

        input.value = formattedValue;
    });

    /* 
    Если сделать маску телефона  с помощью библиотеки Inputmask.js
    https://robinherbots.github.io/Inputmask/#/documentation
  
    Подключить библиотеку Inputmask.js в HTML-файл:
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/jquery.inputmask.bundle.min.js"></script>
    Добить код JavaScript, который инициализирует маску
    $(document).ready(function(){
      Inputmask("+7(999)-99-99").mask("#phone-input");
    });
 Заменить "#phone-input" на соответствующий селектор.
    В  HTML-коде  поле ввода для телефона:
    <input type="text" id="phone-input" placeholder="+7(000)-00-00">
    Указать соответствующий идентификатор (id)
    */


}) // конец  кода после полной загрузки DOM.



//API Youtoobe
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'lBJyaIR1mlw',
        playerlets: {
            'autoplay': 0,
            'controls': 1,
            'rel': 0,
            'showinfo': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    let playerElement = $(event.target.getIframe());

    // Применение стилей границы к плееру
    playerElement.css({
        'border-radius': '50px',
        'border': '10px solid #332f2f', // Здесь  выбрать нужный цвет и толщину границы
        'height': '100%'
    });
}

