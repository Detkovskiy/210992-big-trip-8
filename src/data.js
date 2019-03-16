import {getRandomFromInterval, getRandomDescription} from '../src/utils.js';

const textDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const getTrips = () => ({
  city: [
    `Amsterdam`,
    `Geneva`,
    `Chamonix`,
  ],
  events: [
    {
      'type': `taxi`,
      'icon': `🚕`,
      'price': getRandomFromInterval(5, 100),
      'time': [getRandomFromInterval(0, 10), getRandomFromInterval(10, 24)],
      'offers': {
        'add luggage': getRandomFromInterval(0, 2),
        'switch to comfort class': getRandomFromInterval(0, 2),
        'add meal': getRandomFromInterval(0, 2),
        'choose seats': getRandomFromInterval(0, 2)
      },
      'description': getRandomDescription(getRandomFromInterval(1, 4), textDescription),
      'picture': `//picsum.photos/100/100?r=${Math.random()}`},
    {
      'type': `flight`,
      'icon': `✈️`,
      'price': getRandomFromInterval(5, 300),
      'time': [getRandomFromInterval(0, 10), getRandomFromInterval(10, 24)],
      'offers': {
        'add luggage': getRandomFromInterval(0, 2),
        'switch to comfort class': getRandomFromInterval(0, 2),
        'add meal': getRandomFromInterval(0, 2),
        'choose seats': getRandomFromInterval(0, 2)
      },
      'description': getRandomDescription(getRandomFromInterval(1, 4), textDescription),
      'picture': `//picsum.photos/100/100?r=${Math.random()}`},
    {
      'type': `drive`,
      'icon': `🚗`,
      'price': getRandomFromInterval(10, 150),
      'time': [getRandomFromInterval(0, 10), getRandomFromInterval(10, 24)],
      'offers': {
        'add luggage': getRandomFromInterval(0, 2),
        'switch to comfort class': getRandomFromInterval(0, 2),
        'add meal': getRandomFromInterval(0, 2),
        'choose seats': getRandomFromInterval(0, 2)
      },
      'description': getRandomDescription(getRandomFromInterval(1, 4), textDescription),
      'picture': `//picsum.photos/100/100?r=${Math.random()}`},
    {
      'type': `check-in`,
      'icon': `🏨`,
      'price': getRandomFromInterval(200, 400),
      'time': [getRandomFromInterval(0, 10), getRandomFromInterval(10, 24)],
      'offers': {
        'add luggage': getRandomFromInterval(0, 2),
        'switch to comfort class': getRandomFromInterval(0, 2),
        'add meal': getRandomFromInterval(0, 2),
        'choose seats': getRandomFromInterval(0, 2)
      },
      'description': getRandomDescription(getRandomFromInterval(1, 4), textDescription),
      'picture': `//picsum.photos/100/100?r=${Math.random()}`}],
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  isFavorite: false
});

