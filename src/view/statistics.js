import dayjs from 'dayjs';
import Chart from 'chart.js';
import { getHourFromMin } from '../utils/film';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart';
import { getStatsTime } from '../utils/statistics';
import { StatsDate } from '../const';

const filmsToFilterMap = {
  'all-time': (films) => films.filter(({ user_details: { watched } }) => watched),
  today: (films) => films
    .filter(({ user_details: { watched } }) => watched)
    .filter(({ user_details: { watchingDate } }) => watchingDate > dayjs().subtract(1, 'day')),
  week: (films) => films
    .filter(({ user_details: { watched } }) => watched)
    .filter(({ user_details: { watchingDate } }) => watchingDate > dayjs().subtract(7, 'day')),
  month: (films) => films
    .filter(({ user_details: { watched } }) => watched)
    .filter(({ user_details: { watchingDate } }) => watchingDate > dayjs().subtract(30, 'day')),
  year: (films) => films
    .filter(({ user_details: { watched } }) => watched)
    .filter(({ user_details: { watchingDate } }) => watchingDate > dayjs().subtract(365, 'day')),
};

const getTotalDuration = (films) => {
  return films
    .map(({ film_info: { runtime } }) => runtime)
    .reduce((a, b) => a + b, 0);
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

const createStatisticsTemplate = (films, currentFilter) => {
  const filteredFilms = filmsToFilterMap[currentFilter](films);
  console.log(filteredFilms);

  const totalDuration = getTotalDuration(filteredFilms);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Movie buff</span>
    </p>

    ${createStatsFilterTemplate(currentFilter)}

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${filteredFilms.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDuration} <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">Sci-Fi</p>
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

    this._data = films;

    this._currentFilter = StatsDate.ALL_TIME.type;

    this._statsFilterChangeHandler = this._statsFilterChangeHandler.bind(this);
    this._setStatsFilterChangeHandler();

  }

  restoreHandlers() {
    this._setStatsFilterChangeHandler();
  }

  getTemplate() {
    console.log(11, this._data.slice(), this._currentFilter);

    return createStatisticsTemplate(this._data, this._currentFilter);
  }

  _statsFilterChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('statistic__filters-input')) {
      this._currentFilter = evt.target.value;
      this.updateElement();
    }
  }

  _setStatsFilterChangeHandler() {
    this.getElement().addEventListener('change', this._statsFilterChangeHandler);
  }

}

export { Statistics as default };
