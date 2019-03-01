import {renderFilter} from '../src/make-filter.js';
import {renderTrip} from './make-point.js';
import {getRandomFromInterval, render} from '../src/utils.js';
import {trips} from '../src/data.js';

const tripFilter = document.querySelector(`.trip-filter`);
const tripItems = document.querySelector(`.trip-day__items`);


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

render(tripFilter, renderFilter(filtersName));
render(tripItems, renderTrip(trips()));


/* Обработчик выбора фильтра */
tripFilter.addEventListener(`change`, () => render(tripItems, renderTrip(getRandomFromInterval(3, 10))));

