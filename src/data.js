import moment from 'moment';
import {Api} from "./api";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZsxAszz=`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const api = new Api({endPoint: END_POINT, authorization: AUTHORIZATION});

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

export {dataTrips, message, getDefaultDataNewPoint, api};
