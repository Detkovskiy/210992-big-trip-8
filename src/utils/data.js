import moment from 'moment';
import {Api} from "./api";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZsswszz=`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const api = new Api({endPoint: END_POINT, authorization: AUTHORIZATION});

const icons = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'drive': `🚗`,
  'train': `🚂`,
  'flight': `✈️`,
  'check-in': `🏨`,
  'sightseeing': `🏛`
};

const message = {
  loadData: `Loading route...`,
  loadFail: `Something went wrong while loading your route info. Check your connection or try again later`,
  saving: `Saving...`,
  deleting: `Deleting...`,
  save: `Save`,
  delete: `Delete`
};

const getDefaultDataNewPoint = (lastId) => {
  return {
    id: lastId,
    price: 0,
    isFavorite: false,
    type: `taxi`,
    timeStart: +moment().format(`x`),
    timeEnd: +moment().format(`x`),
    offers: [],
    destination: {
      name: ``,
      description: ``,
      pictures: []
    }
  };
};

export {message, getDefaultDataNewPoint, api, icons};
