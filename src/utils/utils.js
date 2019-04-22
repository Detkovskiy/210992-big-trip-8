import {model} from './model';

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

export {getTripDayTemplate, createElement, sectionTripPoints, pointsPriceInit};
