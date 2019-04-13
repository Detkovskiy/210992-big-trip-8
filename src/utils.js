import moment from 'moment';

const getRandomFromInterval = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomArr = (count, arr) => {
  const randomArr = [];
  const sizeArr = arr.length < count ? arr.length : count;

  for (let i = 0; i < sizeArr; i++) {
    randomArr.push(arr[getRandomFromInterval(0, arr.length)]);
  }

  return randomArr;
};

const getRandomDescription = (count, text) => {
  const arrStroke = text.split(`. `);

  return getRandomArr(count, arrStroke).join(`. `);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const openStats = () => {
  const mainBlock = document.querySelector(`.main`);
  const statBlock = document.querySelector(`.statistic`);
  const buttonStat = document.querySelector(`.trip-controls__menus`);
  const triggers = buttonStat.getElementsByClassName(`view-switch__item`);

  for (let i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener(`click`, function (evt) {
      evt.preventDefault();
      buttonStat.querySelector(`.view-switch__item--active`).classList.remove(`view-switch__item--active`);
      triggers[i].classList.add(`view-switch__item--active`);

      if (statBlock.classList.contains(`visually-hidden`)) {
        mainBlock.classList.add(`visually-hidden`);
        statBlock.classList.remove(`visually-hidden`);
      } else {
        mainBlock.classList.remove(`visually-hidden`);
        statBlock.classList.add(`visually-hidden`);
      }
    });
  }
};

const getTripDays = (data, getRenderPointTrip) => {
  const points = data.points;

  const getTripDayTemplate = (date, number) => {
    return `<section class="trip-day">
      <article class="trip-day__info">
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">${number + 1}</p>
        <h2 class="trip-day__title">${date}</h2>
      </article>

      <div class="trip-day__items">
      </div>
    </section>`;
  };

  const fragment = document.createDocumentFragment();
  const countDaysForTrip = new Set(data.points.map((item) => moment(item.timeStart, `x`).format(`MMM D`)));

  Array.from(countDaysForTrip).forEach((day, index) => {

    const tripDay = createElement(getTripDayTemplate(day, index));

    data.points = points.filter((it) => moment(it.timeStart, `x`).format(`MMM D`) === day);

    tripDay.querySelector(`.trip-day__items`).appendChild(getRenderPointTrip(data, tripDay));

    fragment.appendChild(tripDay);
  });

  return fragment;
};

/* Временная функция для проверки фильтров */
const getTimeIsNow = () => moment().format(`x`);

export {getRandomFromInterval, getRandomArr, getTripDays, createElement, getTimeIsNow, openStats};
