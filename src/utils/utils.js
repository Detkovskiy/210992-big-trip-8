import {model} from './model';
import {provider} from '../point/render-points';

const sectionTripPoints = document.querySelector(`.trip-points`);
const tripTotalCost = document.querySelector(`.trip__total-cost`);

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


const pointsPriceInit = () => {

  let pointsPrice = 0;
  let offersPrice = 0;

  Object.keys(model.points).map((it) => {

    model.points[it].map((i) => {
      pointsPrice += i.price;

      i.offers.map((j) => {

        if (j.accepted) {
          offersPrice += j.price;
        }
      });
    });
  });

  tripTotalCost.innerHTML = `€ ${pointsPrice + offersPrice}`;
};

const getTripDayTemplate = (day, count) => {
  return `<section class="trip-day">
      <article class="trip-day__info">
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">${count + 1}</p>
        <h2 class="trip-day__title">${day}</h2>
      </article>

      <div class="trip-day__items">
      </div>
    </section>`;
};

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});

window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncPoints();
});

const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

export {getTripDayTemplate, createElement, sectionTripPoints, pointsPriceInit, objectToArray};
