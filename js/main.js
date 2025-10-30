// ============================
// Header Menu Toggle
// ============================

const menu = document.querySelector('.header__menu');
const menuButton = document.querySelector('.header__menu-button');

// Переключение класса "active" для открытия/закрытия меню
menuButton.addEventListener('click', () => {
  menu.classList.toggle('active');
});


// ============================
// Popular Slider (Swiper)
// ============================

new Swiper('.popular__slider', {
  slidesPerView: 1,       // количество слайдов по умолчанию
  spaceBetween: 20,       // отступ между слайдами
  breakpoints: {
    768: { slidesPerView: 2 }, // планшеты
    900: { slidesPerView: 5 }  // десктопы
  },
  navigation: {
    nextEl: '.popular__next',  // кнопка "вперед"
    prevEl: '.popular__prev',  // кнопка "назад"
  },
  pagination: {
    el: '.popular__pagination', // точки пагинации
    clickable: true,            // кликабельные точки
  }
});


// ============================
// Scroll to Top Button
// ============================

const upButton = document.querySelector('.footer__button-up');

// Плавная прокрутка к верху страницы при клике
upButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
