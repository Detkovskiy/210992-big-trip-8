const sectionTripPoints = document.querySelector(`.trip-points`);

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const allPointsPrice = (dataPointsPrice) => {
  let pointsPrice = dataPointsPrice.reduce((accumulator, currentValue) => accumulator + +currentValue.price, 0);

  dataPointsPrice.map((it) => {
    if (it.offers.find((offer) => offer.accepted)) {
      pointsPrice += it.offers.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    }
  });

  return pointsPrice;
};

const getTripDayTemplate = (day, count) => {
  return `<section class="trip-day">
      <article class="trip-day__info">
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">${count + 1}</p>
        <h2 class="trip-day__title">${day}</h2>
      </article>

      <div class="trip-day__items">
      </div>
    </section>`;
};

export {getTripDayTemplate, createElement, sectionTripPoints, allPointsPrice};
