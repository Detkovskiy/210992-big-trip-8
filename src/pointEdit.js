import {Component} from '../src/component';
import moment from 'moment';
import flatpickr from "flatpickr";

export class EditTrip extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._timeStart = data.date_from;
    this._timeEnd = data.date_to;
    this._price = data.base_price;
    this._offers = data.offers;
    this._description = data.destination;
    this._descriptionName = null;
    this._onEdit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onDestinationChange = this._onDestinationChange.bind(this);
  }

  get cardTemplate() {
    return `<article class="point">
              <form action="" method="get" class="editPoint">
                <header class="point__header">
                  <label class="point__date">
                    choose day
                    <input class="point__input" type="text" placeholder="MAR 18" name="day">
                  </label>
            
                  <div class="travel-way">
                    <label class="travel-way__label" for="travel-way__toggle">${this._icons[this._type]}️</label>
            
                    <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
            
                    <div class="travel-way__select">
                      <div class="travel-way__select-group">
                        ${Object.entries(this._icons).map(([typePoint, icon]) => ` 
                        
                          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${typePoint}" name="travel-way" value="${typePoint}" ${typePoint === this._type ? `checked` : ``}>
                           <label class="travel-way__select-label" for="travel-way-${typePoint}">${icon} ${typePoint}</label>
                        
                         `).join(``)}
                        
                      </div>
                     
                    </div>
                  </div>
            
                  <div class="point__destination-wrap">
                    <label class="point__destination-label" for="destination">${this._type} to</label>
                    <input class="point__destination-input" list="destination-select" id="destination" value="${this._description.name}" name="destination">
                    <datalist id="destination-select">
                    ${this._descriptionName.map((it) => ` 
                      <option value="${it.name}"></option>`).join(``)}                 
                    </datalist>
                  </div>
            
                  <label class="point__time">
                    choose time
                    <input class="point__input date-start" type="text" value="${moment(this._timeStart, `x`).format(`HH:mm`)}" name="date-start" placeholder="19:00">
                    <input class="point__input date-end" type="text" value="${moment(this._timeEnd, `x`).format(`HH:mm`)}" name="date-end" placeholder="21:00">
                  </label>
            
                  <label class="point__price">
                    write price
                    <span class="point__price-currency">€</span>
                    <input class="point__input" type="text" value="${this._price}" name="price">
                  </label>
            
                  <div class="point__buttons">
                    <button class="point__button point__button--save" type="submit">Save</button>
                    <button class="point__button point__button--delete" type="reset">Delete</button>
                  </div>
            
                  <div class="paint__favorite-wrap">
                    <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
                    <label class="point__favorite" for="favorite">favorite</label>
                  </div>
                </header>
            
                <section class="point__details">
                  <section class="point__offers">
                    <h3 class="point__details-title">offers</h3>
                      
                      <div class="point__offers-wrap">
                        ${this._offers.map((it) => ` 
                          <input class="point__offers-input visually-hidden" type="checkbox" id="${it.title}" name="offer" value="${it.title}" ${it.accepted ? `checked` : ``}>
                          <label for="${it.title}" class="point__offers-label">
                            <span class="point__offer-service">${it.title}</span> + €<span class="point__offer-price">${it.price}</span>
                          </label>`).join(``)}
                      </div>
                      
                  </section>
                  <section class="point__destination">
                    ${this._getDestinationTemplate()}
                  </section>
                  <input type="hidden" class="point__total-price" name="total-price" value="">
                </section>
              </form>
            </article>`;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  set onChangeDestination(fn) {
    if (typeof fn === `function`) {
      this._onDestination = fn;
    }
  }

  set description(data) {
    if (data) {
      this._description = data;
    }
  }

  set descriptionNames(data) {
    if (data) {
      this._descriptionName = data;
    }
  }

  update(data) {
    this._price = data.price;
    this._offers = data.offers;
    this._type = data.type;
    this._timeStart = data.time[0];
    this._timeEnd = data.time[1];
  }

  static createMapper(target) {
    return {
      'price': (value) => {
        target.price = value;
      },
      'offer': (value) => {
        target.offers[value] = true;
      },
      'travel-way': (value) => {
        target.type = value;
      },
      'date-start': (value) => {
        target.time.push(moment(value, `HH:mm`).format(`x`));
      },
      'date-end': (value) => {
        target.time.push(moment(value, `HH:mm`).format(`x`));
      }
    };
  }

  static processForm(formData) {
    const entry = {
      price: null,
      time: [],
      offers: {
        'add-luggage': false,
        'switch-to-comfort-class': false,
        'add-meal': false,
        'choose-seats': false
      }
    };

    const taskEditMapper = EditTrip.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.editPoint`));
    const newData = EditTrip.processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  _onDestinationChange(evt) {
    this._onDestination(evt);
    this._element.querySelector(`.point__destination`).innerHTML = this._getDestinationTemplate();
  }

  _getDestinationTemplate() {
    return `
      <div>
        <h3 class="point__details-title">${this._description.name}</h3>
        <p class="point__destination-text">${this._description.description}</p>
        <div class="point__destination-images">
        ${this._description.pictures.map((it) => ` 
          <img src="${it.src}" alt="${it.description}" class="point__destination-image">`).join(``)}
      </div>`;
  }

  bind() {
    this._element.querySelector(`.point__button--save`).addEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__button--delete`).addEventListener(`click`, this._onDeleteButtonClick);
    this.element.querySelector(`.point__destination-input`).addEventListener(`change`, this._onDestinationChange);

    flatpickr(this._element.querySelector(`.date-start`), {
      enableTime: true,
      noCalendar: true,
      dateFormat: `H:i`,
      time_24hr: true
    });

    flatpickr(this._element.querySelector(`.date-end`), {
      enableTime: true,
      noCalendar: true,
      dateFormat: `H:i`,
      time_24hr: true
    });
  }

  unbind() {
    this._element.querySelector(`.point__button--save`).removeEventListener(`click`, this._onSubmitButtonClick);
  }
}
