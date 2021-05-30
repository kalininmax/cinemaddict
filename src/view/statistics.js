import dayjs from 'dayjs';
import Chart from 'chart.js';
import { getHourFromMin } from '../utils/film';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart';
import { filmsToFilterMap, getTotalDuration, getTopGenre, getGenresStatistics, getUserRank, CHART_BAR } from '../utils/statistics';
import { StatsDate } from '../const';

const renderStatisticsChart = (films, statisticsCtx) => {
  const BAR_HEIGHT = CHART_BAR.HEIGHT;

  const genresNames = [];
  const genresCounts = [];

  Object
    .entries(getGenresStatistics(films))
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, count]) => {
      genresNames.push(name);
      genresCounts.push(count);
    });

  statisticsCtx.height = BAR_HEIGHT * Object.values(genresNames).length;

  return new Chart(statisticsCtx, {
    plugins: [ChartDataLabels],
    type: CHART_BAR.TYPE,
    data: {
      labels: genresNames,
      datasets: [{
        data: genresCounts,
        backgroundColor: CHART_BAR.BG_COLOR,
        hoverBackgroundColor: CHART_BAR.BG_COLOR,
        anchor: CHART_BAR.LABEL_ALIGN,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: CHART_BAR.FONT_SIZE,
          },
          color: CHART_BAR.FONT_COLOR,
          anchor: CHART_BAR.LABEL_ALIGN,
          align: CHART_BAR.LABEL_ALIGN,
          offset: CHART_BAR.LABEL_OFFSET,
        },
      },
      scales: {
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        yAxes: [{
          ticks: {
            fontColor: CHART_BAR.FONT_COLOR,
            padding: CHART_BAR.PADDING,
            fontSize: CHART_BAR.FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: CHART_BAR.THICKNESS,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsFilterTemplate = (currentFilter) => {
  return `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
  <p class="statistic__filters-description">Show stats:</p>

  <input type="radio"
  class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time"
  value="${StatsDate.ALL_TIME.type}"
  ${currentFilter === StatsDate.ALL_TIME.type ? 'checked' : ''}>
  <label for="statistic-all-time" class="statistic__filters-label">${StatsDate.ALL_TIME.name}</label>

  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today"
  value="${StatsDate.TODAY.type}"
  ${currentFilter === StatsDate.TODAY.type ? 'checked' : ''}>
  <label for="statistic-today" class="statistic__filters-label">${StatsDate.TODAY.name}</label>

  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week"
  value="${StatsDate.WEEK.type}"
  ${currentFilter === StatsDate.WEEK.type ? 'checked' : ''}>
  <label for="statistic-week" class="statistic__filters-label">${StatsDate.WEEK.name}</label>

  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month"
  value="${StatsDate.MONTH.type}"
  ${currentFilter === StatsDate.MONTH.type ? 'checked' : ''}>
  <label for="statistic-month" class="statistic__filters-label">${StatsDate.MONTH.name}</label>

  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year"
  value="${StatsDate.YEAR.type}"
  ${currentFilter === StatsDate.YEAR.type ? 'checked' : ''}>
  <label for="statistic-year" class="statistic__filters-label">${StatsDate.YEAR.name}</label>
</form>`;
};

const createStatisticsTemplate = (films, currentFilter, watchedFilms) => {
  const totalDuration = getHourFromMin(getTotalDuration(films));
  const topGenre = getTopGenre(films);
  const userRank = getUserRank(watchedFilms);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userRank}</span>
    </p>

    ${createStatsFilterTemplate(currentFilter)}

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">
          ${totalDuration.hours}<span class="statistic__item-description">h</span>
          ${totalDuration.mins}<span class="statistic__item-description">m</span>
        </p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
};

class Statistics extends SmartView {
  constructor(films) {
    super();

    this._films = films;
    this._watchedFilms = this._films.filter(({ userDetails: { watched } }) => watched);

    this._currentFilter = StatsDate.ALL_TIME.type;

    this._data = filmsToFilterMap[this._currentFilter](this._watchedFilms);
    this._chart = null;


    this._statsFilterChangeHandler = this._statsFilterChangeHandler.bind(this);
    this._setStatsFilterChangeHandler();
    this._setChart();
  }

  restoreHandlers() {
    this._setStatsFilterChangeHandler();
    this._setChart();
  }

  getTemplate() {
    return createStatisticsTemplate(this._data, this._currentFilter, this._watchedFilms);
  }

  _statsFilterChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('statistic__filters-input')) {
      this._currentFilter = evt.target.value;
      this._data = filmsToFilterMap[this._currentFilter](this._watchedFilms);
      this.updateElement();
    }
  }

  _setStatsFilterChangeHandler() {
    this.getElement().addEventListener('change', this._statsFilterChangeHandler);
  }

  _setChart() {
    if (this._chart !== null) {
      this._chart = null;
    }

    const statisticsCtx = this.getElement().querySelector('.statistic__chart');

    this._chart = renderStatisticsChart(this._data, statisticsCtx);
  }

}

export { Statistics as default };
