const tripFilter = document.querySelector(`.trip-filter`);

/* Функция отрисовки контента */
const render = (root, content) => {
  root.innerHTML = content;
};

export {tripFilter};
export default (filters) => {
  let content = ``;

  /* Шаблон фильтра */
  const getfilter = (filter) => (`
    <input type="radio" id="filter-${filter.label}" name="filter" value="${filter.label}" ${filter.checked ? `checked` : ``}>
    <label class="trip-filter__item" for="filter-${filter.label}">${filter.label}</label>
`);

  /* Заполнение шаблона */
  filters.forEach((filter) => {
    content += getfilter(filter);
  });

  /* Вывод фильтров на станицу */
  render(tripFilter, content);
};

