import {PointTrip} from './make-point.js';
import {EditTrip} from './pointEdit';
import {Filter} from './filter';
import {getTimeIsNow} from '../src/utils.js';
import {getTrips, filtersName} from '../src/data.js';
import moment from 'moment';

const tripFilter = document.querySelector(`.trip-filter`);
const tripItems = document.querySelector(`.trip-day__items`);
const dataNow = document.querySelector(`.trip-day__title`);

const getDataForPointTrip = getTrips();

const renderPointTrip = (data) => {
  tripItems.innerHTML = ``;
  const fragment = document.createDocumentFragment();

  for (const it of data) {
    const pointTrip = new PointTrip(it);

    const editPointTrip = new EditTrip(it);

    if (it.display) {
      fragment.appendChild(pointTrip.render());
    }

    pointTrip.onEdit = () => {
      editPointTrip.render();
      tripItems.replaceChild(editPointTrip.element, pointTrip.element);
      pointTrip.unRender();
    };

    editPointTrip.onSubmit = (newObject) => {
      it.offers = newObject.offers;
      it.price = newObject.price;
      it.type = newObject.type;
      it.time = newObject.time;

      pointTrip.update(it);
      pointTrip.render();
      tripItems.replaceChild(pointTrip.element, editPointTrip.element);
      editPointTrip.unRender();
    };

    editPointTrip.onDelete = () => {
      it.display = false;
      editPointTrip.unRender();
    };
  }

  tripItems.appendChild(fragment);

};

renderPointTrip(getDataForPointTrip.events);
dataNow.innerHTML = moment(getTimeIsNow(), `x`).format(`MMM DD`);

const filters = new Filter();

const renderFilter = () => {
  tripFilter.appendChild(filters.render());
};

renderFilter(filtersName);

filters.onchange = (it) => {
  const sortData = filters.filterPoint(getDataForPointTrip, it.target.id);
  renderPointTrip(sortData, tripItems);
};

