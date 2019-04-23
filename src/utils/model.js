import {pointsPriceInit, sectionTripPoints} from "./utils";
import {message} from "./data";
import ModelPoint from '../point/model-point';
import {provider} from '../point/render-points';
import moment from "moment";
import {renderPointTrip} from "../point/render-points";


class Model {
  constructor({providerInit, render}) {
    this._provider = providerInit;
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

  get lastId() {
    return this._state.lastId;
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
    this._provider.loadAllData()
      .then(([points, offers, destinations]) => {
        this._state.data.points = this.adaptData(ModelPoint.parsePoints(points));
        this._state.data.offers = offers;
        this._state.data.destinations = destinations;
        this._state.loading = false;
        this._state.lastId = points.length;

        this.update();
      })
      .catch(() => {
        sectionTripPoints.innerHTML = message.loadFail;
      });
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

const model = new Model({providerInit: provider, render: renderPointTrip});

export {model};
