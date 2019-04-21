import {renderFilter} from './filters/render-filters';
import {pointsPriceInit} from '../src/utils.js';
import {statisticInit} from '../src/statistic.js';
import {sortingPoints} from './sortingPoints';
import {newPointInit} from './point/new-point';
import {model} from './model';


renderFilter();

model.init();
model.update();

statisticInit();


sortingPoints();

newPointInit();


// старый код

/*

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

    tripTotalCost.innerHTML = `€ ${pointsPriceInit(dataTrips.points)}`;

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
