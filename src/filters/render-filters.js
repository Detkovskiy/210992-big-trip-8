import {Filter} from '../filters/filter';
import {model} from '../model';
import {sectionTripPoints} from "../utils";
import {renderPointTrip} from "../point/render-points";

const tripFilter = document.querySelector(`.trip-filter`);

const filters = new Filter();
const renderFilter = () => {
  tripFilter.appendChild(filters.render());
};

filters.onChange = (evt) => {
  let sortData = {};

  const sortDay = filters.filterPoint(Object.keys(model.points), evt.target.id);
  const getSortArr = (arr) => {
    return arr.reduce((acc, key) => {
      acc[key] = model.points[key];
      return acc;
    }, {});
  };

  sortData[`points`] = getSortArr(sortDay);
  sortData[`offers`] = model.offers;
  sortData[`destinations`] = model.destinations;

  sectionTripPoints.appendChild(renderPointTrip(sortData));
};

export {renderFilter};
