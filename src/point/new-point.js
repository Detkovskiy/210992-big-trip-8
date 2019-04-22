import {getDefaultDataNewPoint, message} from '../data';
import {EditTrip} from "../pointEdit";
import {sectionTripPoints} from "../utils";
import {api} from "../data";
import {model} from "../model";


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

    api.create(dataSavePoint)
      .then((newTask) => {
        newPoint.update(newTask);
        newPoint.unblock();
        newPoint.unRender();
        model.init();

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

const newPointInit = () => {
  newEventPoint.addEventListener(`click`, () => {
    sectionTripPoints.prepend(getNewPointForm(model.allData).render());
  });
};

export {newPointInit};