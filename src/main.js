import {renderFilter} from '../src/make-filter.js';
import {Trip} from './make-point.js';
import {EditTrip} from './pointEdit';
import {render} from '../src/utils.js';
import {getTrips} from '../src/data.js';

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

const cardTask = new Trip(getTrips());
tripItems.appendChild(cardTask.render());

const editCardTask = new EditTrip(getTrips());

cardTask.onEdit = () => {
  editCardTask.render();
  tripItems.replaceChild(editCardTask.element, cardTask.element);
  cardTask.unRender();
};

editCardTask.onSubmit = () => {
  cardTask.render();
  tripItems.replaceChild(cardTask.element, editCardTask.element);
  editCardTask.unRender();
};
