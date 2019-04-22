import {createElement} from "../utils/utils";
import moment from 'moment';

export default class Filter {
  constructor() {
    this._element = null;
    this._onChange = null;
    this._onChangeFilter = this._onChangeFilter.bind(this);
  }

  get filterTemplate() {
    return `<form class="trip-filter">
        <input type="radio" id="filter-everything" name="filter" value="everything" checked>
        <label class="trip-filter__item" for="filter-everything">everything</label>
        <input type="radio" id="filter-future" name="filter" value="future">
        <label class="trip-filter__item" for="filter-future">future</label>
        <input type="radio" id="filter-past" name="filter" value="past">
        <label class="trip-filter__item" for="filter-past">past</label>
      </form>`;
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  filterPoint(data, filterName) {
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

  _onChangeFilter(evt) {
    if (typeof this._onChange === `function`) {
      this._onChange(evt);
    }
  }

  bind() {
    this._element.addEventListener(`change`, this._onChangeFilter);
  }

  render() {
    this._element = createElement(this.filterTemplate);
    this.bind();
    return this._element;
  }

}
