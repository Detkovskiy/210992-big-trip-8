import {renderFilter} from './filters/render-filters';
import {allPointsPrice} from '../src/utils.js';
import {statisticInit} from '../src/statistic.js';
import {model} from './model';

const newEventPoint = document.querySelector(`.new-event`);
const tripTotalCost = document.querySelector(`.trip__total-cost`);

renderFilter();

model.init();
model.update();

statisticInit();

// старый код

/*

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
*/

/*
sectionTripPoints.innerHTML = message.loadData;

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

*/
