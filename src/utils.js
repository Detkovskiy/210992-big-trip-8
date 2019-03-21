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

/* Временная функция для проверки фильтров. Устанавливает время на 6 утра */
const getTimeIsNow = () => moment().startOf(`day`).add(6, `hours`).format(`x`);

export {getRandomFromInterval, getRandomArr, getRandomDescription, createElement, getTimeIsNow, openStats};
