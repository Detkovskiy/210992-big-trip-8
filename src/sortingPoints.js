import {getTripDays, sectionTripPoints} from './utils';
import {renderPointTrip} from "./point/render-points";
import {model} from './model';
import moment from "moment";


const sortingEvent = document.querySelector(`label[for="sorting-event"]`);
const sortingTime = document.querySelector(`label[for="sorting-time"]`);
const sortingPrice = document.querySelector(`label[for="sorting-price"]`);

export const sortingPoints = () => {
  sortingEvent.addEventListener(`click`, () => {
    data.points.sort((a, b) => a.timeStart - b.timeStart);
   // sectionTripPoints.appendChild(getTripDays(data, getRenderPointTrip));
  });

  sortingPrice.addEventListener(`click`, () => {

    const ss = model.dataStat.sort((a, b) => a.price - b.price);


    const adaptData = (data) => {
      const tripsForDays = {};

      data.forEach((it) => {
        const day = moment(it.timeStart).format(`D MMM`);

        if (!tripsForDays[day]) {
          tripsForDays[day] = [];
        }

        tripsForDays[day].push(it);
      });

      return tripsForDays;
    };

    console.log(ss);
    console.log(adaptData(ss));

    sectionTripPoints.appendChild(renderPointTrip(adaptData(ss)));

    //sectionTripPoints.appendChild(getTripDays(data, getRenderPointTrip));
  });

  sortingTime.addEventListener(`click`, () => {
    data.points.sort((a, b) => (a.timeEnd - a.timeStart) - (b.timeEnd - b.timeStart));
   // sectionTripPoints.appendChild(getTripDays(data, getRenderPointTrip));
  });
};
