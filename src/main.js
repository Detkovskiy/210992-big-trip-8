import {PointTrip} from './make-point.js';
import {EditTrip} from './pointEdit';
import {Filter} from './filter';
import {getTripDays, openStats} from '../src/utils.js';
import {filtersName, dataTrips, message} from '../src/data.js';
import {API} from './api.js';
import {renderMoneyChart, renderTransportChart} from '../src/statistic.js';

const tripFilter = document.querySelector(`.trip-filter`);
const sectionTripPoints = document.querySelector(`.trip-points`);

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZsxAoszz=`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

sectionTripPoints.innerHTML = message.loadData;

const renderPointTrip = (data, container) => {
  sectionTripPoints.innerHTML = ``;
  const fragment = document.createDocumentFragment();

  for (const it of data.points) {
    const pointTrip = new PointTrip(it);
    const editPointTrip = new EditTrip({it, data});
    fragment.appendChild(pointTrip.render());

    pointTrip.onEdit = () => {
      editPointTrip.render();
      container.querySelector(`.trip-day__items`).replaceChild(editPointTrip.element, pointTrip.element);
      pointTrip.unRender();
    };

    editPointTrip.onSubmit = (newObject) => {
      editPointTrip.block();
      editPointTrip.changeColorBorder(false);
      editPointTrip.onTextButtonChange(message.saving, `save`);
      it.offers = newObject.offers;
      it.price = newObject.price;
      it.type = newObject.type;
      it.time = newObject.time;
      it.timeStart = newObject.timeStart;
      it.timeEnd = newObject.timeEnd;
      it.destination = newObject.destination;

      api.updateTask({id: it.id, data: it.toRAW()})
        .then((newTask) => {
          pointTrip.update(newTask);
          pointTrip.render();
          container.querySelector(`.trip-day__items`).replaceChild(pointTrip.element, editPointTrip.element);
          editPointTrip.unblock();
          editPointTrip.unRender();
        })
        .catch(() => {
          editPointTrip.unblock();
          editPointTrip.onTextButtonChange(message.save, `save`);
          editPointTrip.changeColorBorder();
          editPointTrip.shake();
        });
    };

    editPointTrip.onDelete = ({id}) => {
      editPointTrip.block();
      editPointTrip.changeColorBorder(false);
      editPointTrip.onTextButtonChange(message.deleting, `delete`);

      api.deleteTask({id})
        .then(() => Promise.all([api.loadPoints(), api.loadDestinations(), api.loadOffers()])
          .then(([points, destinations, offers]) => {
            dataTrips.points = points;
            dataTrips.offers = offers;
            dataTrips.destinations = destinations;
            sectionTripPoints.appendChild(getTripDays(dataTrips));
          }))
          .catch(() => {
            editPointTrip.unblock();
            editPointTrip.onTextButtonChange(message.delete, `delete`);
            editPointTrip.changeColorBorder();
            editPointTrip.shake();
          });
    };

    editPointTrip.onChangeDestination = (evt) => {
      editPointTrip.description = data.destinations.find((item) => item.name === evt.target.value);
    };

    editPointTrip.onChangeTravelType = (evt) => {
      editPointTrip.type = evt.target.value;

    };
  }

  return fragment;

};

Promise.all([api.loadPoints(), api.loadDestinations(), api.loadOffers()])

  .then(([points, destinations, offers]) => {
    sectionTripPoints.innerHTML = ``;
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
      sectionTripPoints.appendChild(getTripDays(dataTrips, renderPointTrip));
    };

    sectionTripPoints.appendChild(getTripDays(dataTrips, renderPointTrip));

    openStats();
    renderMoneyChart(points);
    renderTransportChart(points);

  }).catch(() => {
    sectionTripPoints.innerHTML = message.loadFail;
  });

