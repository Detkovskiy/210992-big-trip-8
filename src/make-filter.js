export const renderFilter = (filters) => {
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
  return content;
};

