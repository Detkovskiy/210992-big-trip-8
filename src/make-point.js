/* Функция отрисовки карточки */
export const renderTrip = (tripData) => {
  let content = ``;

  /* Шаблон карточки */
  const cardTemplate = (data) => (`
        <article class="trip-point">
          <i class="trip-icon">${data.icon}</i>
          <h3 class="trip-point__title">${data.type}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${data.time[0]}:00 — ${data.time[1]}:00</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">€&nbsp;${data.price}</p>
          <ul class="trip-point__offers">
          ${[...data.offers].map((it) => `
            <li>
              <button class="trip-point__offer">${it}</button>
            </li>`).join(``)}
          </ul>
        </article>`);

  for (const it of tripData.events) {
    content += cardTemplate(it);
  }

  /* Вывод фильтров на станицу */
  return content;
};
