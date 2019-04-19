import {sectionTripPoints} from "./utils";
import {message} from "./data";
import {ModelPoint} from './model-point';
import moment from "moment";

export class Model {
  constructor({api, render}) {
    this._api = api;
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

    data.forEach((it) => {
      const day = moment(it.timeStart).format(`D MMM`);

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

  get allData() {
    return this._state.data;
  }

  update() {
    const {loading} = this._state;

    if (loading) {
      sectionTripPoints.innerHTML = message.loadData;
    } else {
      sectionTripPoints.appendChild(this._render(this._state.data));
    }
  }
}

