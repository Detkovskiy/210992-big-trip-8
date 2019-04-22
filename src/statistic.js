import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {model} from "./utils/model";
import {icons} from "./utils/data";
import moment from 'moment';

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

  const getMoneyChartData = (points) => {
    const costPoint = {};

    Object.keys(points).map((item) => {
      points[item].map((point) => {
        if (!costPoint[point.type]) {
          costPoint[point.type] = point.price;
        }
        costPoint[point.type] += point.price;
      });
    });

    return costPoint;
  };

  const moneyChartData = getMoneyChartData(data);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(moneyChartData).map((it) => {
        return icons[it] + it.toUpperCase();
      }),
      datasets: [{
        data: Object.values(moneyChartData),
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

  const getTransportChartData = (points) => {
    const counPoint = {};

    Object.keys(points).map((item) => {
      points[item].map((point) => {
        if (!counPoint[point.type]) {
          counPoint[point.type] = 1;
        }
        counPoint[point.type] += 1;
      });
    });

    return counPoint;
  };

  const transportChartData = getTransportChartData(data);

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(transportChartData).map((it) => {
        return icons[it] + it.toUpperCase();
      }),
      datasets: [{
        data: Object.values(transportChartData),
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

const renderTimeChart = (data) => {

  const getTimeChartData = (points) => {
    const timePoint = {};
    let duration = null;

    Object.keys(points).map((item) => {
      points[item].map((point) => {
        if (!timePoint[point.type]) {
          duration = moment.duration(moment(point.timeEnd).diff(moment(point.timeStart)));
          timePoint[point.type] = +moment(duration, `x`).format(`kk`);
        }
        timePoint[point.type] += +moment(duration, `x`).format(`kk`);
      });
    });

    return timePoint;
  };

  const timeChartData = getTimeChartData(data);

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(timeChartData).map((it) => {
        return icons[it] + it.toUpperCase();
      }),
      datasets: [{
        data: Object.values(timeChartData),
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
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
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
          barThickness: 44
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

    renderMoneyChart(model.points);
    renderTransportChart(model.points);
    renderTimeChart(model.points);
  });

  tripTrigger.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    statBlock.classList.add(`visually-hidden`);
    tripTrigger.classList.add(`view-switch__item--active`);
    mainBlock.classList.remove(`visually-hidden`);
    statsTrigger.classList.remove(`view-switch__item--active`);
  });
};

export {statisticInit, renderMoneyChart, renderTransportChart, renderTimeChart};
