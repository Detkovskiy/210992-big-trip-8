export class ModelPoint {
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
      'type': this.type.title,
      'date_from': this.timeStart,
      'date_to': this.timeEnd,
      'destination': this.destination,
      'base_price': this.price,
      'is_favorite': this.isFavorite,
      'offers': this.offers
    };
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}
