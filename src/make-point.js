import {Component} from '../src/component';

export class PointTrip extends Component {
  constructor(data) {
    super();
    this._icon = data.icon;
    this._type = data.type;
    this._timeStart = data.time[0];
    this._timeEnd = data.time[1];
    this._price = data.price;
    this._offers = data.offers;
    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  get cardTemplate() {
    return `<article class="trip-point">
              <i class="trip-icon">${this._icon}</i>
              <h3 class="trip-point__title">${this._type}</h3>
              <p class="trip-point__schedule">
                <span class="trip-point__timetable">${this._timeStart}:00 — ${this._timeEnd}:00</span>
                <span class="trip-point__duration">1h 30m</span>
              </p>
              <p class="trip-point__price">€ ${this._price}</p>
              <ul class="trip-point__offers">
              ${[...this._offers].map((it) => `
                <li>
                  <button class="trip-point__offer">${it}</button>
                </li>`).join(``)}
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

}
