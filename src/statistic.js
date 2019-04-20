import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {model} from "./model";

const moneyCtx = document.querySelector(`.statistic__money`);
const transportCtx = document.querySelector(`.statistic__transport`);
const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

const mainBlock = document.querySelector(`.main`);
const statBlock = document.querySelector(`.statistic`);
const statsTrigger = document.querySelector(`a[href*=stat]`);
const tripTrigger = document.querySelector(`a[href*=table]`);

const BAR_HEIGHT = 55;
moneyCtx.height = BAR_HEIGHT * 4;
transportCtx.height = BAR_HEIGHT * 4;
timeSpendCtx.height = BAR_HEIGHT * 4;

const renderMoneyChart = (data) => {
  const getMoneyChartData = (arr) => {
    const arrTypePoint = [];
    const arrPricePoint = [];

    arr.forEach(function ([item, price]) {
      if (arrTypePoint.indexOf(item) === -1) {
        arrTypePoint.push(item);
        arrPricePoint[arrTypePoint.indexOf(item)] = +price;
      } else {
        arrPricePoint[arrTypePoint.indexOf(item)] += price;
      }
    });

    return {arrTypePoint, arrPricePoint};
  };
  const moneyChartData = getMoneyChartData(data.map((it) => {
    return [/*trips.icons[it.type] + */it.type.toUpperCase(), it.price];
  }

  ));

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: moneyChartData.arrTypePoint,
      datasets: [{
        data: moneyChartData.arrPricePoint,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (data) => {

  const getTransportChartData = (arrLabels) => {
    const arrTypePoint = [];
    const arrColPoint = [];

    arrLabels.forEach(function (item) {
      if (arrTypePoint.indexOf(item) === -1) {
        arrTypePoint.push(item);
        arrColPoint[arrTypePoint.indexOf(item)] = 1;
      } else {
        arrColPoint[arrTypePoint.indexOf(item)] += 1;
      }
    });

    return {arrTypePoint, arrColPoint};
  };


  const transportChartData = getTransportChartData(data.map((it) => /*trips.icons[it.type] + */it.type.toUpperCase()));


  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: transportChartData.arrTypePoint,
      datasets: [{
        data: transportChartData.arrColPoint,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const statisticInit = () => {
  statsTrigger.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    mainBlock.classList.add(`visually-hidden`);
    tripTrigger.classList.remove(`view-switch__item--active`);
    statsTrigger.classList.add(`view-switch__item--active`);
    statBlock.classList.remove(`visually-hidden`);

    renderMoneyChart(model.dataStat);
    renderTransportChart(model.dataStat);
  });

  tripTrigger.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    statBlock.classList.add(`visually-hidden`);
    tripTrigger.classList.add(`view-switch__item--active`);
    mainBlock.classList.remove(`visually-hidden`);
    statsTrigger.classList.remove(`view-switch__item--active`);
  });
};

export {statisticInit};
