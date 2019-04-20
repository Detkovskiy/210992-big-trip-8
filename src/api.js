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

export class Api {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  loadAllData() {
    return Promise.all([
      this.loadPoints(),
      this.loadOffers(),
      this.loadDestinations()
    ]);
  }

  loadPoints() {
    return this._load({url: `points`})
      .then(toJSON);
  }

  loadOffers() {
    return this._load({url: `offers`})
      .then(toJSON);
  }

  loadDestinations() {
    return this._load({url: `destinations`})
      .then(toJSON);
  }

  updateTask({id, data}) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelPoint.parsePoint);
  }

  create(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  deleteTask({id}) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {

    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}

