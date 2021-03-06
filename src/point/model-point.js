export default class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.timeStart = data[`date_from`];
    this.timeEnd = data[`date_to`];
    this.offers = data[`offers`] || [];
    this.price = data[`base_price`];
    this.destination = data[`destination`];
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'base_price': this.price,
      'type': this.type,
      'date_from': +this.timeStart,
      'date_to': +this.timeEnd,
      'destination': this.destination,
      'offers': this.offers
    };
  }

  toID() {
    return {
      'is_favorite': this.isFavorite,
    };
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}
