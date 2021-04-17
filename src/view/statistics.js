const createStatisticFiltersTemplate = ({ statistic_time }, isChecked) => {
  if (statistic_time === 'all-time') {
    return `<input type="radio"
    class="statistic__filters-input visually-hidden"
    name="statistic-filter"
    id="statistic-${statistic_time}"
    value="${statistic_time}" ${isChecked ? 'checked' : ''}>
  <label for="statistic-${statistic_time}" class="statistic__filters-label">All time</label>`;
  }

  return `<input type="radio"
    class="statistic__filters-input visually-hidden"
    name="statistic-filter"
    id="statistic-${statistic_time}"
    value="${statistic_time}" ${isChecked ? 'checked' : ''}>
  <label for="statistic-${statistic_time}" class="statistic__filters-label">${statistic_time}</label>`;
};

const calculateStatistic = (films) => {
  return {
    watched_films_count: films.length,
    total_duration: films
      .map(({ film_info: { runtime } }) => runtime)
      .reduce((a, b) => a + b),
  };
};

const createStatisticTemplate = (statistic) => {
  const statisticFiltersTemplate = statistic.map((statistic, index) => createStatisticFiltersTemplate(statistic, index === 0)).join('');
  const statisticData = calculateStatistic(statistic[0].watched_films);
  return `<section class="statistic visually-hidden">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Movie buff</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${statisticFiltersTemplate}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${statisticData.watched_films_count}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
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

export { createStatisticTemplate };
