export class Trip {
  constructor(data) {
    this._events = data.events;
    this._element = document.createElement(`div`);
    this._onEdit = null;
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
    this._element.querySelector(`.trip-point`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render() {
    for (let i = 0; i < this._events.length; i++) {
      this._icon = this._events[i].icon;
      this._type = this._events[i].type;
      this._timeStart = this._events[i].time[0];
      this._timeEnd = this._events[i].time[1];
      this._price = this._events[i].price;
      this._offers = this._events[i].offers;

      this._element.innerHTML += this.cardTemplate;
      this.bind();
    }
    return this._element;
  }

  get element() {
    return this._element;
  }
  unRender() {
    this._element = null;
  }
}
