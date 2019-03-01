/* Функция отрисовки карточки */
export const renderTrip = (count) => {
  let content = ``;

  /* Шаблон карточки */
  const cardTemplate = () => (`<article class="trip-point">
          <i class="trip-icon">🚕</i>
          <h3 class="trip-point__title">Taxi to Airport</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">10:00&nbsp;— 11:00</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">€&nbsp;20</p>
          <ul class="trip-point__offers">
            <li>
              <button class="trip-point__offer">Order UBER +€&nbsp;20</button>
            </li>
            <li>
              <button class="trip-point__offer">Upgrade to business +€&nbsp;20</button>
            </li>
          </ul>
        </article>`);

  let i = 0;

  while (i < count) {
    content += cardTemplate();
    i++;
  }

  /* Вывод фильтров на станицу */
  return content;
};
