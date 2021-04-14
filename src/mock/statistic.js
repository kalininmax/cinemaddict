import dayjs from 'dayjs';

const filmToStatisticFilterMap = {
  'all-time': (films) => films.filter(({ user_details: { watched } }) => watched),
  today: (films) => films
    .filter(({ user_details: { watched } }) => watched)
    .filter(({ user_details: { watching_date } }) => watching_date > dayjs().set('hour', 0).set('minute', 0).set('second', 0)),
  week: (films) => films
    .filter(({ user_details: { watched } }) => watched)
    .filter(({ user_details: { watching_date } }) => watching_date > dayjs().subtract(7, 'day')),
  month: (films) => films
    .filter(({ user_details: { watched } }) => watched)
    .filter(({ user_details: { watching_date } }) => watching_date > dayjs().subtract(30, 'day')),
  year: (films) => films
    .filter(({ user_details: { watched } }) => watched)
    .filter(({ user_details: { watching_date } }) => watching_date > dayjs().subtract(365, 'day')),
};

const generateStatistic = (films) => {
  return Object.entries(filmToStatisticFilterMap).map(([time, watchedFilms]) => {
    return {
      statistic_time: time,
      watched_films: watchedFilms(films),
    };
  });
};

export { generateStatistic };
