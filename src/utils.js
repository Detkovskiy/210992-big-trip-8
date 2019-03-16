const getRandomFromInterval = (min, max) => Math.floor(Math.random() * (max - min) + min);
const moment = require(`moment`);


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

/* Функция отрисовки контента */
const render = (root, content) => {
  root.innerHTML = content;
};

export {getRandomFromInterval, getRandomArr, getRandomDescription, createElement, moment, render};
