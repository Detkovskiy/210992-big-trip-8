import PointTrip from "./make-point";
import EditTrip from "./point-edit";
import Provider from "../offline/provider";
import {message, DATA_STORE_KEY} from "../utils/data";
import {api} from "../utils/data";
import {createElement, getTripDayTemplate, sectionTripPoints, pointsPriceInit} from "../utils/utils";
import Store from "../offline/store";
import {model} from '../utils/model';

const store = new Store({key: DATA_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store});


const renderPoints = (data, container) => {
  const fragmentPointsDay = document.createDocumentFragment();

  data.pointsOneDay.map((it) => {

    const pointTrip = new PointTrip(it);
    const editPointTrip = new EditTrip({it, data});

    pointTrip.onEdit = () => {
      editPointTrip.render();
      container.querySelector(`.trip-day__items`).replaceChild(editPointTrip.element, pointTrip.element);
      pointTrip.unRender();
    };

    editPointTrip.onSubmit = (newObject) => {
      editPointTrip.block();
      editPointTrip.changeColorBorder(false);
      editPointTrip.onTextButtonChange(message.saving, `save`);
      it.offers = newObject.offers;
      it.price = newObject.price;
      it.type = newObject.type;
      it.time = newObject.time;
      it.timeStart = newObject.timeStart;
      it.timeEnd = newObject.timeEnd;
      it.destination = newObject.destination;

      provider.updatePoint({id: it.id, data: it.toRAW()})
        .then((newTask) => {
          pointTrip.update(newTask);
          pointTrip.render();
          container.querySelector(`.trip-day__items`).replaceChild(pointTrip.element, editPointTrip.element);
          editPointTrip.unblock();
          editPointTrip.unRender();
          pointsPriceInit();
        })
        .catch(() => {
          editPointTrip.unblock();
          editPointTrip.onTextButtonChange(message.save, `save`);
          editPointTrip.changeColorBorder();
          editPointTrip.shake();
        });
    };

    editPointTrip.onCancel = () => {
      pointTrip.render();
      container.querySelector(`.trip-day__items`).replaceChild(pointTrip.element, editPointTrip.element);
      editPointTrip.unRender();
    };

    editPointTrip.onFavorite = () => {
      it.isFavorite = !it.isFavorite;
      editPointTrip.updateIsFavorite(it.isFavorite);
      provider.updatePoint({id: it.id, data: it.toID()})
        .catch(() => {
          editPointTrip.changeColorBorder();
          editPointTrip.shake();
        });
    };

    editPointTrip.onDelete = ({id}) => {
      editPointTrip.block();
      editPointTrip.changeColorBorder(false);
      editPointTrip.onTextButtonChange(message.deleting, `delete`);

      provider.deletePoint({id})
        .then(() => {
          model.init();
        })
        .catch(() => {
          editPointTrip.unblock();
          editPointTrip.onTextButtonChange(message.delete, `delete`);
          editPointTrip.changeColorBorder();
          editPointTrip.shake();
        });
    };

    editPointTrip.onChangeDestination = (evt) => {
      editPointTrip.description = data.destinations.find((item) => item.name === evt.target.value);
    };

    editPointTrip.onChangeTravelType = (evt) => {
      editPointTrip.type = evt.target.value;
    };

    fragmentPointsDay.appendChild(pointTrip.render());
  });

  return fragmentPointsDay;
};

const renderPointTrip = ({points, offers, destinations}) => {
  sectionTripPoints.innerHTML = ``;
  const fragment = document.createDocumentFragment();

  Object.keys(points).forEach((day, count) => {
    const pointsOneDay = points[day];
    const containerTripDay = createElement(getTripDayTemplate(day, count));

    containerTripDay.querySelector(`.trip-day__items`).appendChild(renderPoints({pointsOneDay, offers, destinations}, containerTripDay));
    fragment.appendChild(containerTripDay);
  });

  return fragment;
};


export {renderPointTrip, provider};
