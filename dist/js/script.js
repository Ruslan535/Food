const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

//Функция которая скрывает контент в табах
function hideTabContent() {
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });
    //Удаляем класс активности с выбранно таба
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}

//Функция которая показывает табы
function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (item == target) {
                hideTabContent(); 
                showTabContent(i);
            }
        });
    }
});

//Timer

const deadline = '2021-03-3';

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor((t / (1000 * 60 * 60) % 24)),
          minutes = Math.floor((t / 1000 / 60) % 60),
          seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    };
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.timer', deadline);

//Modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');

function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearInterval(timerModal);
}

modalTrigger.forEach(item => {
    item.addEventListener('click', openModal);
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
        closeModal();
    }
});

const timerModal = setTimeout(openModal, 50000);

function showModalBySroll() {
         //Прокрученная часть стр.        //Видимая часть стр.                 //Размер целой стр.   
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalBySroll);
    }
}

window.addEventListener('scroll', showModalBySroll);

//Menu Card

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = (document.querySelector(parentSelector));
        this.course = 29;
        this.changeToUAH();
    }

    changeToUAH() {
        this.price = this.price * this.course;
    }

    render() {
        const element = document.createElement('div');

        if(this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
        }else {
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(element);
    }
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    'menu__item'
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    19,
    '.menu .container',
    'menu__item'
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    '.menu .container',
    'menu__item'
).render();

//Forms

const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/form/spinner.svg',
    succes: 'Спасибо, скоро мы свяжемся с вами!',
    failure: 'Произошла ошибка.'
};

forms.forEach(item => {
    postForm(item);
});

function postForm(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = ` 
            display: block;
            margin: 0 auto;
        `;
        form.append(statusMessage);

        const request = new XMLHttpRequest();

        request.open('POST', 'server.php');

        const formData = new FormData(form);
        request.send(formData);

        request.addEventListener('load', () => {
            if(request.status === 200) {
                console.log(request.response);
                showThanksModal(message.succes);
                form.reset();
                statusMessage.remove();
            }else {
                showThanksModal(message.failure);
            }
        });
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}

//Slider

const slides = document.querySelectorAll('.offer__slide'),
      slider = document.querySelector('.offer__slider'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      sliderInner = document.querySelector('.offer__slider-inner'),
      sliderWrapper = document.querySelector('.offer__slider-wrapper'),
      width = window.getComputedStyle(sliderWrapper).width;

let offset = 0;
let slideIndex = 1;

sliderInner.style.display = 'flex';
sliderInner.style.width = 100 * slides.length + '%';
sliderInner.style.transition = '0.5s all';

sliderWrapper.style.overflow = 'hidden';

slider.style.position = 'relative';

slides.forEach(slide => {
    slide.style.width = width;
});

if(slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;
}

const dots = document.createElement('ol'),
      arrDots = [];
dots.classList.add('carousel-indicators');

dots.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
slider.append(dots);

for(let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;
    if(i == 0) {
        dot.style.opacity = 1;
    }

    dots.append(dot);
    arrDots.push(dot);
}

next.addEventListener('click', () => {
    if(offset == deleteNoDigits(width) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += deleteNoDigits(width);
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    currentSliderItem();
    styleDots();
});

prev.addEventListener('click', () => {
    if(offset == 0) {
        offset = deleteNoDigits(width) * (slides.length - 1);
    } else {
        offset -= deleteNoDigits(width);
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    currentSliderItem();
    styleDots();
});

arrDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = deleteNoDigits(width) * (slideTo - 1);

        sliderInner.style.transform = `translateX(-${offset}px)`;

        currentSliderItem();
        styleDots();
    });
});
function styleDots() {
    arrDots.forEach(dot => dot.style.opacity = '.5');
    arrDots[slideIndex - 1].style.opacity = 1;
}
function currentSliderItem() {
    if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
}
function deleteNoDigits(str) {
    return +str.replace(/\D/g, '');
} 