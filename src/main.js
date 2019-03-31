import {PointTrip} from './make-point.js';
import {EditTrip} from './pointEdit';
import {Filter} from './filter';
import {getTimeIsNow, openStats} from '../src/utils.js';
import {trips, filtersName} from '../src/data.js';
import {renderMoneyChart, renderTransportChart} from '../src/statistic.js';
import moment from 'moment';
import {API} from './api';

const tripFilter = document.querySelector(`.trip-filter`);
const tripItems = document.querySelector(`.trip-day__items`);
const dataNow = document.querySelector(`.trip-day__title`);

const renderPointTrip = (data) => {
  tripItems.innerHTML = ``;
  const fragment = document.createDocumentFragment();

  for (const it of data.events) {
    const pointTrip = new PointTrip(it);
    const editPointTrip = new EditTrip(it);
    fragment.appendChild(pointTrip.render());

    pointTrip.onEdit = () => {
      editPointTrip.descriptionNames = data.destinations;
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

    editPointTrip.onChangeDestination = (evt) => {
      editPointTrip.description = data.destinations.find((item) => item.name === evt.target.value);
    };
  }

  tripItems.appendChild(fragment);

};

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

api.getDate(`destinations`)
  .then((data) => {
    trips.destinations = data;

    api.getDate(`offers`)
      .then((offers) => {
        trips.offers = offers;

        api.getDate(`points`)
          .then((points) => {
            trips.events = points;
            renderPointTrip(trips);

            const filters = new Filter();
            const renderFilter = () => {
              tripFilter.appendChild(filters.render());
            };

            renderFilter(filtersName);

            filters.onChange = (it) => {
              const sortData = filters.filterPoint(trips, it.target.id);
              renderPointTrip(sortData, tripItems);
            };

            openStats();

            renderMoneyChart(trips.events);
            renderTransportChart(trips.events);

          });
      });
  });

dataNow.innerHTML = moment(getTimeIsNow(), `x`).format(`MMM DD`);

