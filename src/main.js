import {PointTrip} from './make-point.js';
import {EditTrip} from './pointEdit';
import {Filter} from './filter';
import {getTimeIsNow, openStats} from '../src/utils.js';
import {filtersName} from '../src/data.js';
import {API} from './api.js';
import {renderMoneyChart, renderTransportChart} from '../src/statistic.js';
import moment from 'moment';


const tripFilter = document.querySelector(`.trip-filter`);
const tripItems = document.querySelector(`.trip-day__items`);
const dataNow = document.querySelector(`.trip-day__title`);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});


// вопрос по этому куску кода

const getData = async () => {
  return await Promise.all([api.loadPoints(), api.loadOffers(), api.loadDestinations()]);

};

const data = getData();

console.log(data); // в data сохранился промис

// ----

const renderPointTrip = (data) => {
  tripItems.innerHTML = ``;
  const fragment = document.createDocumentFragment();

  const [points, offers, destinations] = data;

  for (const it of points) {
    const pointTrip = new PointTrip(it);
    const editPointTrip = new EditTrip({it, offers, destinations});
    fragment.appendChild(pointTrip.render());

    pointTrip.onEdit = () => {
      editPointTrip.descriptionDatalistNames = destinations;
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
      editPointTrip.description = destinations.find((item) => item.name === evt.target.value);
    };

    editPointTrip.onChangeTravelType = (evt) => {
      editPointTrip.type = evt.target.value;
      editPointTrip.offers = offers.find((item) => item.type === evt.target.value).offers;

    };
  }

  tripItems.appendChild(fragment);

};

api.loadData()
  .then((data) => {
    const [points, offers, destinations] = data;
    renderPointTrip(data);


    const filters = new Filter();
    const renderFilter = () => {
      tripFilter.appendChild(filters.render());
    };

    renderFilter(filtersName);


    filters.onChange = (it) => {
      const sortData = filters.filterPoint(points, it.target.id);
      renderPointTrip(sortData, tripItems);
    };

    openStats();

    //renderMoneyChart(points);
    //renderTransportChart(points);
  });

dataNow.innerHTML = moment(getTimeIsNow(), `x`).format(`MMM DD`);

