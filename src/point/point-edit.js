import Component from './component';
import moment from 'moment';
import flatpickr from "flatpickr";

export default class EditTrip extends Component {
  constructor(data) {
    super();
    this._id = data.it.id;
    this._isFavorite = data.it.isFavorite;
    this._type = data.it.type;
    this._timeStart = data.it.timeStart;
    this._timeEnd = data.it.timeEnd;
    this._price = data.it.price;
    this._offers = data.it.offers;
    this._destination = data.it.destination;
    this._allDescriptions = data.data.destinations;
    this._allOffers = data.data.offers;
    this._onEscKeydown = this._onEscKeydown.bind(this);
    this._onFavoriteButtonClick = this._onFavoriteButtonClick.bind(this);
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onDestinationChange = this._onDestinationChange.bind(this);
    this._onSelectTypeTravel = this._onSelectTypeTravel.bind(this);
  }

  get cardTemplate() {
    return `<article class="point">
              <form action="" method="get" class="editPoint">
                <header class="point__header">
                  <label class="point__date">
                    choose day
                    <input class="point__input" type="text" placeholder="${moment(this._timeStart, `x`).format(`MMM D`)}" name="day">
                  </label>
            
                  <div class="travel-way">
                    <label class="travel-way__label" for="travel-way__toggle-${this._id}">${this._icons[this._type]}️</label>
            
                    <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle-${this._id}">
            
                    <div class="travel-way__select">
                      <div class="travel-way__select-group">
                        ${Object.entries(this._icons).map(([typePoint, icon]) => ` 
                        
                          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${typePoint}-${this._id}" name="travel-way" value="${typePoint}" ${typePoint === this._type ? `checked` : ``}>
                           <label class="travel-way__select-label" for="travel-way-${typePoint}-${this._id}">${icon} ${typePoint}</label>
                        
                         `).join(``)}
                        
                      </div>
                     
                    </div>
                  </div>
            
                  <div class="point__destination-wrap">
                    <label class="point__destination-label" for="destination">${this._type} to</label>
                    <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination.name}" name="destination" required>
                    <datalist id="destination-select">
                      ${this._allDescriptions.map((it) => ` 
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
                    <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite && `checked`}>
                    <label class="point__favorite" for="favorite">favorite</label>
                  </div>
                </header>
            
                <section class="point__details">
                  <section class="point__offers">
                    <h3 class="point__details-title">offers</h3>
                      
                      <div class="point__offers-wrap">
                        ${this._getOffersTemplate()}
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

  get id() {
    return this._id;
  }

  set onSubmit(fn) {
    if (typeof fn === `function`) {
      this._onSubmit = fn;
    }
  }

  set onFavorite(fn) {
    if (typeof fn === `function`) {
      this._onFavorite = fn;
    }
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
      this._destination = data;
    }
  }

  set onCancel(fn) {
    this._onCancel = fn;
  }

  set type(data) {
    if (data) {
      this._type = data;
    }
  }

  set onChangeTravelType(fn) {
    if (typeof fn === `function`) {
      this._onTravelType = fn;
    }
  }

  processForm(formData) {
    const entry = {
      id: this._id,
      type: ``,
      price: null,
      offers: [],
      allOffers: this._allOffers,
      destination: this._allDescriptions,
      timeStart: this._timeStart,
      timeEnd: this._timeEnd,
      day: null
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

  block() {
    if (this.element.classList.contains(`shake`)) {
      this.element.classList.remove(`shake`);
    }
    const formInputs = Array.from(this._element.querySelector(`form`).querySelectorAll(`input`));
    const formButtons = Array.from(this._element.querySelector(`form`).querySelectorAll(`button`));

    formButtons.concat(formInputs).forEach((item) => {
      item.setAttribute(`disabled`, `disabled`);
    });
  }

  unblock() {
    const formInputs = Array.from(this._element.querySelector(`form`).querySelectorAll(`input`));
    const formButtons = Array.from(this._element.querySelector(`form`).querySelectorAll(`button`));

    formButtons.concat(formInputs).forEach((item) => {
      item.removeAttribute(`disabled`);
    });
  }

  onTextButtonChange(text, evtButton) {
    this._element.querySelector(`.point__button--${evtButton}`).innerText = text;
  }

  changeColorBorder(change = true) {
    if (change) {
      this.element.classList.add(`error`);
    } else {
      this.element.classList.remove(`error`);
    }
  }

  shake() {
    this.element.classList.add(`shake`);
  }

  update(data) {
    this._price = data.price;
    this._offers = data.offers;
    this._type = data.type;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
  }

  updateIsFavorite(data) {
    this._isFavorite = data;
  }

  bind() {
    document.addEventListener(`keydown`, this._onEscKeydown);
    this._element.querySelector(`.point__favorite`).addEventListener(`click`, this._onFavoriteButtonClick);
    this._element.querySelector(`form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__button--delete`).addEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.point__destination-input`).addEventListener(`change`, this._onDestinationChange);
    this.element.querySelector(`.travel-way__select`).addEventListener(`change`, this._onSelectTypeTravel);

    flatpickr(this._element.querySelector(`.date-start`), {
      enableTime: true,
      noCalendar: true,
      dateFormat: `H:i`,
      defaultDate: +this._timeStart,
      [`time_24hr`]: true
    });

    flatpickr(this._element.querySelector(`.date-end`), {
      enableTime: true,
      noCalendar: true,
      dateFormat: `H:i`,
      defaultDate: +this._timeEnd,
      [`time_24hr`]: true
    });

    flatpickr(this._element.querySelector(`input[name="day"]`), {
      dateFormat: `M j`,
    });
  }

  unbind() {
    document.removeEventListener(`keydown`, this._onEscKeydown);
    this._element.querySelector(`.point__favorite`).removeEventListener(`click`, this._onFavoriteButtonClick);
    this._element.querySelector(`form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.point__button--delete`).removeEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.point__destination-input`).removeEventListener(`change`, this._onDestinationChange);
    this.element.querySelector(`.travel-way__select`).removeEventListener(`change`, this._onSelectTypeTravel);
    flatpickr(this._element.querySelector(`.date-start`)).destroy();
    flatpickr(this._element.querySelector(`.date-end`)).destroy();
    flatpickr(this._element.querySelector(`input[name="day"]`)).destroy();
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.editPoint`));

    const newData = this.processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete({id: this._id});
    }
  }

  _onDestinationChange(evt) {
    this._onDestination(evt);
    this._element.querySelector(`.point__destination`).innerHTML = this._getDestinationTemplate();
  }

  _getDestinationTemplate() {
    return `
      <div>
        <h3 class="point__details-title">${this._destination.name}</h3>
        <p class="point__destination-text">${this._destination.description}</p>
        <div class="point__destination-images">
        ${this._destination.pictures.map((it) => ` 
          <img src="${it.src}" alt="${it.description}" class="point__destination-image">`).join(``)}
      </div>`;
  }

  _getOffersTemplate() {
    if (this._type !== `drive`) {
      return `
      ${this._allOffers.find((item) => item.type === this._type).offers.map((it) => ` 
        <input class="point__offers-input visually-hidden" type="checkbox" id="${it.name}-${this._id}" name="offer" value="${it.name}" ${this._offers.find((offer) => offer.title === it.name && offer.accepted) ? `checked` : ``}>
        <label for="${it.name}-${this._id}" class="point__offers-label">
          <span class="point__offer-service">${it.name}</span> + €<span class="point__offer-price">${it.price}</span>
        </label>`).join(``)}`;
    } else {
      return ``;
    }
  }

  _onSelectTypeTravel(evt) {
    this._onTravelType(evt);
    this._element.querySelector(`.travel-way__label`).innerText = this._icons[this._type];
    this._element.querySelector(`.point__destination-label`).innerText = `${this._type} to`;
    this._element.querySelector(`.point__offers-wrap`).innerHTML = this._getOffersTemplate();
    this.element.querySelector(`.travel-way__toggle`).checked = false;
  }

  _onEscKeydown(evt) {
    if (evt.keyCode === 27) {
      this._onCancel();
    }
  }

  _onFavoriteButtonClick() {
    this._onFavorite();
  }

  static createMapper(target) {
    return {
      'travel-way': (value) => {
        target.type = value;
      },
      'price': (value) => {
        target.price = +value;

      },
      'offer': (value) => {
        const offers = target.allOffers.find((item) => item.type === target.type).offers;
        const offerPrice = offers.find((item) => item.name === value).price;
        target.offers.push({title: value, accepted: true, price: offerPrice});
      },
      'destination': (value) => {
        target.destination = target.destination.find((item) => item.name === value);
      },
      'day': (value) => {
        target.day = value;
      },
      'date-start': (value) => {
        if (target.day) {
          target.timeStart = moment(`${target.day} ${value}`, `MMM D hh:mm`).format(`x`);
        } else {
          target.timeStart = moment(value, `HH:mm`).format(`x`);
        }
      },
      'date-end': (value) => {
        if (target.day) {
          target.timeEnd = moment(`${target.day} ${value}`, `MMM D hh:mm`).format(`x`);
        } else {
          target.timeEnd = moment(value, `HH:mm`).format(`x`);
        }
      }
    };
  }
}
