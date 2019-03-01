const getRandomFromInterval = (min, max) => Math.floor(Math.random() * (max - min) + min);

/* Функция отрисовки контента */
const render = (root, content) => {
  root.innerHTML = content;
};

export {getRandomFromInterval, render};
