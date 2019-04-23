import {objectToArray, sectionTripPoints} from "../utils/utils";

export default class Store {
  constructor({key, storage}) {
    this._storage = storage;
    this._storeKey = key;
  }

  setPoints({key, item}) {
    const items = this.getPoints();
    items[key] = item;
    this._storage.setItem(this._storeKey.points, JSON.stringify(items));
  }

  setOffers(data) {
    this._storage.setItem(this._storeKey.offers, JSON.stringify(data));
  }

  setDestinations(data) {
    this._storage.setItem(this._storeKey.destinations, JSON.stringify(data));
  }

  removeItem({key}) {
    const items = this.getPoints();
    this._storage.setItem(this._storeKey.points, JSON.stringify(items.slice(key)));
  }

  getPoints() {
    const emptyData = [];
    const items = this._storage.getItem(this._storeKey.points);

    if (!items) {
      return emptyData;
    }

    return JSON.parse(items);
  }

  getAll() {
    const emptyData = {};
    const data = [];

    data[`points`] = objectToArray(JSON.parse(this._storage.getItem(this._storeKey.points)));
    data[`offers`] = JSON.parse(this._storage.getItem(this._storeKey.offers));
    data[`destinations`] = JSON.parse(this._storage.getItem(this._storeKey.destinations));

    if (!data) {
      return emptyData;
    }

    try {
      return data;
    } catch (e) {
      sectionTripPoints.innerHTML = `Error parse items. Error: ${e}.`;
      return emptyData;
    }
  }
}
