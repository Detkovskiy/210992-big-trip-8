import {createElement} from "./utils";

export class ComponentFilters {
  constructor() {
    if (new.target === ComponentFilters) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;

  }

  get element() {
    return this._element;
  }

  get filterTemplate() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = createElement(this.filterTemplate);
    this.bind();
    return this._element;
  }

  bind() {}
}
