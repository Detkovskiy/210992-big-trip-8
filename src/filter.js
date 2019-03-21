import {ComponentFilters} from '../src/componentFilters';

export class Filter extends ComponentFilters {
  constructor() {
    super();
    this._onchange = null;
    this._onchangeFilter = this._onchangeFilter.bind(this);
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

  set onchange(fn) {
    this._onchange = fn;
  }


  _onchangeFilter(evt) {
    if (typeof this._onchange === `function`) {
      this._onchange(evt);
    }
  }

  bind() {
    this._element.addEventListener(`change`, this._onchangeFilter);
  }

}
