import moment from 'moment';
const filtersName = [
  {
    label: `everything`,
  },
  {
    label: `future`,
  },
  {
    label: `past`,
  }
];


const dataTrips = {
  points: [],
  destinations: [],
  offers: []
};

const message = {
  loadData: `Loading route...`,
  loadFail: `Something went wrong while loading your route info. Check your connection or try again later`,
  saving: `Saving...`,
  deleting: `Deleting...`,
  save: `Save`,
  delete: `Delete`
};

const getDefaultDataNewPoint = (arrPoints) => {
  return {
    id: arrPoints.length,
    price: 0,
    isFavorite: false,
    type: `taxi`,
    timeStart: moment().format(`x`),
    timeEnd: moment().format(`x`),
    offers: [],
    destination: {
      name: ``,
      description: ``,
      pictures: []
    }
  };
};

export {filtersName, dataTrips, message, getDefaultDataNewPoint};
