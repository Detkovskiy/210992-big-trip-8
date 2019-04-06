import {Component} from '../src/component';
import moment from 'moment';

export class PointTrip extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._type = data.type;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._offers = data.offers;
    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  get cardTemplate() {
    return `<article class="trip-point">
              <i class="trip-icon"> ${this._icons[this._type]}️</i>
              <h3 class="trip-point__title">${this._type}</h3>
              <p class="trip-point__schedule">
                <span class="trip-point__timetable">${moment(this._timeStart, `x`).format(`HH:mm`)} — ${moment(this._timeEnd, `x`).format(`HH:mm`)}</span>
                <span class="trip-point__duration">${moment(this._timeEnd, `x`).subtract(+moment(this._timeStart, `x`).format(`HH`), `hours`).subtract(+moment(this._timeStart, `x`).format(`mm`), `minutes`).format(`H[H] m[M]`)}</span>
              </p>
              <p class="trip-point__price">€ ${this._price}</p>
              <ul class="trip-point__offers">
              
              ${this._offers.map((it) => `${it.accepted ? `
                <li>
                  <button class="trip-point__offer">${it.title}</button>
                </li>` : ``}`).join(``)}
              </ul>
            </article>`;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _onEditButtonClick() {

    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._price = data.price;
    this._offers = data.offers;
    this._type = data.type;
    this._timeStart = data.time[0];
    this._timeEnd = data.time[1];
  }
}
