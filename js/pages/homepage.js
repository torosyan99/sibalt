// ============================
// Custom Select Initialization (Choices.js)
// ============================

const searchSelects = document.querySelectorAll(".select");

for (const el of searchSelects) {
  // Если select с классом "search" — включаем поиск
  if (el.classList.contains("search")) {
    new Choices(el, {
      searchEnabled: true,
      itemSelectText: "",
      placeholder: true,
      classNames: {
        containerInner: ['searching__choices-inner'],
        containerOuter: ['searching__choices', 'search'],
        listDropdown: ['searching__dropdown'],
        itemChoice: ['searching__choice'],
        input: ['searching__search-input'],
      }
    });
  }
  // Если select с классом "detail" — расширенный функционал
  else if (el.classList.contains("detail")) {
    new Choices(el, {
      removeItemButton: true,
      searchEnabled: true,
      shouldSort: false,
      duplicateItemsAllowed: false,
      renderChoiceLimit: -1,
      placeholder: true,
      renderSelectedChoices: 'always',
      classNames: {
        containerInner: ['searching__choices-inner'],
        containerOuter: ['searching__choices', 'detail'],
        listDropdown: ['searching__dropdown'],
        itemChoice: ['searching__choice'],
        listItems: ['searching__multiple']
      }
    });
  }
  // Простые select без поиска
  else {
    new Choices(el, {
      searchEnabled: false,
      searchChoices: false,
      itemSelectText: "",
      classNames: {
        containerInner: ['searching__choices-inner'],
        containerOuter: ['searching__choices', 'simple'],
        listDropdown: ['searching__dropdown'],
        itemChoice: ['searching__choice']
      }
    });
  }
}


// ============================
// Datepicker Localization (Russian)
// ============================

Datepicker.locales.ru = {
  days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
  daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
  daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
  monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
  today: "Сегодня",
  clear: "Очистить",
  format: "dd.mm.yyyy",
  weekStart: 1,
  monthsTitle: "Месяцы"
};


// ============================
// Datepicker "from" and "to"
// ============================

const startInput = document.getElementById('date-start');
const endInput = document.getElementById('date-end');
const today = new Date();

const startPicker = new Datepicker(startInput, {
  format: 'dd.mm.yyyy',
  language: 'ru',
  minDate: today
});

const endPicker = new Datepicker(endInput, {
  format: 'dd.mm.yyyy',
  language: 'ru',
  minDate: today
});

// При выборе даты начала
startInput.addEventListener('changeDate', (event) => {
  const startDate = event.detail.date;

  if (endPicker.getDate() && endPicker.getDate() < startDate) {
    endPicker.setDate(startDate);
    endPicker.update();
    endInput.value = startInput.value;
    endPicker.show();
  }

  endPicker.setOptions({ minDate: startDate });
  startPicker.hide();
});

// При выборе даты окончания
endInput.addEventListener('changeDate', () => endPicker.hide());


// ============================
// Price Range Slider
// ============================

const searchingRange = document.querySelector('.searching__range');

if (searchingRange) {
  const rangeMin = searchingRange.querySelector(".range-min");
  const rangeMax = searchingRange.querySelector(".range-max");
  const minVal = searchingRange.querySelector(".min-val");
  const maxVal = searchingRange.querySelector(".max-val");
  const progress = searchingRange.querySelector(".searching__range-progress");
  const rangeMaxVal = 99000;
  const minGap = 1;

  function updateProgress() {
    const minPercent = (rangeMin.value / rangeMaxVal) * 100;
    const maxPercent = (rangeMax.value / rangeMaxVal) * 100;
    progress.style.left = minPercent + "%";
    progress.style.right = 100 - maxPercent + "%";
  }

  rangeMin.oninput = () => {
    if (+rangeMax.value - +rangeMin.value < minGap) rangeMin.value = +rangeMax.value - minGap;
    minVal.value = rangeMin.value;
    updateProgress();
  };

  rangeMax.oninput = () => {
    if (+rangeMax.value - +rangeMin.value < minGap) rangeMax.value = +rangeMin.value + minGap;
    maxVal.value = rangeMax.value;
    updateProgress();
  };

  minVal.oninput = () => {
    rangeMin.value = Math.min(+minVal.value, +rangeMax.value - minGap);
    updateProgress();
  };

  maxVal.oninput = () => {
    rangeMax.value = Math.max(+maxVal.value, +rangeMin.value + minGap);
    updateProgress();
  };

  updateProgress();
}


// ============================
// Details Section Toggle
// ============================

const details = document.querySelector('.searching__details');
const detailsButton = document.querySelector('.searching__details-button');

detailsButton.addEventListener('click', () => {
  detailsButton.classList.toggle('active');
  details.classList.toggle('active');
});
