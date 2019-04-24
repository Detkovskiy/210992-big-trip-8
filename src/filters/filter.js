import {createElement} from "../utils/utils";
import moment from 'moment';

export default class Filter {
  constructor() {
    this._element = null;
    this._onSort = null;
    this._onChange = this._onChange.bind(this);
  }

  set onSort(fn) {
    this._onSort = fn;
  }

  bind() {
    this._element.addEventListener(`change`, this._onChange);
  }

  render() {
    this._element = createElement(Filter.template());
    this.bind();
    return this._element;
  }

  _onChange(evt) {
    if (typeof this._onSort === `function`) {
      this._onSort(evt);
    }
  }

  static template() {
    return `<form class="trip-filter">
        <input type="radio" id="filter-everything" name="filter" value="everything" checked>
        <label class="trip-filter__item" for="filter-everything">everything</label>
        <input type="radio" id="filter-future" name="filter" value="future">
        <label class="trip-filter__item" for="filter-future">future</label>
        <input type="radio" id="filter-past" name="filter" value="past">
        <label class="trip-filter__item" for="filter-past">past</label>
      </form>`;
  }

  static points(data, filterName) {
    let sortData = [];
    switch (filterName) {

      case `filter-everything`:
        sortData = data;
        break;

      case `filter-future`:
        sortData = data.filter((it) => it > moment().format(`D MMM`));
        break;

      case `filter-past`:
        sortData = data.filter((it) => it < moment().format(`D MMM`));
    }

    return sortData;
  }

}
