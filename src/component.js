import {createElement} from '../src/utils';

export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._icons = {
      'taxi': `🚕`,
      'bus': `🚌`,
      'drive': `🚗`,
      'train': `🚂`,
      'flight': `✈️`,
      'check-in': `🏨`,
      'sight-seeing': `🏛`
    };

    this._element = null;
    this._display = true;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get cardTemplate() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = createElement(this.cardTemplate);
    this.bind();
    return this._element;
  }

  bind() {}

  unbind() {}

  unRender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}
