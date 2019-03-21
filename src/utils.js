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

/* Временная функция для проверки фильтров. Устанавливает время на 6 утра */
const getTimeIsNow = () => moment().startOf(`day`).add(6, `hours`).format(`x`);

export {getRandomFromInterval, getRandomArr, getRandomDescription, createElement, getTimeIsNow};
