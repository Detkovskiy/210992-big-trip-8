import {getTripDays, sectionTripPoints} from './utils';

const sortingEvent = document.querySelector(`label[for="sorting-event"]`);
const sortingTime = document.querySelector(`label[for="sorting-time"]`);
const sortingPrice = document.querySelector(`label[for="sorting-price"]`);

export const sortingPoints = (data, getRenderPointTrip) => {
  sortingEvent.addEventListener(`click`, () => {
    data.points.sort((a, b) => a.timeStart - b.timeStart);
    sectionTripPoints.appendChild(getTripDays(data, getRenderPointTrip));
  });

  sortingPrice.addEventListener(`click`, () => {
    data.points.sort((a, b) => a.price - b.price);
    sectionTripPoints.appendChild(getTripDays(data, getRenderPointTrip));
  });

  sortingTime.addEventListener(`click`, () => {
    data.points.sort((a, b) => (a.timeEnd - a.timeStart) - (b.timeEnd - b.timeStart));
    sectionTripPoints.appendChild(getTripDays(data, getRenderPointTrip));
  });
};
