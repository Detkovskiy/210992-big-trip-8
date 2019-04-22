import {sectionTripPoints} from './utils';
import {renderPointTrip} from "./point/render-points";
import {model} from './model';

const sortingEvent = document.querySelector(`label[for="sorting-event"]`);
const sortingTime = document.querySelector(`label[for="sorting-time"]`);
const sortingPrice = document.querySelector(`label[for="sorting-price"]`);

const event = (a, b) => a.timeStart - b.timeStart;
const price = (a, b) => a.price - b.price;
const time = (a, b) => (a.timeEnd - a.timeStart) - (b.timeEnd - b.timeStart);

const sort = (typeSort) => {
  let sortData = {};

  Object.keys(model.points).map((it) => {
    model.points[it].sort(typeSort);
  });

  sortData[`points`] = model.points;
  sortData[`offers`] = model.offers;
  sortData[`destinations`] = model.destinations;

  sectionTripPoints.appendChild(renderPointTrip(sortData));
};

export const sortingPointsInit = () => {
  sortingEvent.addEventListener(`click`, () => {
    sort(event);
  });

  sortingPrice.addEventListener(`click`, () => {
    sort(price);
  });

  sortingTime.addEventListener(`click`, () => {
    sort(time);
  });
};

