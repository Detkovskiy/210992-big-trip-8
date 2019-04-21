import {pointsPriceInit, sectionTripPoints} from "./utils";
import {api, message} from "./data";
import {ModelPoint} from './model-point';
import {pa} from './main';
import moment from "moment";
import {renderPointTrip} from "./point/render-points";

class Model {
  constructor({ApiLoad, render}) {
    this._api = ApiLoad;
    this._render = render;
    this._state = {
      data: {
        points: [],
        offers: [],
        destinations: []
      },
      loading: true
    };
  }

  adaptData(data) {
    const tripsForDays = {};
    data.sort((a, b) => a.timeStart - b.timeStart);

    data.forEach((it) => {
      const day = moment(it.timeStart, `x`).format(`D MMM`);

      if (!tripsForDays[day]) {
        tripsForDays[day] = [];
      }

      tripsForDays[day].push(it);
    });

    return tripsForDays;
  }

  init() {
    this._api.loadAllData()
      .then(([points, offers, destinations]) => {
        this._state.data.noAdapt = ModelPoint.parsePoints(points);
        this._state.data.points = this.adaptData(ModelPoint.parsePoints(points));
        this._state.data.offers = offers;
        this._state.data.destinations = destinations;
        this._state.loading = false;

        this.update();
      })
      .catch(() => {
        sectionTripPoints.innerHTML = message.loadFail;
      });
  }

  // пока так, массив без адаптации, надо переписывать код в статистике
  get dataStat() {
    return this._state.data.noAdapt;
  }

  get allData() {
    return this._state.data;
  }

  get points() {
    return this._state.data.points;
  }

  get offers() {
    return this._state.data.offers;
  }

  get destinations() {
    return this._state.data.destinations;
  }

  update() {
    const {loading} = this._state;

    if (loading) {
      sectionTripPoints.innerHTML = message.loadData;
    } else {
      sectionTripPoints.appendChild(this._render(this._state.data));
      pointsPriceInit();
    }
  }
}

const model = new Model({ApiLoad: api, render: renderPointTrip});

export {model};
