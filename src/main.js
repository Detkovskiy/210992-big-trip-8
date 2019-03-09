import {renderFilter} from '../src/make-filter.js';
import {PointTrip} from './make-point.js';
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

const getDataForPointTrip = getTrips();

const renderPointTrip = (data) => {

  const fragment = document.createDocumentFragment();

  for (const it of data.events) {

    const pointTrip = new PointTrip(it);
    const editPointTrip = new EditTrip(it);

    fragment.appendChild(pointTrip.render());

    pointTrip.onEdit = () => {
      editPointTrip.render();
      tripItems.replaceChild(editPointTrip.element, pointTrip.element);
      pointTrip.unRender();
    };

    editPointTrip.onSubmit = () => {
      pointTrip.render();
      tripItems.replaceChild(pointTrip.element, editPointTrip.element);
      editPointTrip.unRender();
    };
  }

  tripItems.appendChild(fragment);

};

renderPointTrip(getDataForPointTrip);
