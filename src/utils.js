const getRandomFromInterval = (min, max) => Math.floor(Math.random() * (max - min) + min);


const getRandomArr = (count, arr) => {
  const arrOffers = [];
  const sizeArr = arr.length < count ? arr.length : count;

  for (let i = 0; i < sizeArr; i++) {
    arrOffers.push(arr[getRandomFromInterval(0, arr.length)]);
  }

  return arrOffers;
};

const getRandomDescription = (count, text) => {
  const arrStroke = text.split(`. `);

  return getRandomArr(count, arrStroke).join(`. `);
};

/* Функция отрисовки контента */
const render = (root, content) => {
  root.innerHTML = content;
};

export {getRandomFromInterval, getRandomArr, getRandomDescription, render};
