import {getDefaultDataNewPoint, message} from '../utils/data';
import EditTrip from "./point-edit";
import {sectionTripPoints} from "../utils/utils";
import {model} from "../utils/model";
import {provider} from '../point/render-points';

const newEventPoint = document.querySelector(`.new-event`);

const getNewPointForm = (data) => {
  const it = getDefaultDataNewPoint(model.lastId);
  const newPoint = new EditTrip({it, data});

  newPoint.onChangeDestination = (evt) => {
    newPoint.description = data.destinations.find((item) => item.name === evt.target.value);
  };

  newPoint.onChangeTravelType = (evt) => {
    newPoint.type = evt.target.value;
  };

  newPoint.onCancel = () => {
    newPoint.unRender();
    newEventPoint.removeAttribute(`disabled`);
  };

  newPoint.onFavorite = () => {
    it.isFavorite = !it.isFavorite;
  };

  newPoint.onDelete = () => {
    newPoint.unRender();
    newEventPoint.removeAttribute(`disabled`);
  };

  newPoint.onSubmit = (newObject) => {
    newPoint.block();
    newPoint.changeColorBorder(false);
    newPoint.onTextButtonChange(message.saving, `save`);

    const dataSavePoint = {
      'id': it.id,
      'base_price': newObject.price,
      'type': newObject.type,
      'date_from': +newObject.timeStart,
      'date_to': +newObject.timeEnd,
      'destination': newObject.destination,
      'is_favorite': it.isFavorite,
      'offers': newObject.offers
    };

    provider.createPoint(dataSavePoint)
      .then((newTask) => {
        newPoint.update(newTask);
        newPoint.unblock();
        newPoint.unRender();
        model.init();
        newEventPoint.removeAttribute(`disabled`);
      })
      .catch(() => {
        newPoint.unblock();
        newPoint.onTextButtonChange(message.save, `save`);
        newPoint.changeColorBorder();
        newPoint.shake();
      });
  };

  return newPoint;
};

const newPointOnInit = () => {
  newEventPoint.addEventListener(`click`, () => {
    sectionTripPoints.prepend(getNewPointForm(model.allData).render());
    newEventPoint.setAttribute(`disabled`, `disabled`);
  });
};

export {newPointOnInit};
