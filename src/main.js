import {PointTrip} from './make-point.js';
import {EditTrip} from './pointEdit';
import {Filter} from './filter';
import {getTimeIsNow, openStats} from '../src/utils.js';
import {filtersName, dataTrips, message} from '../src/data.js';
import {API} from './api.js';
import {renderMoneyChart, renderTransportChart} from '../src/statistic.js';
import moment from 'moment';


const tripFilter = document.querySelector(`.trip-filter`);
const tripItems = document.querySelector(`.trip-day__items`);
const dataNow = document.querySelector(`.trip-day__title`);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAso=`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

tripItems.innerHTML = message.loadData;

const renderPointTrip = (data) => {
  //console.log(data.points);

  tripItems.innerHTML = ``;
  const fragment = document.createDocumentFragment();

  for (const it of data.points) {
    const pointTrip = new PointTrip(it);
    const editPointTrip = new EditTrip({it, data});
    fragment.appendChild(pointTrip.render());

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

    editPointTrip.onChangeDestination = (evt) => {
      editPointTrip.description = data.destinations.find((item) => item.name === evt.target.value);
    };

    editPointTrip.onChangeTravelType = (evt) => {
      editPointTrip.type = evt.target.value;

    };
  }

  tripItems.appendChild(fragment);

};

Promise.all([api.loadPoints(), api.loadDestinations(), api.loadOffers()])

  .then(([points, destinations, offers]) => {
    tripItems.innerHTML = ``;

    dataTrips.points = points;
    dataTrips.offers = offers;
    dataTrips.destinations = destinations;

    const filters = new Filter();
    const renderFilter = () => {
      tripFilter.appendChild(filters.render());
    };

    renderFilter(filtersName);

    filters.onChange = (evt) => {
      dataTrips.points = filters.filterPoint(points, evt.target.id);
      renderPointTrip(dataTrips, tripItems);
    };


    renderPointTrip(dataTrips);

    //openStats();

    //renderMoneyChart(points);
    //renderTransportChart(points);

  }).catch(() => {
    tripItems.innerHTML = message.loadFail;
  });

dataNow.innerHTML = moment(getTimeIsNow(), `x`).format(`MMM DD`);


