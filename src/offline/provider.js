import ModelPoint from "../point/model-point";
import {objectToArray} from "../utils/utils";

export default class Provider {
  constructor({api, store, generateId}) {
    this._api = api;
    this._store = store;
    this._generateId = generateId;
    this._needSync = false;
  }

  loadAllData() {
    if (this._isOnline()) {

      return this._api.loadAllData()
        .then(([points, offers, destinations]) => {
          points.map((it) => this._store.setPoints({key: it.id, item: it}));
          this._store.setOffers(offers);
          this._store.setDestinations(destinations);
          return [points, offers, destinations];
        });
    } else {
      const data = objectToArray(this._store.getAll());
      return Promise.resolve(data);
    }
  }

  updatePoint({id, data}) {
    if (this._isOnline()) {
      return this._api.updatePoint({id, data})
        .then((point) => {
          this._store.setPoints({key: point.id, item: point.toRAW()});
          return point;
        });
    } else {
      const point = data;
      this._needSync = true;
      this._store.setPoints({key: point.id, item: point});
      return Promise.resolve(ModelPoint.parsePoint(point));
    }
  }

  createTask({point}) {
    if (this._isOnline()) {
      return this._api.createTask({point})
        .then((newPoint) => {
          this._store.setItem({key: newPoint.id, item: newPoint.toRAW()});
          return newPoint;
        });
    } else {
      point.id = this._generateId();
      this._needSync = true;

      this._store.setItem({key: point.id, item: point});
      return Promise.resolve(ModelPoint.parsePoint(point));
    }
  }

  deletePoint({id}) {
    if (this._isOnline()) {
      return this._api.deletePoint({id})
        .then(() => {
          this._store.removeItem({key: id});
        });
    } else {
      this._needSync = true;
      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  syncPoints() {
    return this._api.syncPoints(objectToArray(this._store.getAll().points));
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}

