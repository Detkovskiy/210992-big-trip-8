import {PointTrip} from './make-point.js';
import {EditTrip} from './pointEdit';
import {Filter} from './filter';
import {getTripDays, openStats, sectionTripPoints, allPointsPrice} from '../src/utils.js';
import {filtersName, dataTrips, message, getDefaultDataNewPoint} from '../src/data.js';
import {API} from './api.js';
import {sortingPoints} from './sortingPoints';
import {renderMoneyChart, renderTransportChart} from '../src/statistic.js';
import {ModelPoint} from './model-point';


const tripFilter = document.querySelector(`.trip-filter`);
const newEventPoint = document.querySelector(`.new-event`);
const tripTotalCost = document.querySelector(`.trip__total-cost`);


const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZsxAoszz=`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const getNewPointForm = ({points, destinations, offers}) => {
  const it = getDefaultDataNewPoint(points);

  const newPoint = new EditTrip({it, destinations, offers});

  newPoint.onChangeDestination = (evt) => {
    newPoint.description = destinations.find((item) => item.name === evt.target.value);
  };

  newPoint.onChangeTravelType = (evt) => {
    newPoint.type = evt.target.value;

  };

  newPoint.onSubmit = (newObject) => {
    newPoint.block();
    newPoint.changeColorBorder(false);
    newPoint.onTextButtonChange(message.saving, `save`);
    const dataSavePoint = {
      'id': it.id,
      'base_price': newObject.price,
      'type': newObject.type,
      'date_from': newObject.timeStart,
      'date_to': newObject.timeEnd,
      'destination': newObject.destination,
      'is_favorite': it.isFavorite,
      'offers': newObject.offers
    };

    api.create(dataSavePoint)
      .then((newTask) => {
        newPoint.update(newTask);
        newPoint.unblock();
        newPoint.unRender();
        sectionTripPoints.appendChild(getTripDays(dataTrips, renderPointTrip));

      })
      .catch(() => {
        newPoint.unblock();
        newPoint.onTextButtonChange(message.save, `save`);
        newPoint.changeColorBorder();
        newPoint.shake();
      });
  };

  return newPoint;
};

sectionTripPoints.innerHTML = message.loadData;

const renderPointTrip = ({points, destinations, offers}, container) => {
  sectionTripPoints.innerHTML = ``;
  const fragment = document.createDocumentFragment();

  for (const it of points) {
    const pointTrip = new PointTrip(it);
    const editPointTrip = new EditTrip({it, destinations, offers});
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

    editPointTrip.onCancel = () => {
      pointTrip.render();
      container.querySelector(`.trip-day__items`).replaceChild(pointTrip.element, editPointTrip.element);
      editPointTrip.unRender();
    };

    editPointTrip.onDelete = ({id}) => {
      editPointTrip.block();
      editPointTrip.changeColorBorder(false);
      editPointTrip.onTextButtonChange(message.deleting, `delete`);

      api.deleteTask({id})
        .then(() => Promise.all([api.loadPoints(), api.loadDestinations(), api.loadOffers()])
          .then(([pointss, destinationss, offerss]) => {
            dataTrips.points = pointss;
            dataTrips.offers = offerss;
            dataTrips.destinations = destinationss;
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
      editPointTrip.description = destinations.find((item) => item.name === evt.target.value);
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

    sortingPoints(dataTrips, renderPointTrip);

    tripTotalCost.innerHTML = `€ ${allPointsPrice(dataTrips.points)}`;

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

    newEventPoint.addEventListener(`click`, () => {
      sectionTripPoints.prepend(getNewPointForm({points, destinations, offers}).render());
    });

  }).catch(() => {
    sectionTripPoints.innerHTML = message.loadFail;
  });

