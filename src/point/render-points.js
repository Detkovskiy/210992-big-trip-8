import {PointTrip} from "../make-point";
import {EditTrip} from "../pointEdit";
import {message} from "../data";
import {api} from "../data";
import {model} from '../model';
import {createElement, getTripDayTemplate, sectionTripPoints, pointsPriceInit} from "../utils";

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

      api.updateTask({id: it.id, data: it.toRAW()})
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

    editPointTrip.onDelete = ({id}) => {
      editPointTrip.block();
      editPointTrip.changeColorBorder(false);
      editPointTrip.onTextButtonChange(message.deleting, `delete`);

      api.deleteTask({id})
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


export {renderPointTrip};
