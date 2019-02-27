import renderFilter, {tripFilter} from '../src/make-filter.js';
import renderTrip from './make-point.js';

const filtersName = [
  {
    label: `everything`,
    checked: true,
  },
  {
    label: `future`,
  },
  {
    label: `past`,
  }
];

renderFilter(filtersName);
renderTrip(7);

/* Обработчик выбора фильтра */
const getRandomFromInterval = (min, max) => Math.random() * (max - min) + min;
tripFilter.addEventListener(`change`, () => renderTrip(getRandomFromInterval(3, 10)));
