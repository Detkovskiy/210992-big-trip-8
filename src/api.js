import {ModelPoint} from './model-point';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};


const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

export const API = class {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  loadData() {
    return Promise.all([
      this.loadPoints(),
      this.loadOffers(),
      this.loadDestinations()
    ])
      .catch((error) => {
        throw new Error(error);
      });
  }

  loadPoints() {
    return this._load({url: `points`})
      .then(toJSON)
      .then(ModelPoint.parsePoints);
  }

  loadOffers() {
    return this._load({url: `offers`})
      .then(toJSON);
  }

  loadDestinations() {
    return this._load({url: `destinations`})
      .then(toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {

    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};
