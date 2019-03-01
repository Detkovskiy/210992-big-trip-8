import {getRandomFromInterval} from '../src/utils.js';

export const trips = () => ({
  city: [
    `Amsterdam`,
    `Geneva`,
    `Chamonix`,
  ],
  events: [
    {
      'type': `Taxi`,
      'icon': `🚕`,
      'price': getRandomFromInterval(5, 100),
      'time': [getRandomFromInterval(0, 10), getRandomFromInterval(10, 24)],
      'offers': [`1_Order UBER +€ 20`, `1_Upgrade to business +€ 20`]},
    {
      'type': `Flight`,
      'icon': `✈️`,
      'price': getRandomFromInterval(5, 300),
      'time': [getRandomFromInterval(0, 10), getRandomFromInterval(10, 24)],
      'offers': [`2_Order UBER +€ 20`, `2_Upgrade to business +€ 20`, `2_Upgrade to  +€ 220`]},
    {
      'type': `Drive`,
      'icon': `🚗`,
      'price': getRandomFromInterval(10, 150),
      'time': [getRandomFromInterval(0, 10), getRandomFromInterval(10, 24)],
      'offers': [`3_Order UBER +€ 20`, `3_Upgrade to business +€ 20`]},
    {
      'type': `Check-in`,
      'icon': `🏨`,
      'price': getRandomFromInterval(200, 400),
      'time': [getRandomFromInterval(0, 10), getRandomFromInterval(10, 24)],
      'offers': [`4_Order UBER +€ 20`, `4_Upgrade to business +€ 20`]}
  ],
  offers: new Set([
    `Add luggage`,
    `Switch to comfort class`,
    `Add meal`,
    `Choose seats`
  ]),
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  isFavorite: false
});

